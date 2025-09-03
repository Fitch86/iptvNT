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

#### 方案1: 本地HTTP服务器
```bash
# 构建生产版本
npm run build:prod

# 全局安装http-server
npm install -g http-server

# 启动应用服务
http-server dist/browser -p 8080 -o

# 注意: 本地测试默认配置使用 http://localhost:3001
# 确保你的tvcors-proxy在3001端口运行
```

**Windows PowerShell 替代方案:**
```powershell
# 设置环境变量
$env:BACKEND_URL = "http://localhost:3001"

# 构建生产版本
npm run build:prod

# 为本地测试配置后端URL
(Get-Content dist/browser/assets/config.json) -replace 'PLACEHOLDER_BACKEND_URL', $env:BACKEND_URL | Set-Content dist/browser/assets/config.json

# 启动应用服务
http-server dist/browser --port 8080 --cors

# 或使用提供的批处理脚本:
# .\build-local.bat    # 构建并配置
# .\start-local.bat    # 启动服务器
```

#### 方案2: Netlify部署
1. **设置仓库**: 将代码推送到GitHub
2. **Netlify配置**: 
   - 构建命令: `npm run build:prod && sed -i 's|http://localhost:3001|'$BACKEND_URL'|g' dist/browser/assets/config.json`
   - 发布目录: `dist/browser`
   - 环境变量: 设置 `BACKEND_URL` 为你的tvcors-proxy URL
3. **部署**: 将GitHub仓库连接到Netlify

#### 方案3: Cloudflare Pages部署
1. **设置仓库**: 将代码推送到GitHub
2. **Cloudflare Pages配置**:
   - 构建命令: `chmod +x build-cf.sh && ./build-cf.sh`
   - 构建输出目录: `dist/browser`
   - 环境变量: 设置 `BACKEND_URL` 为你的tvcors-proxy URL
3. **部署**: 将GitHub仓库连接到Cloudflare Pages

#### 方案4: Docker部署
```bash
# 构建Docker镜像
docker build -t iptvnt .

# 运行容器
docker run -p 80:80 iptvnt
```

## 📖 使用指南

### 后端URL配置
iptvNT现在支持在设置页面中配置自定义后端URL:

1. **打开设置**: 点击右上角菜单 → 设置
2. **配置后端URL**: 在"Backend URL"字段中输入你的tvcors-proxy地址
   - 例如: `http://localhost:3001` 或 `https://your-backend.com`
3. **保存设置**: 点击保存按钮
4. **优先级**: 本地设置 > 环境变量 > 默认配置

**配置优先级说明:**
- 🥇 **浏览器本地设置** - 在设置页面配置的URL (最高优先级)
- 🥈 **环境变量** - 开发模式下的环境配置
- 🥉 **默认配置** - config.json中的配置 (生产环境)

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
