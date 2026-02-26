# 租房避雷App - Demo展示说明

## 📱 Demo文件列表

| 文件名 | 平台 | 页面 | 说明 |
|--------|------|------|------|
| [demo-mobile-home.html](./demo-mobile-home.html) | 移动端 | 首页 | 展示搜索、Banner、快捷入口、热门小区、广告位 |
| [demo-mobile-detail.html](./demo-mobile-detail.html) | 移动端 | 小区详情 | 展示小区信息、统计数据、评论列表 |
| [demo-mobile-publish.html](./demo-mobile-publish.html) | 移动端 | 发布评论 | 展示房源选择、评论类型、内容编辑 |
| [demo-web-home.html](./demo-web-home.html) | 网页端 | 首页 | 展示Hero区域、热门小区、避雷榜单、广告位 |

---

## 📺 广告位设计

### 移动端广告位

#### 1. 首页Banner广告（轮播）
**位置**：首页顶部Banner区域
**尺寸**：375 × 180px
**展示规则**：
- 每30秒自动切换
- 支持手动点击切换
- 显示指示点（当前页高亮）
**广告内容**：
- 租房避雷指南
- 优质小区推荐
- 避雷榜单

#### 2. 首页横幅广告
**位置**：快捷入口下方，热门小区列表上方
**尺寸**：335 × 100px
**样式**：
- 渐变背景（粉黄渐变）
- 旋转光晕动画
- 右上角"广告"标识
**交互**：
- 悬停时上浮4px
- 点击跳转广告链接
- 追踪广告点击事件

#### 3. 信息流广告
**位置**：热门小区列表中，每隔2-3个小区插入
**尺寸**：335 × 自适应
**样式**：
- 白色背景
- 虚线边框
- 右上角"广告"标识
**交互**：
- 悬停时边框变色
- 点击跳转广告链接

### 网页端广告位

#### 1. Hero区域广告（可选）
**位置**：Hero区域背景或覆盖层
**尺寸**：1200 × 480px
**样式**：
- 渐变背景
- 旋转光晕动画
- 可与Hero内容融合

#### 2. 大横幅广告
**位置**：热门小区列表下方，避雷榜单上方
**尺寸**：1120 × 160px
**样式**：
- 渐变背景（粉黄渐变）
- 旋转光晕动画
- 左侧广告内容，右侧"广告"标识
- 包含"立即查看"按钮
**交互**：
- 悬停时上浮8px
- 点击跳转广告链接
- 追踪广告点击事件

#### 3. 侧边栏广告（小区详情页）
**位置**：右侧边栏
**尺寸**：300 × 250px
**样式**：
- 白色背景
- 阴影效果
- 右上角"广告"标识
**交互**：
- 悬停时上浮
- 点击跳转广告链接

---

## ✨ 动态效果说明

### 1. Banner轮播动画
**实现方式**：JavaScript定时器 + CSS过渡
```javascript
let currentSlide = 0;
const totalSlides = 3;
let bannerInterval;

function initBanner() {
    bannerInterval = setInterval(nextSlide, 3000);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateBanner();
}
```
**效果**：
- 每3秒自动切换
- 淡入淡出过渡（0.5s）
- 点击指示点可手动切换
- 手动切换后重置定时器

### 2. 旋转光晕动画
**实现方式**：CSS关键帧动画
```css
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.banner::before {
    animation: rotate 20s linear infinite;
}
```
**效果**：
- 持续旋转的光晕效果
- 20秒旋转一圈
- 不影响内容交互（pointer-events: none）

### 3. 悬停上浮动画
**实现方式**：CSS过渡
```css
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```
**效果**：
- 鼠标悬停时卡片上浮
- 阴影增强
- 平滑过渡（0.3s）

### 4. 导航下划线动画
**实现方式**：CSS伪元素 + 过渡
```css
.nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}
```
**效果**：
- 悬停时下划线从左到右展开
- 渐变色下划线
- 平滑过渡

### 5. 淡入上升动画
**实现方式**：CSS关键帧动画
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hero h1 {
    animation: fadeInUp 0.8s ease;
}
```
**效果**：
- 页面加载时元素淡入
- 从下往上移动
- 可设置延迟（0.2s、0.4s）

### 6. 加载动画
**实现方式**：CSS旋转动画
```css
@keyframes spin {
    to { transform: rotate(360deg); }
}

.loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #E5E7EB;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
```
**效果**：
- 持续旋转的加载圈
- 顶部颜色为品牌色
- 1秒旋转一圈

### 7. 滚动监听
**实现方式**：JavaScript滚动事件
```javascript
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
```
**效果**：
- 滚动超过50px时导航栏阴影增强
- 滚动超过300px时显示回到顶部按钮
- 平滑过渡

### 8. 按钮点击反馈
**实现方式**：CSS active伪类
```css
.btn:active {
    transform: scale(0.95);
}

.nav-item:active {
    transform: scale(0.95);
}
```
**效果**：
- 点击时按钮缩小
- 提供视觉反馈
- 0.3s过渡

---

## 🎯 交互功能

### 1. 导航切换
**功能**：底部导航/顶部导航切换
**实现**：
```javascript
function switchNav(element, page) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
    console.log('Navigate to:', page);
}
```

### 2. 页面跳转
**功能**：点击卡片跳转到详情页
**实现**：
```javascript
function navigateTo(page, id = null) {
    console.log('Navigate to:', page, id);
    if (page === 'detail') {
        alert('跳转到小区详情页 ID: ' + id);
    } else {
        alert('跳转到: ' + page);
    }
}
```

### 3. 广告点击追踪
**功能**：追踪广告点击事件
**实现**：
```javascript
function trackAdClick(type) {
    console.log('广告点击追踪:', type);
    alert('广告点击: ' + type);
}
```

### 4. 搜索功能
**功能**：搜索小区
**实现**：
```javascript
function search() {
    const searchInput = document.querySelector('.search-input');
    console.log('搜索:', searchInput.value);
    alert('搜索: ' + searchInput.value);
}
```

### 5. 回到顶部
**功能**：平滑滚动到页面顶部
**实现**：
```javascript
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
```

---

## 🎨 设计特点

### 1. 华丽的视觉效果
- ✅ 渐变背景（紫色到蓝色）
- ✅ 旋转光晕动画（持续20秒）
- ✅ 多层次阴影（4层阴影深度）
- ✅ 毛玻璃效果（backdrop-filter）

### 2. 充足的呼吸感
- ✅ 宽松间距（16-24px）
- ✅ 大圆角设计（12-24px）
- ✅ 充足留白（上下60px）
- ✅ 卡片间距合理（16-24px）

### 3. 现代化交互
- ✅ 悬停上浮效果（4-8px）
- ✅ 平滑过渡动画（0.3s）
- ✅ 点击反馈（缩放0.95）
- ✅ 清晰的状态切换

### 4. 清晰的视觉层次
- ✅ 色彩对比鲜明
- ✅ 字体层级明确
- ✅ 图标辅助理解
- ✅ 标签系统完善

---

## 📐 广告位布局图

### 移动端首页布局
```
┌─────────────────────────┐
│  状态栏 (44px)        │
├─────────────────────────┤
│  搜索栏 (56px)        │
├─────────────────────────┤
│  Banner轮播 (180px)   │ ← 广告位1
│  [轮播指示点]          │
├─────────────────────────┤
│  快捷入口 (4宫格)     │
├─────────────────────────┤
│  横幅广告 (100px)     │ ← 广告位2
│  [广告标识]            │
├─────────────────────────┤
│  热门小区标题          │
├─────────────────────────┤
│  小区卡片1             │
├─────────────────────────┤
│  小区卡片2             │
├─────────────────────────┤
│  信息流广告            │ ← 广告位3
│  [广告标识]            │
├─────────────────────────┤
│  小区卡片3             │
├─────────────────────────┤
│  加载中...             │
├─────────────────────────┤
│  底部导航 (64px)       │
└─────────────────────────┘
```

### 网页端首页布局
```
┌─────────────────────────────────────────────────────────┐
│  导航栏 (64px) - 固定顶部                        │
├─────────────────────────────────────────────────────────┤
│  Hero区域 (480px)                                │
│  [搜索框]                                        │
├─────────────────────────────────────────────────────────┤
│  热门小区标题                      [查看全部 →]   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐         │
│  │ 小区1   │  │ 小区2   │  │ 小区3   │         │
│  └─────────┘  └─────────┘  └─────────┘         │
├─────────────────────────────────────────────────────────┤
│  大横幅广告 (160px)                              │ ← 广告位
│  [广告内容]  [广告标识]  [立即查看]             │
├─────────────────────────────────────────────────────────┤
│  避雷榜单标题                      [查看全部 →]   │
├─────────────────────────────────────────────────────────┤
│  避雷小区1                                       │
│  避雷小区2                                       │
│  避雷小区3                                       │
├─────────────────────────────────────────────────────────┤
│  页脚 (200px)                                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 技术实现要点

### 1. 性能优化
- 使用CSS动画而非JavaScript动画
- 使用transform而非top/left
- 使用will-change提示浏览器优化
- 避免频繁的DOM操作

### 2. 兼容性
- 使用CSS前缀（-webkit-）
- 提供降级方案
- 测试主流浏览器
- 移动端触摸优化

### 3. 可访问性
- 提供键盘导航
- 添加ARIA标签
- 确保颜色对比度
- 支持屏幕阅读器

### 4. 广告追踪
- 记录广告展示
- 记录广告点击
- 记录用户行为
- 上报数据分析

---

## 📊 广告计费规则

### 展示计费（CPM）
- **价格**：¥0.05/次展示
- **计费方式**：每次广告展示到用户视野内计费
- **追踪方式**：Intersection Observer API

### 点击计费（CPC）
- **价格**：¥0.10/次点击
- **计费方式**：用户点击广告链接计费
- **追踪方式**：点击事件监听

### 综合计费
- **计费方式**：CPM + CPC
- **示例**：1000次展示 + 10次点击 = ¥50 + ¥1 = ¥51

---

**文档版本**：v2.0  
**创建日期**：2026-02-24  
**最后更新**：2026-02-24  
**文档状态**：待评审
