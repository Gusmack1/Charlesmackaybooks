# 🔧 DNS & SSL Certificate Fix Guide for charlesmackaybooks.com

## 🚨 Current Issue
**Error**: "charlesmackaybooks.com doesn't appear to be served by Netlify"  
**Cause**: DNS records are not pointing to Netlify servers correctly

## 📋 Step-by-Step Solution

### Step 1: Verify Current Netlify Site Settings
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Find your Charles Mackay Books site
3. Click **Domain settings**
4. Check if `charlesmackaybooks.com` is listed as a custom domain

### Step 2: Add/Configure Custom Domain (if not done)
1. In Netlify Dashboard → **Domain management**
2. Click **Add custom domain**
3. Enter: `charlesmackaybooks.com`
4. Click **Verify** then **Add domain**

### Step 3: Get Netlify DNS Targets
After adding the domain, Netlify will show you the required DNS records:

**Option A: Netlify DNS (Recommended)**
- Use Netlify's DNS servers for automatic SSL management
- NS records will be provided (like `dns1.p03.nsone.net`)

**Option B: External DNS Provider**
- A record: `75.2.60.5` (example - use actual IP shown)
- CNAME: `your-site-name.netlify.app`

### Step 4: Update DNS Records at Your Domain Provider

#### If using Cloudflare/GoDaddy/Namecheap:
1. Log into your domain provider's DNS management
2. **Delete existing** A records for `charlesmackaybooks.com`
3. **Add new records** as shown by Netlify:

**For Netlify DNS (Recommended):**
```
Type: NS
Name: @
Value: dns1.p03.nsone.net
Value: dns2.p03.nsone.net
Value: dns3.p03.nsone.net
Value: dns4.p03.nsone.net
```

**For External DNS:**
```
Type: A
Name: @
Value: [Netlify's IP address]

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

### Step 5: Wait for DNS Propagation
- **Minimum**: 1-2 hours
- **Maximum**: 24-48 hours
- **Check progress**: Use [DNS Checker](https://dnschecker.org)

### Step 6: Force SSL Certificate Renewal
Once DNS propagates:
1. Go to Netlify Dashboard → **Domain settings**
2. Scroll to **HTTPS**
3. Click **Renew certificate**
4. Or click **Verify DNS configuration** first

## 🔍 Troubleshooting Commands

### Check Current DNS Status:
```bash
# Check A record
nslookup charlesmackaybooks.com

# Check with specific DNS server
nslookup charlesmackaybooks.com 8.8.8.8

# Check propagation
dig charlesmackaybooks.com
```

### Verify Netlify Connection:
```bash
# Should return your Netlify site
curl -I https://charlesmackaybooks.com
```

## 📊 Common DNS Configurations

### Scenario 1: First-time Setup
- Domain purchased but never configured
- **Action**: Set NS records to Netlify DNS servers

### Scenario 2: Existing Website Migration
- Domain currently points elsewhere
- **Action**: Update A record to Netlify IP

### Scenario 3: Cloudflare Users
- Domain using Cloudflare DNS
- **Action**: Set A record, disable proxy (gray cloud)

## 🎯 Expected Timeline
- **DNS Update**: Immediate at provider
- **Propagation**: 2-24 hours
- **SSL Certificate**: Automatic after propagation
- **Full Resolution**: Within 48 hours

## ⚡ Quick Fix Commands
If you have Netlify CLI installed:

```bash
# Check current site status
netlify status

# Link domain to site
netlify domains:add charlesmackaybooks.com

# Check DNS
netlify domains:list
```

## 🔐 SSL Certificate Details
Once DNS is correct:
- Netlify automatically provisions Let's Encrypt certificates
- Certificates renew automatically every 90 days
- Force renewal available in dashboard

## 📞 Support Contacts
- **Netlify Support**: [support.netlify.com](https://support.netlify.com)
- **DNS Propagation Checker**: [dnschecker.org](https://dnschecker.org)
- **Let's Encrypt Status**: [letsencrypt.status.io](https://letsencrypt.status.io)

## ✅ Verification Checklist
- [ ] Custom domain added in Netlify
- [ ] DNS records updated at domain provider
- [ ] DNS propagation completed (check with dig/nslookup)
- [ ] Site loads at charlesmackaybooks.com
- [ ] SSL certificate shows as "Provisioned" in Netlify
- [ ] HTTPS redirect working

---

## 🚀 After DNS Fix - Deployment
Once your SSL certificate is working:

```bash
cd Charlesmackaybooks
npm run build
# Deploy via Git push or Netlify CLI
```

The site is configured to work with Netlify's Next.js runtime for full functionality including API routes and dynamic features.
