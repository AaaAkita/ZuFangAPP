#!/bin/sh
set -e

echo "[STEP] 🚀 Docker 智能镜像源配置启动"

# npm 镜像源列表（按优先级）
REGISTRIES="https://registry.npmmirror.com
https://mirrors.cloud.tencent.com/npm
https://repo.huaweicloud.com/repository/npm
https://registry.npmjs.org"

# 测试并选择 npm 镜像源
echo "[STEP] 开始智能选择 npm 镜像源..."

SELECTED_REGISTRY=""
for url in $REGISTRIES; do
    echo "[INFO] 测试 npm 镜像源: $url"
    if curl -sf --max-time 5 "${url}/npm" >/dev/null 2>&1 || \
       curl -sf --max-time 5 "${url}/@types/node" >/dev/null 2>&1; then
        echo "[INFO] ✓ npm 镜像源可用: $url"
        SELECTED_REGISTRY="$url"
        break
    else
        echo "[WARN] ✗ npm 镜像源不可用: $url"
    fi
done

if [ -z "$SELECTED_REGISTRY" ]; then
    echo "[ERROR] 所有 npm 镜像源均不可用，等待 30 秒后退出..."
    sleep 30
    exit 1
fi

# 设置 npm 镜像源
npm config set registry "$SELECTED_REGISTRY" 2>/dev/null || true
echo "[INFO] 已设置 npm 镜像源: $SELECTED_REGISTRY"

# apt 镜像源配置
echo "[STEP] 开始智能选择 apt 镜像源..."

APT_MIRRORS="mirrors.aliyun.com
mirrors.tencent.com
repo.huaweicloud.com"

SELECTED_APT=""
for host in $APT_MIRRORS; do
    echo "[INFO] 测试 apt 镜像源: $host"
    if curl -sf --max-time 5 "http://${host}/debian/dists/stable/Release" >/dev/null 2>&1; then
        echo "[INFO] ✓ apt 镜像源可用: $host"
        SELECTED_APT="$host"
        break
    else
        echo "[WARN] ✗ apt 镜像源不可用: $host"
    fi
done

if [ -n "$SELECTED_APT" ]; then
    if [ -f /etc/apt/sources.list.d/debian.sources ]; then
        sed -i "s/deb.debian.org/${SELECTED_APT}/g" /etc/apt/sources.list.d/debian.sources 2>/dev/null || true
        echo "[INFO] 已设置 apt 镜像源: $SELECTED_APT"
    fi
else
    echo "[WARN] 未找到可用的 apt 镜像源，使用默认配置"
fi

echo "[STEP] ✅ 镜像源配置完成，启动应用..."

# 执行原始命令
exec "$@"
