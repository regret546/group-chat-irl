# Domain Setup Guide for groupchatirl.blog

This guide will walk you through setting up your Hostinger domain to point to your server and securing it with SSL.

## Overview

You need to:
1. **Configure DNS** at Hostinger to point to your server
2. **Update nginx** to use your domain
3. **Install SSL certificate** with Let's Encrypt (free)

## Step 1: Configure DNS at Hostinger

### Option A: If Your Server is at Hostinger

1. Log into your Hostinger account
2. Go to **Domains** → **groupchatirl.blog**
3. Click on **DNS / Nameservers**
4. Add or modify these DNS records:

**A Record:**
- **Type:** A
- **Host:** @ (or leave blank)
- **Points to:** `72.60.43.15` (your server IP)
- **TTL:** 3600

**A Record (for www subdomain):**
- **Type:** A
- **Host:** www
- **Points to:** `72.60.43.15`
- **TTL:** 3600

**Optional: CNAME for www (instead of A record):**
- **Type:** CNAME
- **Host:** www
- **Points to:** `@` or `groupchatirl.blog`
- **TTL:** 3600

### Option B: If Your Server is NOT at Hostinger

Use the same DNS configuration as above. The A records will point your domain to wherever your server is hosted.

### DNS Propagation

- Changes can take **5 minutes to 48 hours** to propagate
- Usually takes **30 minutes to 2 hours**
- You can check propagation with: https://www.whatsmydns.net/

## Step 2: Update Nginx Configuration

Update your nginx configuration to use your domain instead of just the IP address.

### On Your Server

1. **Edit your nginx configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/group-chat-irl
   ```

2. **Update the server_name line:**
   Change:
   ```nginx
   server_name 72.60.43.15;  # Your server IP or domain name
   ```
   
   To:
   ```nginx
   server_name groupchatirl.blog www.groupchatirl.blog;
   ```

3. **Save and test the configuration:**
   ```bash
   sudo nginx -t
   ```

4. **If successful, reload nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

## Step 3: Install SSL Certificate (HTTPS)

Let's Encrypt provides free SSL certificates. We'll use Certbot to install them.

### Install Certbot

1. **Update your system:**
   ```bash
   sudo apt update
   sudo apt upgrade -y
   ```

2. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

### Get SSL Certificate

1. **Run Certbot for nginx:**
   ```bash
   sudo certbot --nginx -d groupchatirl.blog -d www.groupchatirl.blog
   ```

2. **Follow the prompts:**
   - Enter your email address (for renewal notices)
   - Agree to the terms
   - Choose whether to redirect HTTP to HTTPS (Yes recommended)
   - Certbot will automatically configure nginx!

### Verify SSL Installation

1. **Check your website:**
   ```
   https://groupchatirl.blog
   ```

2. **You should see a padlock** in your browser indicating HTTPS is working!

3. **Certificate auto-renewal is already configured**

## Step 4: Complete Nginx Configuration

After SSL is installed, your nginx config should look like this (Certbot modifies it):

```nginx
# HTTP server - redirects to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name groupchatirl.blog www.groupchatirl.blog;
    
    # Redirect all HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    server_name groupchatirl.blog www.groupchatirl.blog;
    
    # SSL certificates (automatically added by Certbot)
    ssl_certificate /etc/letsencrypt/live/groupchatirl.blog/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/groupchatirl.blog/privkey.pem;
    
    # SSL configuration (automatically added by Certbot)
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    
    # IMPORTANT: Increase max body size for file uploads
    client_max_body_size 100M;
    
    # Increase timeouts for large file uploads
    client_body_timeout 120s;
    proxy_connect_timeout 120s;
    proxy_send_timeout 120s;
    proxy_read_timeout 120s;
    
    # Location for API requests (backend Node.js server)
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        
        # Proxy headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Buffer settings for large uploads
        proxy_request_buffering off;
        client_body_buffer_size 128k;
        proxy_buffering off;
    }
    
    # Location for uploaded files (served by backend)
    location /uploads {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        
        # Allow CORS for uploaded files
        add_header Access-Control-Allow-Origin *;
        
        # Cache uploaded files
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Location for static frontend files
    location / {
        root /var/www/group-chat-irl/dist;
        try_files $uri $uri/ /index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
    
    # Security: Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

## Step 5: Update Frontend Build

Make sure your frontend is built for production:

```bash
# On your local machine or server
cd /path/to/group-chat-irl
npm run build
```

Then copy the `dist` folder to your server if needed.

## Step 6: Test Your Setup

1. **Test DNS resolution:**
   ```bash
   nslookup groupchatirl.blog
   # or
   dig groupchatirl.blog
   ```
   
   Should return `72.60.43.15`

2. **Test HTTP (should redirect to HTTPS):**
   ```bash
   curl -I http://groupchatirl.blog
   ```
   
   Should show `301` redirect

3. **Test HTTPS:**
   ```bash
   curl -I https://groupchatirl.blog
   ```
   
   Should show `200 OK`

4. **Test in browser:**
   - Visit: https://groupchatirl.blog
   - Check for padlock icon
   - Test all pages work correctly

## Troubleshooting

### Domain Doesn't Resolve

**Problem:** Can't reach your site via domain name

**Solutions:**
1. **Check DNS propagation:**
   - Visit: https://www.whatsmydns.net/#A/groupchatirl.blog
   - Should show `72.60.43.15` everywhere

2. **Check DNS settings at Hostinger:**
   - A record should point to `72.60.43.15`
   - TTL should be reasonable (3600 seconds)

3. **Clear your local DNS cache:**
   ```bash
   # On Windows
   ipconfig /flushdns
   
   # On macOS/Linux
   sudo dscacheutil -flushcache
   ```

### SSL Certificate Errors

**Problem:** Browser shows SSL errors

**Solutions:**
1. **Check certificate is installed:**
   ```bash
   sudo certbot certificates
   ```

2. **Check nginx is listening on port 443:**
   ```bash
   sudo netstat -tlnp | grep 443
   # or
   sudo ss -tlnp | grep 443
   ```

3. **Check firewall allows HTTPS:**
   ```bash
   sudo ufw status
   sudo ufw allow 'Nginx Full'
   ```

4. **Renew certificate if expired:**
   ```bash
   sudo certbot renew
   ```

### 502 Bad Gateway

**Problem:** Getting 502 errors on API calls

**Solutions:**
1. **Check backend is running:**
   ```bash
   pm2 status
   # or
   sudo systemctl status nodejs
   ```

2. **Check backend logs:**
   ```bash
   pm2 logs
   # or check logs in your backend directory
   ```

3. **Restart backend:**
   ```bash
   pm2 restart all
   ```

### Can't Upload Files

**Problem:** Still getting 413 errors

**Solutions:**
1. **Verify nginx config has `client_max_body_size 100M;`**
2. **Check config is in the HTTPS server block**
3. **Reload nginx:** `sudo systemctl reload nginx`
4. **Check backend is running**

## Quick Reference

### Useful Commands

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Check nginx status
sudo systemctl status nginx

# View nginx error logs
sudo tail -f /var/log/nginx/error.log

# View nginx access logs
sudo tail -f /var/log/nginx/access.log

# Check SSL certificate
sudo certbot certificates

# Renew SSL certificate
sudo certbot renew --dry-run  # Test renewal
sudo certbot renew            # Actually renew

# Check what's listening on ports
sudo netstat -tlnp | grep -E '80|443'

# Restart backend
pm2 restart all

# Check DNS from command line
nslookup groupchatirl.blog
dig groupchatirl.blog
```

### Important Files

- **Nginx config:** `/etc/nginx/sites-available/group-chat-irl`
- **SSL certificates:** `/etc/letsencrypt/live/groupchatirl.blog/`
- **Nginx logs:** `/var/log/nginx/`
- **Backend code:** `/path/to/backend/`
- **Frontend build:** `/var/www/group-chat-irl/dist/`

## Next Steps

1. ✅ DNS configured at Hostinger
2. ✅ Nginx updated with domain name
3. ✅ SSL certificate installed
4. ✅ HTTPS working
5. ✅ Test all functionality

## Maintenance

### SSL Auto-Renewal

Certbot sets up automatic renewal via a systemd timer. To verify:

```bash
systemctl status certbot.timer
```

Certificates auto-renew **30 days before expiration**.

### Keep Your Site Updated

1. Update backend dependencies periodically
2. Build new frontend versions when you make changes
3. Monitor nginx logs for errors
4. Keep your server OS updated

## Need Help?

- **Hostinger Support:** https://www.hostinger.com/help
- **Certbot Documentation:** https://certbot.eff.org/docs/
- **Nginx Documentation:** https://nginx.org/en/docs/

Good luck with your podcast site! 🎙️✨

