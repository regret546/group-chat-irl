# Quick Start: Setting Up groupchatirl.blog

Follow these steps to get your domain working in under 15 minutes!

## Prerequisites

- ✅ Domain purchased from Hostinger: `groupchatirl.blog`
- ✅ Server running at IP: `72.60.43.15`
- ✅ Nginx installed and running
- ✅ Node.js backend running on port 5000
- ✅ Frontend built and ready to deploy

## Quick Setup (5 Steps)

### Step 1: Configure DNS at Hostinger (2 minutes)

1. Log into Hostinger → **Domains** → **groupchatirl.blog**
2. Click **DNS / Nameservers**
3. Add these **A Records**:

**Record 1:**
- Type: **A**
- Host: **@** (or leave blank)
- Points to: **72.60.43.15**
- TTL: **3600**

**Record 2:**
- Type: **A**
- Host: **www**
- Points to: **72.60.43.15**
- TTL: **3600**

4. Save and wait 5-10 minutes for DNS to propagate

### Step 2: Update Nginx Configuration (3 minutes)

**On your server (72.60.43.15):**

```bash
# Edit your nginx config
sudo nano /etc/nginx/sites-available/group-chat-irl

# Or if you don't have one yet, create it
sudo nano /etc/nginx/sites-available/group-chat-irl
```

**Change this line:**
```nginx
server_name 72.60.43.15;
```

**To:**
```nginx
server_name groupchatirl.blog www.groupchatirl.blog;
```

**Save and test:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Step 3: Install SSL Certificate (5 minutes)

**On your server:**

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d groupchatirl.blog -d www.groupchatirl.blog
```

**Follow prompts:**
- Enter email: Your email address
- Agree to terms: Type `Y`
- Redirect HTTP to HTTPS: Type `2` (Yes, recommended)

**Done!** Certbot automatically configures everything for you.

### Step 4: Deploy Frontend (2 minutes)

**On your server:**

```bash
# Navigate to your project directory
cd /path/to/your/group-chat-irl

# Build the frontend (or copy your built dist folder here)
npm run build

# Copy to nginx directory
sudo cp -r dist /var/www/group-chat-irl/

# Set permissions
sudo chown -R www-data:www-data /var/www/group-chat-irl
sudo chmod -R 755 /var/www/group-chat-irl
```

### Step 5: Test Everything (3 minutes)

**Test from command line:**

```bash
# Test DNS
nslookup groupchatirl.blog
# Should show: 72.60.43.15

# Test HTTP redirect
curl -I http://groupchatirl.blog
# Should show: 301 redirect to https://

# Test HTTPS
curl -I https://groupchatirl.blog
# Should show: 200 OK
```

**Test in browser:**
1. Visit: https://groupchatirl.blog
2. Look for padlock icon 🔒
3. Test all pages work
4. Try uploading an episode

## Verification Checklist

- [ ] DNS resolves to `72.60.43.15`
- [ ] http:// redirects to https://
- [ ] https:// shows padlock in browser
- [ ] Frontend loads correctly
- [ ] API calls work (check Network tab)
- [ ] File uploads work (test episode upload)

## Common Issues & Quick Fixes

### "Domain not found" or "Connection refused"

**DNS hasn't propagated yet**
```bash
# Check DNS
nslookup groupchatirl.blog

# Wait 5-30 minutes and try again
# Check on: https://www.whatsmydns.net/#A/groupchatirl.blog
```

### "This site can't provide a secure connection"

**SSL certificate not installed**
```bash
# Check if certbot ran successfully
sudo certbot certificates

# If not, re-run certbot
sudo certbot --nginx -d groupchatirl.blog -d www.groupchatirl.blog

# Restart nginx
sudo systemctl restart nginx
```

### "502 Bad Gateway"

**Backend not running**
```bash
# Check backend status
pm2 status

# Start backend
pm2 start server.js --name group-chat-backend

# Check logs
pm2 logs
```

### Uploads still fail (413 error)

**Nginx config issue**
```bash
# Check config has client_max_body_size
sudo grep -n "client_max_body_size" /etc/nginx/sites-available/group-chat-irl

# If missing, add to server block and reload
sudo nano /etc/nginx/sites-available/group-chat-irl
# Add: client_max_body_size 100M;
sudo nginx -t && sudo systemctl reload nginx
```

## What's Next?

Your site is now live! Consider:

1. **Set up monitoring** (optional)
   - UptimeRobot
   - Pingdom
   
2. **Enable CDN** (optional, for faster loading)
   - Cloudflare (free)
   
3. **Set up backups** (recommended)
   - Back up MongoDB database
   - Back up uploaded files
   
4. **Monitor logs** (important)
   ```bash
   # Backend logs
   pm2 logs
   
   # Nginx logs
   sudo tail -f /var/log/nginx/error.log
   ```

## Useful Commands

```bash
# View nginx config
cat /etc/nginx/sites-available/group-chat-irl

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Check SSL certificate
sudo certbot certificates

# Renew SSL (auto, but you can test)
sudo certbot renew --dry-run

# Check backend
pm2 status
pm2 logs

# View file uploads
ls -lh /path/to/backend/uploads/

# Monitor real-time logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Need More Help?

- **Full guide:** See [DOMAIN_SETUP.md](DOMAIN_SETUP.md)
- **Deployment guide:** See [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md)
- **Quick setup:** See [QUICK_SETUP.md](QUICK_SETUP.md)

## Success!

If everything works, you should see:
- ✅ Site loads at https://groupchatirl.blog
- ✅ Green padlock in browser
- ✅ All pages working
- ✅ Uploads working
- ✅ No 413 errors

Congratulations! Your podcast site is live! 🎉🎙️

