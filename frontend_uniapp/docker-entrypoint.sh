#!/bin/sh
set -e

echo "[STEP] 🚀 Docker 智能镜像源配置启动"

# 如果设置了跳过标记，则直接启动应用
if [ "$SKIP_MIRROR_CHECK" = "true" ] || [ -f "/app/node_modules/.npm-mirror-checked" ]; then
    echo "[INFO] ⏩ 环境变量或缓存标记提示跳过测速，直接启动应用..."
    exec "$@"
    exit 0
fi

# apt 镜像源列表（按优先级）
APT_MIRRORS="mirrors.aliyun.com
mirrors.tencent.com
repo.huaweicloud.com
mirrors.ustc.edu.cn
mirrors.tuna.tsinghua.edu.cn
mirrors.163.com"

# npm 镜像源列表（按优先级）
REGISTRIES="https://registry.npmmirror.com
https://mirrors.cloud.tencent.com/npm
https://repo.huaweicloud.com/repository/npm
https://registry.npmjs.org"

# 最大重试次数
MAX_RETRIES=3
RETRY_DELAY=5

# 等待镜像源可用的函数
wait_for_registry() {
    local url="$1"
    local retries=0
    local delay=5

    while [ $retries -lt $MAX_RETRIES ]; do
        echo "[INFO] 尝试连接: $url (重试 $((retries + 1))/$MAX_RETRIES)"

        if curl -sf --max-time 10 --connect-timeout 5 "$url" >/dev/null 2>&1; then
            echo "[INFO] ✓ 镜像源可用: $url"
            return 0
        fi

        retries=$((retries + 1))
        if [ $retries -lt $MAX_RETRIES ]; then
            echo "[WARN] ⚠ 连接失败，${delay}秒后重试..."
            sleep $delay
            delay=$((delay * 2))
        fi
    done

    echo "[ERROR] ✗ 镜像源不可用: $url"
    return 1
}

# 测试并选择 apt 镜像源
echo "[STEP] 开始智能选择 apt 镜像源..."

SELECTED_APT=""
for host in $APT_MIRRORS; do
    if wait_for_registry "http://${host}/debian/dists/stable/Release"; then
        SELECTED_APT="$host"
        break
    fi
done

if [ -z "$SELECTED_APT" ]; then
    echo "[ERROR] 所有 apt 镜像源均不可用，使用官方源"
else
    if [ -f /etc/apt/sources.list.d/debian.sources ]; then
        sed -i "s/deb.debian.org/${SELECTED_APT}/g" /etc/apt/sources.list.d/debian.sources 2>/dev/null || true
        echo "[INFO] 已设置 apt 镜像源: $SELECTED_APT"
        apt-get update
    fi
fi

# 测试并选择 npm 镜像源
echo "[STEP] 开始智能选择 npm 镜像源..."

SELECTED_REGISTRY=""
for url in $REGISTRIES; do
    if wait_for_registry "${url}/npm" || wait_for_registry "${url}/@types/node"; then
        SELECTED_REGISTRY="$url"
        break
    fi
done

if [ -z "$SELECTED_REGISTRY" ]; then
    echo "[ERROR] 所有 npm 镜像源均不可用，将使用 npmjs.org"
    SELECTED_REGISTRY="https://registry.npmjs.org"
fi

# 设置 npm 镜像源
npm config set registry "$SELECTED_REGISTRY" 2>/dev/null || true
echo "[INFO] 已设置 npm 镜像源: $SELECTED_REGISTRY"

# 安装基本工具
echo "[STEP] 安装基本工具..."
apt-get install -y curl procps 2>/dev/null || true

echo "[STEP] ✅ 镜像源配置完成，记录状态并启动应用..."
touch /app/node_modules/.npm-mirror-checked || true

# 执行原始命令
exec "$@"
