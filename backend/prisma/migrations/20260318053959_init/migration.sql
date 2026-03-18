-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(50),
    "avatar" VARCHAR(255),
    "gender" SMALLINT NOT NULL DEFAULT 0,
    "birthday" TIMESTAMP(3),
    "province" VARCHAR(50),
    "city" VARCHAR(50),
    "district" VARCHAR(50),
    "role" VARCHAR(20) NOT NULL DEFAULT 'user',
    "status" SMALLINT NOT NULL DEFAULT 1,
    "wechat_openid" VARCHAR(100),
    "alipay_userid" VARCHAR(100),
    "api_key" VARCHAR(100),
    "last_login_at" TIMESTAMP(3),
    "last_login_ip" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "communities" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "province" VARCHAR(50) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "district" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "longitude" DECIMAL(10,7) NOT NULL,
    "latitude" DECIMAL(10,7) NOT NULL,
    "property_type" VARCHAR(50),
    "build_year" INTEGER,
    "developer" VARCHAR(100),
    "property_company" VARCHAR(100),
    "property_fee" DECIMAL(10,2),
    "green_rate" DECIMAL(5,2),
    "plot_rate" DECIMAL(5,2),
    "total_buildings" INTEGER,
    "total_households" INTEGER,
    "parking_spaces" INTEGER,
    "description" TEXT,
    "images" JSONB,
    "tags" JSONB,
    "facilities" JSONB,
    "rating_avg" DECIMAL(3,2) NOT NULL DEFAULT 0,
    "rating_count" INTEGER NOT NULL DEFAULT 0,
    "comment_count" INTEGER NOT NULL DEFAULT 0,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "favorite_count" INTEGER NOT NULL DEFAULT 0,
    "status" SMALLINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "communities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "community_id" BIGINT NOT NULL,
    "parent_id" BIGINT,
    "content" TEXT NOT NULL,
    "images" JSONB,
    "videos" JSONB,
    "rating" SMALLINT NOT NULL DEFAULT 0,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "reply_count" INTEGER NOT NULL DEFAULT 0,
    "report_count" INTEGER NOT NULL DEFAULT 0,
    "status" SMALLINT NOT NULL DEFAULT 0,
    "audit_status" SMALLINT NOT NULL DEFAULT 0,
    "audit_result" TEXT,
    "audit_user_id" BIGINT,
    "audit_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_likes" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comment_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_replies" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comment_id" BIGINT NOT NULL,
    "reply_user_id" BIGINT,
    "content" TEXT NOT NULL,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "status" SMALLINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "comment_replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment_reports" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "comment_id" BIGINT NOT NULL,
    "reason" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "status" SMALLINT NOT NULL DEFAULT 0,
    "audit_user_id" BIGINT,
    "handle_user_id" BIGINT,
    "handle_result" TEXT,
    "handle_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "file_name" VARCHAR(255) NOT NULL,
    "file_path" VARCHAR(500) NOT NULL,
    "file_url" VARCHAR(500) NOT NULL,
    "file_type" VARCHAR(50) NOT NULL,
    "file_size" BIGINT NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "duration" INTEGER,
    "thumb_url" VARCHAR(500),
    "status" SMALLINT NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contract_verifications" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "community_id" BIGINT NOT NULL,
    "contract_file_id" BIGINT,
    "contract_images" JSONB,
    "ocr_result" JSONB,
    "verification_result" JSONB,
    "status" SMALLINT NOT NULL DEFAULT 0,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contract_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ads" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "image_url" VARCHAR(500) NOT NULL,
    "link_url" VARCHAR(500) NOT NULL,
    "position" VARCHAR(50) NOT NULL,
    "ad_type" VARCHAR(50) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "status" SMALLINT NOT NULL DEFAULT 1,
    "impression_count" INTEGER NOT NULL DEFAULT 0,
    "click_count" INTEGER NOT NULL DEFAULT 0,
    "ctr" DECIMAL(5,4) NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_impressions" (
    "id" BIGSERIAL NOT NULL,
    "ad_id" BIGINT NOT NULL,
    "user_id" BIGINT,
    "ip" VARCHAR(50),
    "user_agent" VARCHAR(500),
    "device_type" VARCHAR(50),
    "os_type" VARCHAR(50),
    "browser_type" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_impressions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad_clicks" (
    "id" BIGSERIAL NOT NULL,
    "ad_id" BIGINT NOT NULL,
    "user_id" BIGINT,
    "ip" VARCHAR(50),
    "user_agent" VARCHAR(500),
    "device_type" VARCHAR(50),
    "os_type" VARCHAR(50),
    "browser_type" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ad_clicks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT,
    "data" JSONB,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "keyword" VARCHAR(100) NOT NULL,
    "search_type" VARCHAR(50),
    "result_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hot_searches" (
    "id" BIGSERIAL NOT NULL,
    "keyword" VARCHAR(100) NOT NULL,
    "search_count" INTEGER NOT NULL DEFAULT 0,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hot_searches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "community_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_view_histories" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "community_id" BIGINT NOT NULL,
    "view_count" INTEGER NOT NULL DEFAULT 1,
    "last_viewed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_view_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_configs" (
    "id" BIGSERIAL NOT NULL,
    "config_key" VARCHAR(100) NOT NULL,
    "config_value" TEXT,
    "config_type" VARCHAR(50) NOT NULL DEFAULT 'string',
    "description" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operation_logs" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT,
    "username" VARCHAR(50),
    "action" VARCHAR(50) NOT NULL,
    "module" VARCHAR(50),
    "details" JSONB,
    "ip" VARCHAR(50),
    "user_agent" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "operation_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "users_wechat_openid_key" ON "users"("wechat_openid");

-- CreateIndex
CREATE UNIQUE INDEX "users_alipay_userid_key" ON "users"("alipay_userid");

-- CreateIndex
CREATE UNIQUE INDEX "users_api_key_key" ON "users"("api_key");

-- CreateIndex
CREATE INDEX "communities_name_idx" ON "communities"("name");

-- CreateIndex
CREATE INDEX "communities_city_idx" ON "communities"("city");

-- CreateIndex
CREATE INDEX "communities_district_idx" ON "communities"("district");

-- CreateIndex
CREATE INDEX "communities_longitude_latitude_idx" ON "communities"("longitude", "latitude");

-- CreateIndex
CREATE INDEX "communities_rating_avg_idx" ON "communities"("rating_avg");

-- CreateIndex
CREATE INDEX "communities_comment_count_idx" ON "communities"("comment_count");

-- CreateIndex
CREATE INDEX "communities_status_idx" ON "communities"("status");

-- CreateIndex
CREATE INDEX "communities_created_at_idx" ON "communities"("created_at");

-- CreateIndex
CREATE INDEX "comments_user_id_idx" ON "comments"("user_id");

-- CreateIndex
CREATE INDEX "comments_community_id_idx" ON "comments"("community_id");

-- CreateIndex
CREATE INDEX "comments_parent_id_idx" ON "comments"("parent_id");

-- CreateIndex
CREATE INDEX "comments_status_idx" ON "comments"("status");

-- CreateIndex
CREATE INDEX "comments_audit_status_idx" ON "comments"("audit_status");

-- CreateIndex
CREATE INDEX "comments_rating_idx" ON "comments"("rating");

-- CreateIndex
CREATE INDEX "comments_created_at_idx" ON "comments"("created_at");

-- CreateIndex
CREATE INDEX "comment_likes_comment_id_idx" ON "comment_likes"("comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "comment_likes_user_id_comment_id_key" ON "comment_likes"("user_id", "comment_id");

-- CreateIndex
CREATE INDEX "comment_replies_user_id_idx" ON "comment_replies"("user_id");

-- CreateIndex
CREATE INDEX "comment_replies_comment_id_idx" ON "comment_replies"("comment_id");

-- CreateIndex
CREATE INDEX "comment_replies_reply_user_id_idx" ON "comment_replies"("reply_user_id");

-- CreateIndex
CREATE INDEX "comment_replies_created_at_idx" ON "comment_replies"("created_at");

-- CreateIndex
CREATE INDEX "comment_reports_user_id_idx" ON "comment_reports"("user_id");

-- CreateIndex
CREATE INDEX "comment_reports_comment_id_idx" ON "comment_reports"("comment_id");

-- CreateIndex
CREATE INDEX "comment_reports_status_idx" ON "comment_reports"("status");

-- CreateIndex
CREATE INDEX "comment_reports_created_at_idx" ON "comment_reports"("created_at");

-- CreateIndex
CREATE INDEX "files_user_id_idx" ON "files"("user_id");

-- CreateIndex
CREATE INDEX "files_file_type_idx" ON "files"("file_type");

-- CreateIndex
CREATE INDEX "files_status_idx" ON "files"("status");

-- CreateIndex
CREATE INDEX "files_created_at_idx" ON "files"("created_at");

-- CreateIndex
CREATE INDEX "contract_verifications_user_id_idx" ON "contract_verifications"("user_id");

-- CreateIndex
CREATE INDEX "contract_verifications_community_id_idx" ON "contract_verifications"("community_id");

-- CreateIndex
CREATE INDEX "contract_verifications_status_idx" ON "contract_verifications"("status");

-- CreateIndex
CREATE INDEX "contract_verifications_created_at_idx" ON "contract_verifications"("created_at");

-- CreateIndex
CREATE INDEX "ads_position_idx" ON "ads"("position");

-- CreateIndex
CREATE INDEX "ads_status_idx" ON "ads"("status");

-- CreateIndex
CREATE INDEX "ads_start_time_idx" ON "ads"("start_time");

-- CreateIndex
CREATE INDEX "ads_end_time_idx" ON "ads"("end_time");

-- CreateIndex
CREATE INDEX "ads_priority_idx" ON "ads"("priority");

-- CreateIndex
CREATE INDEX "ad_impressions_ad_id_idx" ON "ad_impressions"("ad_id");

-- CreateIndex
CREATE INDEX "ad_impressions_user_id_idx" ON "ad_impressions"("user_id");

-- CreateIndex
CREATE INDEX "ad_impressions_created_at_idx" ON "ad_impressions"("created_at");

-- CreateIndex
CREATE INDEX "ad_clicks_ad_id_idx" ON "ad_clicks"("ad_id");

-- CreateIndex
CREATE INDEX "ad_clicks_user_id_idx" ON "ad_clicks"("user_id");

-- CreateIndex
CREATE INDEX "ad_clicks_created_at_idx" ON "ad_clicks"("created_at");

-- CreateIndex
CREATE INDEX "messages_user_id_idx" ON "messages"("user_id");

-- CreateIndex
CREATE INDEX "messages_type_idx" ON "messages"("type");

-- CreateIndex
CREATE INDEX "messages_is_read_idx" ON "messages"("is_read");

-- CreateIndex
CREATE INDEX "messages_created_at_idx" ON "messages"("created_at");

-- CreateIndex
CREATE INDEX "search_histories_user_id_idx" ON "search_histories"("user_id");

-- CreateIndex
CREATE INDEX "search_histories_keyword_idx" ON "search_histories"("keyword");

-- CreateIndex
CREATE INDEX "search_histories_created_at_idx" ON "search_histories"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "hot_searches_keyword_key" ON "hot_searches"("keyword");

-- CreateIndex
CREATE INDEX "hot_searches_search_count_idx" ON "hot_searches"("search_count");

-- CreateIndex
CREATE INDEX "hot_searches_rank_idx" ON "hot_searches"("rank");

-- CreateIndex
CREATE INDEX "user_favorites_user_id_idx" ON "user_favorites"("user_id");

-- CreateIndex
CREATE INDEX "user_favorites_community_id_idx" ON "user_favorites"("community_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_favorites_user_id_community_id_key" ON "user_favorites"("user_id", "community_id");

-- CreateIndex
CREATE INDEX "user_view_histories_user_id_idx" ON "user_view_histories"("user_id");

-- CreateIndex
CREATE INDEX "user_view_histories_community_id_idx" ON "user_view_histories"("community_id");

-- CreateIndex
CREATE INDEX "user_view_histories_last_viewed_at_idx" ON "user_view_histories"("last_viewed_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_view_histories_user_id_community_id_key" ON "user_view_histories"("user_id", "community_id");

-- CreateIndex
CREATE UNIQUE INDEX "system_configs_config_key_key" ON "system_configs"("config_key");

-- CreateIndex
CREATE INDEX "system_configs_config_key_idx" ON "system_configs"("config_key");

-- CreateIndex
CREATE INDEX "operation_logs_user_id_idx" ON "operation_logs"("user_id");

-- CreateIndex
CREATE INDEX "operation_logs_action_idx" ON "operation_logs"("action");

-- CreateIndex
CREATE INDEX "operation_logs_module_idx" ON "operation_logs"("module");

-- CreateIndex
CREATE INDEX "operation_logs_created_at_idx" ON "operation_logs"("created_at");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_audit_user_id_fkey" FOREIGN KEY ("audit_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_likes" ADD CONSTRAINT "comment_likes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_replies" ADD CONSTRAINT "comment_replies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_replies" ADD CONSTRAINT "comment_replies_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_replies" ADD CONSTRAINT "comment_replies_reply_user_id_fkey" FOREIGN KEY ("reply_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_audit_user_id_fkey" FOREIGN KEY ("audit_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment_reports" ADD CONSTRAINT "comment_reports_handle_user_id_fkey" FOREIGN KEY ("handle_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_verifications" ADD CONSTRAINT "contract_verifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contract_verifications" ADD CONSTRAINT "contract_verifications_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_impressions" ADD CONSTRAINT "ad_impressions_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_impressions" ADD CONSTRAINT "ad_impressions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_clicks" ADD CONSTRAINT "ad_clicks_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad_clicks" ADD CONSTRAINT "ad_clicks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "search_histories" ADD CONSTRAINT "search_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_view_histories" ADD CONSTRAINT "user_view_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_view_histories" ADD CONSTRAINT "user_view_histories_community_id_fkey" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operation_logs" ADD CONSTRAINT "operation_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
