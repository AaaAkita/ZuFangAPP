# ZuFang Backend

NestJS + Prisma + PostgreSQL + Redis backend for the ZuFangAPP integration loop.

## Local (Non-Docker)

```bash
npm install
npm run db:init
npm run start:dev
```

Backend default address: `http://localhost:3026/api/v1`

## Docker One-Click

```bash
npm install
npm run docker:up
npm run docker:db:init
```

Common commands:

```bash
npm run docker:logs
npm run docker:down
```

## Required Env

Copy `.env.example` to `.env` and fill values:

- `PORT` default `3026`
- `DATABASE_URL`
- `JWT_SECRET`
- `REDIS_HOST` / `REDIS_PORT`
- `WECHAT_APP_ID` / `WECHAT_APP_SECRET` (for real mini-program login)
