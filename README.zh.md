# iptvNT

![iptvNT](https://raw.githubusercontent.com/fitch86/iptvNT/main/src/assets/icons/icon.png)

**iptvNT** 是一款现代化的基于Web的IPTV播放器，提供IPTV播放列表(m3u, m3u8)的无缝播放，具有高级代理支持和自定义User-Agent头功能。基于Angular构建的渐进式Web应用(PWA)，集成tvcors-proxy处理CORS问题。

⚠️ **注意**: iptvNT是一个通用的IPTV播放器应用程序，不提供任何播放列表或数字内容。用户必须提供自己的合法IPTV源。

![iptvNT: 现代化IPTV播放器](./iptv-dark-theme.png)

## ✨ 功能特性

- 📺 **M3u和M3u8播放列表支持** - 高级解析功能
- 🔗 **代理集成** - 与tvcors-proxy无缝集成实现流畅播放
- 🔧 **自定义User-Agent头** - 支持播放列表和频道级别设置
- 🌐 **渐进式Web应用(PWA)** - 在任何现代浏览器中运行
- 📁 **多种导入方式** - 文件上传或远程URL
- 🔄 **自动刷新播放列表** - 可配置刷新间隔
- 🔍 **高级搜索** - 跨频道和分组搜索
- 📺 **EPG支持** - 电视节目指南，支持XMLTV格式
- ⭐ **频道收藏** - 自定义分组管理
- 🎨 **现代化UI** - 支持明暗主题
- 🌍 **多语言支持** - 中文、英文等多种语言
- ⚡ **高性能视频播放** - 基于VideoJS和HLS.js
- 🔒 **CORS处理** - 处理受限制的流媒体源

## 🚀 快速开始

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run serve

# 启动tvcors-proxy (流媒体播放必需)
# 在另一个终端中，在3001端口运行tvcors-proxy服务器
```

### 生产部署

#### 方案1: 静态托管 (推荐)
```bash
# 构建生产版本
npm run build:prod

# 将dist/文件夹部署到任何静态托管服务:
# - Netlify, Vercel, GitHub Pages
# - Nginx, Apache或任何Web服务器
# - CDN服务如Cloudflare Pages
```

#### 方案2: Docker部署
```bash
# 构建Docker镜像
docker build -t iptvnt .

# 运行容器
docker run -p 80:80 iptvnt
```

#### 后端要求
iptvNT需要tvcors-proxy后端来实现流媒体功能:
- 克隆并部署 [tvcors-proxy](https://github.com/your-proxy-repo)
- 在环境设置中配置 `BACKEND_URL`
- 确保CORS配置正确

## 📖 使用指南

### 添加播放列表
1. **通过URL**: 输入播放列表URL和可选的User-Agent头
2. **通过文件**: 直接从设备上传M3U/M3U8文件

### 自定义User-Agent
许多IPTV提供商需要特定的User-Agent头:
```
okHttp/Mod-1.2.0
VLC/3.0.0 LibVLC/3.0.0
Mozilla/5.0 (compatible; IPTV)
```

### 代理配置
应用自动通过tvcors-proxy路由流媒体请求:
- 开发环境: `http://localhost:3001/api/proxy`
- 生产环境: 配置 `BACKEND_URL` 环境变量

## 🛠️ 技术栈

- **前端**: Angular 19, TypeScript, Angular Material
- **视频播放器**: VideoJS with HLS.js support
- **状态管理**: NgRx for application state
- **存储**: IndexedDB for offline playlist storage
- **PWA**: Service Worker for offline functionality
- **代理**: tvcors-proxy for CORS and User-Agent handling

## 🌐 浏览器支持

- Chrome/Chromium 91+
- Firefox 90+
- Safari 14+
- Edge 91+

## 📱 移动端支持

iptvNT在移动设备上作为PWA运行:
- 添加到主屏幕获得类似应用的体验
- 响应式设计适配所有屏幕尺寸
- 触控友好的控制界面

## 🤝 贡献

欢迎贡献！请随时提交问题和拉取请求。

### 开发设置
```bash
git clone https://github.com/fitch86/iptvNT.git
cd iptvNT
npm install
npm run serve
```

## 📄 许可证

[MIT](LICENSE.md)

## 🙏 致谢

基于4gray的原始IPTVnator项目，使用现代Web技术和代理集成进行增强。

---

**注意**: iptvNT是一个通用的IPTV播放器应用程序，不提供任何播放列表或数字内容。用户必须提供自己的合法IPTV源。
