# iptvNT

![iptvNT](https://raw.githubusercontent.com/fitch86/iptvNT/main/src/assets/icons/icon.png)

**iptvNT** is a modern web-based IPTV player that provides seamless playback of IPTV playlists (m3u, m3u8) with advanced proxy support and custom User-Agent headers. Built as a Progressive Web App (PWA) with Angular and integrated with tvcors-proxy for CORS handling.

⚠️ **Note**: iptvNT is a generic IPTV player application that doesn't provide any playlists or digital content. Users must provide their own legitimate IPTV sources.

![IPTVnator: Channels list, player and epg list](./iptv-dark-theme.png)

## ✨ Features

- 📺 **M3u and M3u8 playlists support** with advanced parsing
- 🔗 **Proxy integration** with tvcors-proxy for seamless streaming
- 🔧 **Custom User-Agent headers** per playlist and channel
- 🌐 **Progressive Web App (PWA)** - works in any modern browser
- 📁 **Multiple import methods** - file upload or remote URL
- 🔄 **Auto-refresh playlists** with configurable intervals
- 🔍 **Advanced search** across channels and groups
- 📺 **EPG support** (TV Guide) with XMLTV format
- ⭐ **Channel favorites** and custom grouping
- 🎨 **Modern UI** with light and dark themes
- 🌍 **Multi-language support** (English, Chinese, and more)
- ⚡ **High performance** video playback with VideoJS and HLS.js
- 🔒 **CORS handling** for restricted streaming sources

## Screenshots:

|                 Welcome screen: Playlists overview                 | Main player interface with channels sidebar and video player  |
| :----------------------------------------------------------------: | :-----------------------------------------------------------: |
|       ![Welcome screen: Playlists overview](./playlists.png)       |   ![Sidebar with channel and video player](./iptv-main.png)   |
|            Welcome screen: Add playlist via file upload            |             Welcome screen: Add playlist via URL              |
| ![Welcome screen: Add playlist via file upload](./iptv-upload.png) | ![Welcome screen: Add playlist via URL](./upload-via-url.png) |
|              EPG Sidebar: TV guide on the right side               |                 General application settings                  |
|         ![EPG: TV guide on the right side](./iptv-epg.png)         |         ![General app settings](./iptv-settings.png)          |
|                         Playlist settings                          |
|         ![Playlist settings](./iptv-playlist-settings.png)         |                                                               |

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Start tvcors-proxy (required for streaming)
# In a separate terminal, run your tvcors-proxy server on port 3001
```

### Production Deployment

#### Option 1: Static Hosting (Recommended)
```bash
# Build for production
npm run build:prod

# Deploy the dist/ folder to any static hosting service:
# - Netlify, Vercel, GitHub Pages
# - Nginx, Apache, or any web server
# - CDN services like Cloudflare Pages
```

#### Option 2: Docker Deployment
```bash
# Build Docker image
docker build -t iptvnt .

# Run container
docker run -p 80:80 iptvnt
```

#### Backend Requirements
iptvNT requires a tvcors-proxy backend for streaming functionality:
- Clone and deploy [tvcors-proxy](https://github.com/your-proxy-repo)
- Configure `BACKEND_URL` in environment settings
- Ensure CORS is properly configured

## 📖 Usage Guide

### Adding Playlists
1. **Via URL**: Enter playlist URL and optional User-Agent header
2. **Via File**: Upload M3U/M3U8 files directly from your device

### Custom User-Agent
Many IPTV providers require specific User-Agent headers:
```
okHttp/Mod-1.2.0
VLC/3.0.0 LibVLC/3.0.0
Mozilla/5.0 (compatible; IPTV)
```

### Proxy Configuration
The app automatically routes streaming requests through tvcors-proxy:
- Development: `http://localhost:3001/api/proxy`
- Production: Configure `BACKEND_URL` environment variable

## 🛠️ Technical Stack

- **Frontend**: Angular 19, TypeScript, Angular Material
- **Video Player**: VideoJS with HLS.js support
- **State Management**: NgRx for application state
- **Storage**: IndexedDB for offline playlist storage
- **PWA**: Service Worker for offline functionality
- **Proxy**: tvcors-proxy for CORS and User-Agent handling

## 🌐 Browser Support

- Chrome/Chromium 91+
- Firefox 90+
- Safari 14+
- Edge 91+

## 📱 Mobile Support

iptvNT works on mobile devices as a PWA:
- Add to home screen for app-like experience
- Responsive design for all screen sizes
- Touch-friendly controls

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

### Development Setup
```bash
git clone https://github.com/fitch86/iptvNT.git
cd iptvNT
npm install
npm run serve
```

## 📄 License

[MIT](LICENSE.md)

## 🙏 Acknowledgments

Based on the original IPTVnator project by 4gray, enhanced with modern web technologies and proxy integration.
