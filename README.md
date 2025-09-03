# iptvNT

![iptvNT](https://raw.githubusercontent.com/Fitch86/iptvNT/main/src/assets/icons/icon.png)

**iptvNT** is a modern web-based IPTV player that provides seamless playback of IPTV playlists (m3u, m3u8) with advanced proxy support and custom User-Agent headers. Built as a Progressive Web App (PWA) with Angular and integrated with tvcors-proxy for CORS handling.

⚠️ **Note**: iptvNT is a generic IPTV player application that doesn't provide any playlists or digital content. Users must provide their own legitimate IPTV sources.

![iptvNT: Channels list, player and epg list](./iptv-dark-theme.png)

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

#### Option 1: Local HTTP Server
```bash
# Build for production
npm run build:prod

# Install http-server globally
npm install -g http-server

# Serve the application
http-server dist/browser -p 8080 -o

# Note: For local testing, the default config uses http://localhost:3001
# Make sure your tvcors-proxy is running on port 3001
```

**Windows PowerShell Alternative:**
```powershell
# Set environment variable
$env:BACKEND_URL = "http://localhost:3001"

# Build for production
npm run build:prod

# Configure backend URL for local testing
(Get-Content dist/browser/assets/config.json) -replace 'PLACEHOLDER_BACKEND_URL', $env:BACKEND_URL | Set-Content dist/browser/assets/config.json

# Serve the application
http-server dist/browser --port 8080 --cors

# Or use the provided batch scripts:
# .\build-local.bat    # Build and configure
# .\start-local.bat    # Start server
```

#### Option 2: Netlify Deployment
1. **Setup Repository**: Push your code to GitHub
2. **Netlify Configuration**: 
   - Build command: `npm run build:prod && sed -i 's|http://localhost:3001|'$BACKEND_URL'|g' dist/browser/assets/config.json`
   - Publish directory: `dist/browser`
   - Environment variables: Set `BACKEND_URL` to your tvcors-proxy URL
3. **Deploy**: Connect your GitHub repo to Netlify

#### Option 3: Cloudflare Pages Deployment
1. **Setup Repository**: Push your code to GitHub
2. **Cloudflare Pages Configuration**:
   - Build command: `chmod +x build-cf.sh && ./build-cf.sh`
   - Build output directory: `dist/browser`
   - Environment variables: Set `BACKEND_URL` to your tvcors-proxy URL
3. **Deploy**: Connect your GitHub repo to Cloudflare Pages

#### Option 4: Docker Deployment
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

### Environment Configuration

The application uses runtime configuration for flexible deployment:

**Local Development**: 
- Default config: `http://localhost:3001`
- Modify `src/assets/config.json` if needed

**Production Deployment**:
- Netlify/CF Pages: Set `BACKEND_URL` environment variable
- Docker: Configure via environment variables
- Static hosting: Manually edit `dist/browser/assets/config.json`

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
git clone https://github.com/Fitch86/iptvNT.git
cd iptvNT
npm install
npm run serve
```

## 📄 License

[MIT](LICENSE.md)

## 🙏 Acknowledgments

Based on the original IPTVnator project by 4gray, enhanced with modern web technologies and proxy integration.
