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
}

/* Local icon font to avoid runtime network dependency */
@font-face {
  font-family: "Material Symbols Outlined";
  src: url("/static/fonts/MaterialSymbolsOutlined.woff2") format("woff2");
  font-style: normal;
  font-weight: 100 700;
  font-display: swap;
}

.app-icon {
  font-family: "Material Symbols Outlined";
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
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

/* 基础重置 */
page {
  background-color: var(--background-light);
  color: var(--text-main);
  font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.5;
}

.dark {
  background-color: var(--background-dark);
  color: #fff;
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
