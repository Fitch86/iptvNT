# Netlify 部署指南

## 快速部署步骤

### 1. 连接 GitHub 仓库
1. 登录 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择 GitHub 并授权
4. 选择 `Fitch86/iptvNT` 仓库

### 2. 配置构建设置
- **Branch to deploy**: `main`
- **Build command**: `npm run build:prod`
- **Publish directory**: `dist/iptvnator`

### 3. 环境变量配置
在 Netlify 控制台的 Site settings > Environment variables 中添加：

```
BACKEND_URL=https://your-proxy-backend.com
```

**重要**: 替换为你的实际代理服务器地址

### 4. 高级设置（可选）
- **Node.js version**: 20.x
- **Build image**: Ubuntu Focal 20.04

## 代理后端要求

iptvNT 需要一个后端代理来处理 CORS 和 User-Agent 头：

### 推荐的代理后端
1. **tvcors-proxy**: https://github.com/Fitch86/tvcors-proxy
2. 部署到 Vercel、Railway 或其他平台
3. 获取部署 URL 并设置为 `BACKEND_URL`

### 代理 URL 格式
```
https://your-proxy.com/proxy?url={VIDEO_URL}&user-agent={USER_AGENT}
```

## 部署后验证

1. 检查构建日志确保成功
2. 访问部署的网站
3. 测试播放列表导入功能
4. 验证视频播放是否正常

## 故障排除

### 构建失败
- 检查 Node.js 版本是否为 20.x
- 确认构建命令正确
- 查看构建日志中的错误信息

### 播放问题
- 验证 `BACKEND_URL` 环境变量设置正确
- 确保代理后端服务正常运行
- 检查浏览器控制台错误

## 自定义域名（可选）

1. 在 Netlify 控制台添加自定义域名
2. 配置 DNS 记录指向 Netlify
3. 启用 HTTPS（自动）

## 持续部署

- 推送到 `main` 分支会自动触发重新部署
- 可以在 Netlify 控制台查看部署历史
- 支持预览部署（Pull Request）
