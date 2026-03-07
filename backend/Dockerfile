FROM node:20-slim AS builder

WORKDIR /usr/src/app

# 安装 curl 用于镜像源测试
RUN apt-get update -y && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# 复制并执行智能镜像源配置脚本
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# 运行镜像源配置
RUN /usr/local/bin/docker-entrypoint.sh true || true

# 安装系统依赖
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Install dependencies including Prisma
RUN npm ci

COPY prisma ./prisma/
COPY src ./src/
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY nest-cli.json ./
COPY prisma.config.ts ./

# Generate Prisma client and build NestJS
RUN npx prisma generate
RUN npm run build

FROM node:20-slim AS production

WORKDIR /usr/src/app

# 安装 curl 用于镜像源测试
RUN apt-get update -y && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# 复制并执行智能镜像源配置脚本
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN /usr/local/bin/docker-entrypoint.sh true || true

# 安装系统依赖
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Set this after dependencies install so devDependencies aren't skipped
# but usually it's best practice to run production installs only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["npm", "run", "start:prod"]
