FROM node:20-slim

WORKDIR /usr/src/app

# 配置国内 apt 镜像源，安装必要依赖
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update -y \
    && apt-get install -y curl openssl \
    && rm -rf /var/lib/apt/lists/*

# 复制智能镜像源配置脚本
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 运行镜像源配置
RUN /usr/local/bin/docker-entrypoint.sh true || true

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制 prisma 配置并生成客户端
COPY prisma ./prisma/
RUN npx prisma generate

# 复制源代码
COPY . .

# 构建 NestJS 应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动生产环境应用
CMD ["npm", "run", "start:prod"]