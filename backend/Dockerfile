FROM node:20-slim AS builder

WORKDIR /usr/src/app
# Set mirror for faster download
RUN npm config set registry https://registry.npmmirror.com

COPY package*.json ./
# Make sure Prisma engine uses OpenSSL 3
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update -y && apt-get install -y openssl

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

RUN npm config set registry https://registry.npmmirror.com
RUN sed -i 's/deb.debian.org/mirrors.aliyun.com/g' /etc/apt/sources.list.d/debian.sources \
    && apt-get update -y && apt-get install -y openssl

# Set this after dependencies install so devDependencies aren't skipped
# but usually it's best practice to run production installs only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
