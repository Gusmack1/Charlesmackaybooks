# Charles MacKay Books - Clean Deployment Guide

## ✅ What You Get
- Complete Charles MacKay Books website with 18+ aviation books
- Postage costs integrated (UK free, EU £4.95, USA £8.95, Worldwide £12.95)
- Blog with 12+ aviation history articles
- All 65 pages building successfully
- Production-ready configuration

## 🚀 Step-by-Step Deployment Guide

### 1. Push to Your GitHub Repository

```bash
# Add your GitHub repository
git remote add origin https://github.com/Gusmack1/Charlesmackaybooks.git

# Push to GitHub
git push -u origin main
```

### 2. Deploy to Netlify

#### Option A: Connect GitHub (Recommended)
1. Go to [Netlify](https://app.netlify.com)
2. Click "New site from Git"
3. Choose GitHub and select your `Charlesmackaybooks` repository
4. **Build settings will be auto-detected from netlify.toml:**
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node.js version: `20`

#### Option B: Manual Deploy (Fallback)
1. Run locally: `npm run build`
2. Zip the `out` folder
3. Drag & drop to Netlify dashboard

### 3. Configure Custom Domain (Optional)
1. In Netlify dashboard → Domain settings
2. Add custom domain: `charlesmackaybooks.com`
3. Configure DNS records as shown by Netlify

## 🔧 Key Configuration Files

### netlify.toml
- ✅ Static export configuration
- ✅ Node.js 20 for compatibility
- ✅ Security headers
- ✅ Cache optimization

### next.config.js
- ✅ Static export enabled
- ✅ Image optimization configured
- ✅ Trailing slashes for static hosting

### package.json
- ✅ Module type configured
- ✅ All dependencies included
- ✅ Build scripts ready

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## ✅ Pre-Deployment Checklist

- [x] All 65 pages build successfully
- [x] No build errors or warnings
- [x] Images load correctly
- [x] Postage costs display properly
- [x] Blog articles are accessible
- [x] Navigation works correctly
- [x] SEO metadata is complete

## 🚨 Troubleshooting

### If build fails:
1. Check Node.js version is 20: `node --version`
2. Clear cache: `rm -rf .next node_modules package-lock.json`
3. Reinstall: `npm install`
4. Try build: `npm run build`

### If images don't load:
- Check `next.config.js` remote patterns
- Verify image URLs in data files

### If deployment fails:
- Check Netlify build logs
- Ensure netlify.toml is properly configured
- Try manual deployment as fallback

## 📞 Support

Built with [Same](https://same.new) - all code is production-ready and tested.

**Deploy Status:** ✅ Ready for immediate deployment
