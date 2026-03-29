-- MVP refactor for backend/frontend integration
-- 1) user auth compatibility for wechat login
ALTER TABLE "users"
  ALTER COLUMN "phone" DROP NOT NULL,
  ALTER COLUMN "password" DROP NOT NULL;

-- 2) community enhancements for home/ranking/detail pages
ALTER TABLE "communities"
  ADD COLUMN "cover_image" VARCHAR(500),
  ADD COLUMN "highlights" JSONB,
  ADD COLUMN "quality_score" DECIMAL(5,2) NOT NULL DEFAULT 0,
  ADD COLUMN "risk_score" DECIMAL(5,2) NOT NULL DEFAULT 0,
  ADD COLUMN "risk_reason" VARCHAR(255),
  ADD COLUMN "safety_score" DECIMAL(3,2) NOT NULL DEFAULT 0,
  ADD COLUMN "quietness_score" DECIMAL(3,2) NOT NULL DEFAULT 0,
  ADD COLUMN "value_score" DECIMAL(3,2) NOT NULL DEFAULT 0,
  ADD COLUMN "is_recommended" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "recommend_order" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX "communities_quality_score_idx" ON "communities"("quality_score");
CREATE INDEX "communities_risk_score_idx" ON "communities"("risk_score");
CREATE INDEX "communities_is_recommended_recommend_order_idx" ON "communities"("is_recommended", "recommend_order");

-- 3) comment enhancements for publish/list pages
ALTER TABLE "comments"
  ADD COLUMN "tags" JSONB,
  ADD COLUMN "is_anonymous" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "is_verified" BOOLEAN NOT NULL DEFAULT false;
