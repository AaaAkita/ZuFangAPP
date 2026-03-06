import tkinter as tk
from tkinter import ttk
from tkinter import scrolledtext
from tkinter import filedialog
from tkinter import messagebox
import os
import sys
import subprocess
import threading
import time
import json
import re
import shutil

if getattr(sys, 'frozen', False):
    BASE_DIR = os.path.dirname(sys.executable)
else:
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

BACKEND_DIR = os.path.join(BASE_DIR, "backend")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")
CONFIG_PATH = os.path.join(BASE_DIR, "data", "dev_config.json")
ENV_EXAMPLE_PATH = os.path.join(BACKEND_DIR, ".env.example")
ENV_PATH = os.path.join(BACKEND_DIR, ".env")

BACKEND_PORT = 3000
FRONTEND_PORT = 5173


class DevServerGUI(tk.Tk):
    def __init__(self):
        super().__init__()

        self.title("ZuFangAPP 开发管理终端")
        self.geometry("950x650")
        
        self.backend_process = None
        self.frontend_process = None
        self.should_exit = False
        self.server_ip = "localhost"
        self.db_status = "unknown"
        self.redis_status = "unknown"

        self.columnconfigure(0, weight=1)
        self.rowconfigure(0, weight=0)
        self.rowconfigure(1, weight=1)

        self.create_top_bar()
        self.create_main_area()

        self.log_user("🛠️ ZuFangAPP 开发管理终端初始化完成")
        self.log_user("正在检查开发环境...")
        self.check_env()

    def check_env(self):
        self.log_debug("Checking Development Environment...")
        
        if shutil.which("node"):
            try:
                result = subprocess.run("node --version", capture_output=True, text=True, shell=True)
                self.log_debug(f"Node.js version: {result.stdout.strip()}")
            except Exception:
                self.log_debug("Node.js check failed")
        else:
            self.log_user("❌ 未找到 Node.js，请先安装 Node.js")

        if shutil.which("npm"):
            try:
                result = subprocess.run("npm --version", capture_output=True, text=True, shell=True)
                self.log_debug(f"npm version: {result.stdout.strip()}")
            except Exception:
                self.log_debug("npm check failed")
        else:
            self.log_user("❌ 未找到 npm，请先安装 Node.js")

        self.check_postgresql()
        self.check_redis()
        self.check_env_file()

    def check_postgresql(self):
        self.log_debug("Checking PostgreSQL connection...")
        try:
            result = subprocess.run(
                "psql --version", 
                capture_output=True, 
                text=True, 
                shell=True
            )
            if result.returncode == 0:
                self.log_debug(f"PostgreSQL client: {result.stdout.strip()}")
                self.db_status = "available"
            else:
                self.db_status = "not_found"
                self.log_user("⚠️ 未找到 PostgreSQL 客户端，请确保 PostgreSQL 已安装并添加到 PATH")
        except Exception as e:
            self.db_status = "error"
            self.log_debug(f"PostgreSQL check error: {e}")

    def check_redis(self):
        self.log_debug("Checking Redis connection...")
        try:
            result = subprocess.run(
                "redis-cli ping", 
                capture_output=True, 
                text=True, 
                shell=True
            )
            if "PONG" in result.stdout:
                self.redis_status = "running"
                self.log_debug("Redis: Running (PONG received)")
            else:
                self.redis_status = "not_running"
                self.log_user("⚠️ Redis 未运行，请启动 Redis 服务")
        except Exception:
            self.redis_status = "not_found"
            self.log_user("⚠️ 未找到 Redis，请确保 Redis 已安装并运行")

    def check_env_file(self):
        if not os.path.exists(ENV_PATH):
            if os.path.exists(ENV_EXAMPLE_PATH):
                self.log_user("⚠️ 检测到 .env 文件不存在，请先配置环境变量")
                self.log_user("   可点击「初始化配置」按钮从模板创建")
            else:
                self.log_user("⚠️ 未找到 .env.example 模板文件")

    def create_top_bar(self):
        top_frame = ttk.Frame(self, padding=(10, 10, 10, 0))
        top_frame.grid(row=0, column=0, sticky="ew")

        top_frame.columnconfigure(0, weight=1)
        top_frame.columnconfigure(1, weight=1)
        top_frame.columnconfigure(2, weight=1)

        style = ttk.Style()
        style.configure("Action.TButton", font=("Microsoft YaHei", 9))
        style.configure("Dev.TButton", font=("Microsoft YaHei", 9), foreground="#2563eb")
        style.configure("Db.TButton", font=("Microsoft YaHei", 9), foreground="#059669")
        style.configure("Danger.TButton", font=("Microsoft YaHei", 9), foreground="#dc2626")

        left_frame = ttk.Frame(top_frame)
        left_frame.grid(row=0, column=0, sticky="ew", padx=(0, 5))

        btn_init = ttk.Button(left_frame, text="🔧 初始化配置", style="Action.TButton", command=self.on_init_config)
        btn_init.pack(side="left", padx=(0, 5))

        btn_install = ttk.Button(left_frame, text="📦 安装依赖", style="Action.TButton", command=self.on_install_deps)
        btn_install.pack(side="left", padx=(0, 5))

        btn_migrate = ttk.Button(left_frame, text="🗄️ 数据库迁移", style="Db.TButton", command=self.on_db_migrate)
        btn_migrate.pack(side="left", padx=(0, 5))

        btn_seed = ttk.Button(left_frame, text="🌱 填充数据", style="Db.TButton", command=self.on_db_seed)
        btn_seed.pack(side="left", padx=(0, 5))

        center_frame = ttk.Frame(top_frame)
        center_frame.grid(row=0, column=1, sticky="ew", padx=5)

        btn_start = ttk.Button(center_frame, text="▶ 启动开发", style="Dev.TButton", command=self.on_start_server)
        btn_start.pack(side="left", padx=(0, 5))

        btn_restart = ttk.Button(center_frame, text="⚡ 重启", style="Action.TButton", command=self.on_restart_server)
        btn_restart.pack(side="left", padx=(0, 5))

        btn_stop = ttk.Button(center_frame, text="⏹ 关闭", style="Danger.TButton", command=self.on_stop_server)
        btn_stop.pack(side="left", padx=(0, 5))

        right_frame = ttk.Frame(top_frame)
        right_frame.grid(row=0, column=2, sticky="ew", padx=(5, 0))

        btn_studio = ttk.Button(right_frame, text="📊 Prisma Studio", style="Db.TButton", command=self.on_prisma_studio)
        btn_studio.pack(side="left", padx=(0, 5))

        btn_export = ttk.Button(right_frame, text="📄 导出日志", style="Action.TButton", command=self.on_export_log)
        btn_export.pack(side="left", padx=(0, 5))

        btn_open_backend = ttk.Button(right_frame, text="📚 API文档", style="Action.TButton", command=self.on_open_api_docs)
        btn_open_backend.pack(side="left", padx=(0, 5))

    def create_main_area(self):
        main_frame = ttk.Frame(self, padding=(10, 5, 10, 10))
        main_frame.grid(row=1, column=0, sticky="nsew")

        main_frame.columnconfigure(0, weight=1)
        main_frame.rowconfigure(0, weight=0)
        main_frame.rowconfigure(1, weight=1)

        info_frame = ttk.LabelFrame(main_frame, text="服务状态与连接信息", padding=10)
        info_frame.grid(row=0, column=0, sticky="ew", pady=(0, 10))
        
        info_frame.columnconfigure(1, weight=1)
        info_frame.columnconfigure(3, weight=1)
        info_frame.columnconfigure(5, weight=1)

        ttk.Label(info_frame, text="前端开发服务器:").grid(row=0, column=0, padx=5, pady=2, sticky="e")
        self.frontend_entry = ttk.Entry(info_frame)
        self.frontend_entry.grid(row=0, column=1, padx=5, pady=2, sticky="ew")

        ttk.Label(info_frame, text="后端 API 服务:").grid(row=0, column=2, padx=5, pady=2, sticky="e")
        self.backend_entry = ttk.Entry(info_frame)
        self.backend_entry.grid(row=0, column=3, padx=5, pady=2, sticky="ew")

        ttk.Label(info_frame, text="状态:").grid(row=0, column=4, padx=5, sticky="e")
        self.status_label = ttk.Label(info_frame, text="未运行", foreground="red", font=("Microsoft YaHei", 9, "bold"))
        self.status_label.grid(row=0, column=5, padx=5, sticky="w")

        ttk.Label(info_frame, text="PostgreSQL:").grid(row=1, column=0, padx=5, pady=2, sticky="e")
        self.pg_status_label = ttk.Label(info_frame, text="检测中...", foreground="gray", font=("Microsoft YaHei", 9))
        self.pg_status_label.grid(row=1, column=1, padx=5, pady=2, sticky="w")

        ttk.Label(info_frame, text="Redis:").grid(row=1, column=2, padx=5, pady=2, sticky="e")
        self.redis_status_label = ttk.Label(info_frame, text="检测中...", foreground="gray", font=("Microsoft YaHei", 9))
        self.redis_status_label.grid(row=1, column=3, padx=5, pady=2, sticky="w")

        ttk.Label(info_frame, text="数据库:").grid(row=1, column=4, padx=5, sticky="e")
        self.db_migrate_label = ttk.Label(info_frame, text="未迁移", foreground="orange", font=("Microsoft YaHei", 9))
        self.db_migrate_label.grid(row=1, column=5, padx=5, sticky="w")

        log_frame = ttk.LabelFrame(main_frame, text="运行日志", padding=5)
        log_frame.grid(row=1, column=0, sticky="nsew")
        
        log_frame.columnconfigure(0, weight=1)
        log_frame.rowconfigure(0, weight=1)

        self.log_notebook = ttk.Notebook(log_frame)
        self.log_notebook.grid(row=0, column=0, sticky="nsew")
        
        user_log_frame = ttk.Frame(self.log_notebook)
        self.user_log_text = scrolledtext.ScrolledText(user_log_frame, state='disabled', font=("Microsoft YaHei", 9))
        self.user_log_text.pack(fill="both", expand=True)
        self.log_notebook.add(user_log_frame, text="📋 操作记录")
        
        frontend_log_frame = ttk.Frame(self.log_notebook)
        self.frontend_log_text = scrolledtext.ScrolledText(frontend_log_frame, state='disabled', font=("Consolas", 9))
        self.frontend_log_text.pack(fill="both", expand=True)
        self.log_notebook.add(frontend_log_frame, text="🌐 前端日志")
        
        backend_log_frame = ttk.Frame(self.log_notebook)
        self.backend_log_text = scrolledtext.ScrolledText(backend_log_frame, state='disabled', font=("Consolas", 9))
        self.backend_log_text.pack(fill="both", expand=True)
        self.log_notebook.add(backend_log_frame, text="⚙️ 后端日志")
        
        debug_log_frame = ttk.Frame(self.log_notebook)
        self.debug_log_text = scrolledtext.ScrolledText(debug_log_frame, state='disabled', font=("Consolas", 8))
        self.debug_log_text.pack(fill="both", expand=True)
        self.log_notebook.add(debug_log_frame, text="🔧 调试日志")
        
        self.log_text = self.backend_log_text

        self.update_status_labels()

    def update_status_labels(self):
        if self.db_status == "available":
            self.pg_status_label.config(text="✓ 已安装", foreground="green")
        elif self.db_status == "not_running":
            self.pg_status_label.config(text="✗ 未运行", foreground="red")
        elif self.db_status == "not_found":
            self.pg_status_label.config(text="✗ 未安装", foreground="red")
        else:
            self.pg_status_label.config(text="? 未知", foreground="gray")

        if self.redis_status == "running":
            self.redis_status_label.config(text="✓ 运行中", foreground="green")
        elif self.redis_status == "not_running":
            self.redis_status_label.config(text="✗ 未运行", foreground="red")
        elif self.redis_status == "not_found":
            self.redis_status_label.config(text="✗ 未安装", foreground="red")
        else:
            self.redis_status_label.config(text="? 未知", foreground="gray")

    def log(self, message, level="system"):
        def _log():
            if level == "user":
                target = self.user_log_text
                prefix = "▶"
            elif level == "frontend":
                target = self.frontend_log_text
                prefix = "[VITE]"
            elif level == "debug":
                target = self.debug_log_text
                prefix = "[DEBUG]"
            else:
                target = self.backend_log_text
                prefix = ">>"
            
            target.config(state='normal')
            target.insert(tk.END, f"{prefix} {message}\n")
            target.see(tk.END)
            target.config(state='disabled')
        self.after(0, _log)
    
    def log_user(self, message):
        self.log(message, level="user")
    
    def log_debug(self, message):
        self.log(message, level="debug")
    
    def log_frontend(self, message):
        self.log(message, level="frontend")

    def on_init_config(self):
        if os.path.exists(ENV_PATH):
            if not messagebox.askyesno("确认", ".env 文件已存在，是否覆盖？"):
                return
        
        if os.path.exists(ENV_EXAMPLE_PATH):
            try:
                shutil.copy(ENV_EXAMPLE_PATH, ENV_PATH)
                self.log_user("✅ 已从模板创建 .env 文件")
                self.log_user("   请编辑 backend/.env 配置数据库连接信息")
                
                if os.name == 'nt':
                    os.startfile(os.path.dirname(ENV_PATH))
            except Exception as e:
                self.log_user(f"❌ 创建 .env 文件失败: {e}")
        else:
            self.log_user("❌ 未找到 .env.example 模板文件")

    def on_install_deps(self):
        self.log_user("📦 开始安装项目依赖...")
        threading.Thread(target=self._install_deps_thread).start()

    def _install_deps_thread(self):
        if shutil.which("npm"):
            if os.path.exists(BACKEND_DIR):
                self.log_user("正在安装后端依赖...")
                try:
                    process = subprocess.Popen(
                        "npm install",
                        cwd=BACKEND_DIR,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.STDOUT,
                        shell=True,
                        text=True
                    )
                    for line in iter(process.stdout.readline, ''):
                        if line:
                            self.log_debug(f"[Backend npm] {line.strip()}")
                    process.wait()
                    self.log_user("✅ 后端依赖安装完成")
                except Exception as e:
                    self.log_user(f"❌ 后端依赖安装失败: {e}")
                    return

            if os.path.exists(FRONTEND_DIR):
                self.log_user("正在安装前端依赖...")
                try:
                    process = subprocess.Popen(
                        "npm install",
                        cwd=FRONTEND_DIR,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.STDOUT,
                        shell=True,
                        text=True
                    )
                    for line in iter(process.stdout.readline, ''):
                        if line:
                            self.log_debug(f"[Frontend npm] {line.strip()}")
                    process.wait()
                    self.log_user("✅ 前端依赖安装完成")
                except Exception as e:
                    self.log_user(f"❌ 前端依赖安装失败: {e}")
                    return

            self.log_user("正在生成 Prisma Client...")
            try:
                result = subprocess.run(
                    "npx prisma generate",
                    cwd=BACKEND_DIR,
                    shell=True,
                    capture_output=True,
                    text=True
                )
                if result.returncode == 0:
                    self.log_user("✅ Prisma Client 生成完成")
                else:
                    self.log_user(f"⚠️ Prisma Client 生成失败: {result.stderr}")
            except Exception as e:
                self.log_user(f"❌ Prisma 生成失败: {e}")
        else:
            self.log_user("❌ 未找到 npm，请先安装 Node.js")

    def on_db_migrate(self):
        if not os.path.exists(ENV_PATH):
            self.log_user("❌ 请先配置 .env 文件")
            return
        
        self.log_user("🗄️ 开始数据库迁移...")
        threading.Thread(target=self._db_migrate_thread).start()

    def _db_migrate_thread(self):
        try:
            self.log_debug("Running: npx prisma migrate dev")
            process = subprocess.Popen(
                "npx prisma migrate dev",
                cwd=BACKEND_DIR,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                shell=True,
                text=True
            )
            for line in iter(process.stdout.readline, ''):
                if line:
                    self.log_debug(f"[Prisma] {line.strip()}")
            process.wait()
            
            if process.returncode == 0:
                self.log_user("✅ 数据库迁移完成")
                self.after(0, lambda: self.db_migrate_label.config(text="已迁移", foreground="green"))
            else:
                self.log_user("❌ 数据库迁移失败，请检查数据库连接配置")
        except Exception as e:
            self.log_user(f"❌ 数据库迁移失败: {e}")

    def on_db_seed(self):
        if not os.path.exists(ENV_PATH):
            self.log_user("❌ 请先配置 .env 文件")
            return
        
        self.log_user("🌱 开始填充种子数据...")
        threading.Thread(target=self._db_seed_thread).start()

    def _db_seed_thread(self):
        try:
            seed_file = os.path.join(BACKEND_DIR, "prisma", "seed.ts")
            if not os.path.exists(seed_file):
                self.log_user("⚠️ 未找到 seed.ts 文件")
                return

            self.log_debug("Running: npx prisma db seed")
            process = subprocess.Popen(
                "npx prisma db seed",
                cwd=BACKEND_DIR,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                shell=True,
                text=True
            )
            for line in iter(process.stdout.readline, ''):
                if line:
                    self.log_debug(f"[Seed] {line.strip()}")
            process.wait()
            
            if process.returncode == 0:
                self.log_user("✅ 种子数据填充完成")
            else:
                self.log_user("❌ 种子数据填充失败")
        except Exception as e:
            self.log_user(f"❌ 种子数据填充失败: {e}")

    def on_prisma_studio(self):
        self.log_user("📊 启动 Prisma Studio...")
        try:
            subprocess.Popen(
                "npx prisma studio",
                cwd=BACKEND_DIR,
                shell=True,
                creationflags=subprocess.CREATE_NEW_CONSOLE if os.name == 'nt' else 0
            )
            self.log_user("✅ Prisma Studio 已在新窗口启动")
        except Exception as e:
            self.log_user(f"❌ 启动 Prisma Studio 失败: {e}")

    def on_open_api_docs(self):
        import webbrowser
        url = "http://localhost:3000/api"
        self.log_user(f"📚 正在打开 API 文档: {url}")
        webbrowser.open(url)

    def on_export_log(self):
        content = ""
        
        content += "========== 📋 操作记录 ==========\n"
        content += self.user_log_text.get("1.0", tk.END).strip() + "\n\n"
        
        content += "========== 🌐 前端日志 ==========\n"
        content += self.frontend_log_text.get("1.0", tk.END).strip() + "\n\n"
        
        content += "========== ⚙️ 后端日志 ==========\n"
        content += self.backend_log_text.get("1.0", tk.END).strip() + "\n\n"
        
        content += "========== 🔧 调试日志 ==========\n"
        content += self.debug_log_text.get("1.0", tk.END).strip() + "\n"
            
        target_path = os.path.join(BASE_DIR, "dev_log.txt")
        try:
            with open(target_path, "w", encoding="utf-8") as f:
                f.write(content)
            self.log_user(f"✅ 所有日志已导出到 dev_log.txt")
        except Exception as e:
            self.log_user(f"❌ 导出失败: {e}")

    def stream_output(self, process, log_type="system"):
        for line in iter(process.stdout.readline, ''):
            if self.should_exit: break
            if line:
                stripped = line.strip()
                
                if log_type == "frontend":
                    self.log_frontend(stripped)
                elif log_type == "backend":
                    if "Nest application" in stripped or "successfully" in stripped.lower():
                        self.log_user(f"✅ {stripped}")
                    elif "error" in stripped.lower() or "Error" in stripped:
                        self.log(f"❌ {stripped}")
                    elif "warn" in stripped.lower():
                        self.log_debug(f"[WARN] {stripped}")
                    else:
                        self.log_debug(f"[Nest] {stripped}")
                else:
                    self.log_debug(stripped)
        process.stdout.close()

    def kill_conflicting_processes(self):
        self.log_debug("正在清理残留进程...")
        ports = [BACKEND_PORT, FRONTEND_PORT]
        for port in ports:
            try:
                cmd = f"netstat -ano | findstr :{port}"
                output = subprocess.check_output(cmd, shell=True, text=True)
                lines = output.strip().split('\n')
                for line in lines:
                    if 'LISTENING' in line:
                        parts = re.split(r'\s+', line.strip())
                        if parts:
                            pid = parts[-1]
                            if pid.isdigit() and pid != '0':
                                self.log_debug(f"Killing PID {pid} (Port {port})")
                                subprocess.run(f"taskkill /F /PID {pid}", shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            except subprocess.CalledProcessError:
                pass
            except Exception as e:
                self.log_debug(f"Clean up info: {e}")

    def on_start_server(self):
        if self.backend_process or self.frontend_process:
            self.log_user("⚠️ 服务已在运行中")
            return
        
        if not os.path.exists(ENV_PATH):
            self.log_user("❌ 请先配置 .env 文件（点击「初始化配置」）")
            return
        
        self.kill_conflicting_processes()
        
        self.should_exit = False
        threading.Thread(target=self._start_server_thread).start()

    def _start_server_thread(self):
        self.log_user("🛠️ 正在启动开发服务器...")
        
        node_modules_backend = os.path.join(BACKEND_DIR, "node_modules")
        node_modules_frontend = os.path.join(FRONTEND_DIR, "node_modules")
        
        if not os.path.exists(node_modules_backend):
            self.log_user("❌ 后端依赖未安装，请先点击「安装依赖」")
            return
        
        if not os.path.exists(node_modules_frontend):
            self.log_user("❌ 前端依赖未安装，请先点击「安装依赖」")
            return

        self.log_user("正在启动后端服务 (NestJS 开发模式)...")
        try:
            self.backend_process = subprocess.Popen(
                "npm run start:dev",
                cwd=BACKEND_DIR,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                shell=True,
                bufsize=1,
            )
            threading.Thread(target=self.stream_output, args=(self.backend_process, "backend"), daemon=True).start()
        except Exception as e:
            self.log_user(f"❌ 后端启动失败: {e}")
            return

        self.log_user("正在启动前端开发服务器 (Vite)...")
        try:
            self.frontend_process = subprocess.Popen(
                "npm run dev",
                cwd=FRONTEND_DIR,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                shell=True,
                bufsize=1,
            )
            threading.Thread(target=self.stream_output, args=(self.frontend_process, "frontend"), daemon=True).start()
        except Exception as e:
            self.log_user(f"❌ 前端开发服务器启动失败: {e}")
            return

        self.after(0, lambda: self.status_label.config(text="开发中", foreground="blue"))
        
        time.sleep(3)
        
        frontend_url = f"http://localhost:{FRONTEND_PORT}"
        backend_url = f"http://localhost:{BACKEND_PORT}"
        
        self.after(0, lambda: self.frontend_entry.delete(0, tk.END))
        self.after(0, lambda: self.frontend_entry.insert(0, frontend_url))
        
        self.after(0, lambda: self.backend_entry.delete(0, tk.END))
        self.after(0, lambda: self.backend_entry.insert(0, backend_url))
        
        self.log_user(f"✅ 开发服务器启动成功")
        self.log_user(f"   前端开发: {frontend_url}")
        self.log_user(f"   后端 API: {backend_url}")
        self.log_user(f"   API 文档: {backend_url}/api")

    def on_stop_server(self):
        self.log_user("正在停止开发服务器...")
        self.should_exit = True
        
        if self.backend_process:
            self.backend_process.terminate()
            self.backend_process = None
            
        if self.frontend_process:
            subprocess.run(f"taskkill /F /T /PID {self.frontend_process.pid}", stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            self.frontend_process = None
        
        self.status_label.config(text="未运行", foreground="red")
        self.log_user("开发服务器已停止")

    def on_restart_server(self):
        self.on_stop_server()
        self.after(2000, self.on_start_server)


if __name__ == "__main__":
    app = DevServerGUI()
    def on_closing():
        app.on_stop_server()
        app.destroy()
        sys.exit(0)
        
    app.protocol("WM_DELETE_WINDOW", on_closing)
    app.mainloop()
