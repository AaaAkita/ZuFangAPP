# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZuFangAPP (租房避雷协作平台) is a rental property review platform that helps renters avoid problematic properties through community-driven reviews and ratings.

**Tech Stack:**
- **Backend**: NestJS + Prisma + PostgreSQL + Redis
- **Frontend**: uni-app (Vue 3) with TypeScript - supports H5, WeChat mini-program, iOS/Android
- **Infrastructure**: Docker Compose for development

## Development Commands

### Docker Development Environment (Recommended)

```bash
# Start all services (backend + frontend + postgres + redis)
docker-compose -f docker-compose.dev.yml up -d

# Initialize database (first time only)
docker-compose -f docker-compose.dev.yml exec backend npx prisma migrate dev
docker-compose -f docker-compose.dev.yml exec backend npx prisma db seed

# View logs
docker-compose -f docker-compose.dev.yml logs -f backend

# Stop all services
docker-compose -f docker-compose.dev.yml down
```

Service URLs when running in Docker:
- Frontend H5: http://localhost:5179
- Backend API: http://localhost:3026
- Swagger Docs: http://localhost:3026/api/docs
- Prisma Studio: `docker-compose -f docker-compose.dev.yml exec backend npx prisma studio`

### Local Development

**Backend (NestJS):**
```bash
cd backend
npm install

# Setup environment
cp .env.example .env
# Edit .env with database and Redis credentials

# Database operations
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run migrations
npx prisma db seed       # Seed demo data
npx prisma studio        # Open Prisma Studio

# Development server
npm run start:dev        # Watch mode
npm run start:debug      # Debug mode
```

**Frontend (uni-app):**
```bash
cd frontend_uniapp
npm install

# H5 development
npm run dev:h5

# WeChat mini-program development
npm run dev:mp-weixin

# Build for production
npm run build:h5
npm run build:mp-weixin
```

### Testing Commands

**Backend:**
```bash
cd backend
npm run test          # Unit tests
npm run test:watch    # Watch mode
npm run test:cov      # Coverage report
npm run test:e2e      # E2E tests
npm run lint          # ESLint
npm run format        # Prettier
```

**Frontend:**
```bash
cd frontend_uniapp
npm run type-check    # TypeScript check
```

## Architecture Overview

### Backend Architecture

**Module Structure:**
- `src/modules/` - Business modules:
  - `auth/` - Authentication (login, register, WeChat login)
  - `user/` - User management and profile
  - `community/` - Community/property listings
  - `comment/` - Comments, replies, likes, reports
  - `search/` - Search with Redis hot search tracking
  - `file/` - File upload management
  - `message/` - User messages/notifications
  - `contract/` - Contract verification
  - `ad/` - Advertisement management
  - `admin/` - Admin functions
- `src/common/` - Shared components (guards, filters, interceptors, pipes, decorators)
- `prisma/` - Database schema and seed data

**Key Architectural Patterns:**
1. **Global Prefix**: All API routes use `/api/v1` prefix
2. **Response Interceptor**: All responses wrapped in `{success, data, message, timestamp}`
3. **Exception Filter**: Errors returned as `{success: false, error: {statusCode, message, path}}`
4. **Validation**: Global ValidationPipe with `whitelist: true` strips undefined properties
5. **Authentication**: JWT-based with `@nestjs/passport` and custom `@User()` decorator
6. **Database**: Prisma ORM with PostgreSQL, connection pooling via `@prisma/adapter-pg`
7. **Caching**: Redis for hot search and verification codes

**Backend Module Dependencies:**
```
app.module.ts
├── PrismaModule (database)
├── RedisModule (caching)
├── UserModule (users profile management)
├── AuthModule (authentication: login, register, WeChat)
├── CommunityModule (property listings)
├── CommentModule (reviews, likes, replies)
├── SearchModule (search with hot keywords)
├── FileModule (file uploads)
├── MessageModule (user notifications)
├── ContractModule (OCR verification)
├── AdModule (advertisements)
└── AdminModule (admin functions)
```

### Frontend Architecture

**Page Structure:**
- `pages/index/` - Home page with search and featured listings
- `pages/community/` - Community list with filters
- `pages/community-detail/` - Community details with reviews
- `pages/search/` - Search results page
- `pages/login/`, `pages/register/` - Authentication
- `pages/profile/` - User profile
- `pages/message/` - User messages/notifications
- `pages/about/` - About us page
- `pages/safety/` - Safety guide page

**Key Conventions:**
1. Each page is a folder with `index.vue`
2. `navigationStyle: "custom"` hides default navigation bar for custom headers
3. `pages.json` defines routing and navigation bar styling
4. API base URL should point to backend (localhost:3026 or production URL)

**Frontend Directory Structure:**
```
src/
├── pages/           # Page components (each folder = one route)
│   ├── index/       # Home page
│   ├── community/    # Community list
│   ├── community-detail/  # Community details
│   ├── search/      # Search results
│   ├── login/       # Login page
│   ├── register/    # Register page
│   ├── profile/     # User profile
│   ├── message/     # Messages/notifications
│   ├── about/       # About us
│   └── safety/      # Safety guide
├── utils/           # Utility functions
│   ├── auth.ts      # Auth state management and API wrapper
│   └── wechat.ts   # WeChat mini-program login helpers
├── static/          # Static assets
├── App.vue         # Root component
└── main.ts         # Entry point
```

**Frontend Utilities:**
- `auth.ts` provides `useAuthStore()` for managing login state, token, and user info
  - `authStore.login(token, userInfo)` - Save token and user data
  - `authStore.logout()` - Clear auth state and redirect to login
  - `authStore.getRequestHeaders()` - Get headers with Bearer token
  - `api.get/post/put/delete()` - Typed API request wrappers
  - `requireAuth()` - Check if user is logged in, redirect if not
  - `authApi.register/login/getProfile()` - Auth-specific API calls
- `wechat.ts` provides WeChat mini-program specific helpers
  - `wechatLogin()` - Handle WeChat OAuth login flow
  - `isWechatEnv()` - Check if running in WeChat mini-program
  - `refreshWechatToken()` - Refresh JWT via WeChat code
  - `shareToWechat()` - Generate share config for WeChat

## API Reference

For detailed API specifications, see `doc/前端联调API接口说明书.md`.

**Key Endpoints:**
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/wechat` - WeChat mini-program login
- `GET /api/v1/users/profile` - Get current user profile
- `GET /api/v1/communities` - List communities with filters
- `GET /api/v1/communities/:id` - Get community details
- `GET /api/v1/comments?communityId=X` - Get comments for a community
- `POST /api/v1/comments` - Create a comment
- `GET /api/v1/search` - Global search
- `GET /api/v1/search/suggestions` - Search suggestions
- `GET /api/v1/search/hot` - Hot search keywords

## Database Schema

See `backend/prisma/schema.prisma` for full schema definition.

**Key Models:**
- `User` - User accounts with authentication
- `Community` - Rental communities/properties with ratings
- `Comment` - User reviews and ratings
- `SearchHistory` - User search history for personalization
- `CommentLike` - Likes on comments

**Common Fields:**
- All models have `id`, `createdAt`, `updatedAt`
- Soft delete via `deletedAt` on most models
- `BigInt` used for IDs with auto-increment

## Important Implementation Notes

1. **BigInt Serialization**: Backend patches `BigInt.prototype.toJSON` in `main.ts` to handle Prisma BigInt IDs in JSON responses.

2. **JWT Strategy**: JWT tokens expire in 7 days. Passport JWT strategy extracts token from `Authorization: Bearer <token>` header.

3. **Response Wrapping**: Backend uses `TransformInterceptor` to wrap all successful responses in a standard format. Don't manually wrap responses in controllers.

4. **Database Migrations**: After modifying `schema.prisma`, run `npx prisma migrate dev` to generate and apply migrations.

5. **Seed Data**: `prisma/seed.ts` creates demo communities and test users. Run with `npx prisma db seed`.

6. **Hot Search**: Search module uses Redis for hot search tracking. Redis must be running for search features to work properly.

7. **uni-app Platform Differences**: When writing frontend code, consider differences between H5 and WeChat mini-program platforms (API availability, storage methods, etc.).
