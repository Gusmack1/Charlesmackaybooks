# ⚡ IMMEDIATE DNS FIX - Quick Action Card

## 🎯 Your Issue
**Error**: "DNS verification failed - charlesmackaybooks.com doesn't appear to be served by Netlify"

## 🚨 IMMEDIATE ACTIONS (Do These Now)

### 1. Check Netlify Dashboard
- Go to: https://app.netlify.com
- Find your site → Domain settings
- Is `charlesmackaybooks.com` listed as a custom domain?

**If NO**: Click "Add custom domain" → Enter `charlesmackaybooks.com` → Save

### 2. Get Your DNS Targets
Netlify will show you one of these:

**Option A**: Netlify DNS servers (4 NS records)
**Option B**: IP address + CNAME records

**Write down the exact values shown!**

### 3. Update DNS at Your Domain Provider
Log into your domain provider (GoDaddy/Cloudflare/Namecheap/etc):

**For Netlify DNS** (recommended):
```
Record Type: NS
Name: @
Values: [The 4 DNS servers Netlify shows you]
```

**For IP-based DNS**:
```
Record Type: A
Name: @
Value: [IP address from Netlify]

Record Type: CNAME  
Name: www
Value: [your-site].netlify.app
```

### 4. Delete Old Records
**CRITICAL**: Delete any existing A records for your domain first!

### 5. Wait & Check
- **Wait**: 2-24 hours for DNS propagation
- **Check**: https://dnschecker.org → Enter `charlesmackaybooks.com`
- **Verify**: Should point to Netlify servers

### 6. Force SSL Renewal (After DNS propagates)
- Back to Netlify Dashboard → Domain settings → HTTPS
- Click "Renew certificate"

---

## ⏰ Expected Timeline
- **DNS update**: Immediate (at your provider)
- **Propagation**: 1-24 hours  
- **SSL fix**: Automatic after propagation

## 📱 Quick Test Command
```bash
nslookup charlesmackaybooks.com
# Should show Netlify's servers after propagation
```

---

## 🆘 If Still Stuck
1. **Check Netlify docs**: https://docs.netlify.com/domains-https/custom-domains/
2. **DNS propagation checker**: https://dnschecker.org
3. **Netlify support**: https://support.netlify.com

**The key is getting your DNS to point to Netlify's servers - once that's done, SSL will work automatically.**
