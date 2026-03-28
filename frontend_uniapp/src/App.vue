<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
/* 全局样式与主题变量 */
:root {
  --primary: #ee7c2b;
  --background-light: #faf9f8;
  --background-dark: #221810;
  --surface-light: #ffffff;
  --surface-dark: #2d2118;
  --text-main: #332c26;
  --text-muted: #9a8c7c;
  --page-gutter: 28rpx;
  --page-gutter-wide: 40rpx;
  --page-card-radius: 32rpx;
}

.app-icon {
  font-family: "PingFang SC", "Helvetica Neue", Arial, sans-serif;
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}

/* 基础重置 */
page {
  background-color: var(--background-light);
  color: var(--text-main);
  font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.5;
  overflow-x: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.dark {
  background-color: var(--background-dark);
  color: #fff;
}

.page-shell {
  width: 100%;
  box-sizing: border-box;
  padding-left: var(--page-gutter);
  padding-right: var(--page-gutter);
}

.page-shell-wide {
  width: 100%;
  box-sizing: border-box;
  padding-left: var(--page-gutter-wide);
  padding-right: var(--page-gutter-wide);
}

.card-shell {
  width: 100%;
  box-sizing: border-box;
  border-radius: var(--page-card-radius);
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

/* 常用工具类 (模拟 Tailwind) */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.relative { position: relative; }
.absolute { position: absolute; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.w-full { width: 100%; }
.h-full { height: 100%; }
.rounded-full { border-radius: 9999px; }
.overflow-hidden { overflow: hidden; }
.object-cover { object-fit: cover; }
.font-bold { font-weight: bold; }
</style>
