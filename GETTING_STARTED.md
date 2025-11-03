# Getting Started - Quick Reference

## Your Nginx Configuration Files

I've created a complete nginx configuration for your server. Here's what you need:

### Files Created

1. **`nginx-site-config.conf`** - Your complete nginx site configuration
2. **`QUICK_SETUP.md`** - Step-by-step setup instructions
3. **`DEPLOYMENT_SETUP.md`** - Full deployment guide with troubleshooting
4. **`FIXES_SUMMARY.md`** - Summary of all the fixes applied

## Quick Start

### Option 1: Use the Provided Configuration (Recommended)

```bash
# On your server (72.60.43.15)

# 1. Copy the config
sudo cp nginx-site-config.conf /etc/nginx/sites-available/group-chat-irl

# 2. Edit to set your frontend path
sudo nano /etc/nginx/sites-available/group-chat-irl

# 3. Enable the site
sudo ln -s /etc/nginx/sites-available/group-chat-irl /etc/nginx/sites-enabled/

# 4. Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

**That's it!** Your uploads should now work.

### Option 2: Manual Configuration

If you prefer to manually edit your existing configuration:

1. Edit your current nginx config:

   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

2. Add these critical lines at the top of the `server` block:

   ```nginx
   client_max_body_size 100M;
   client_body_timeout 120s;
   ```

3. Replace the `location /` block with:

   ```nginx
   location /api {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_request_buffering off;
       client_body_buffer_size 128k;
       proxy_buffering off;
   }

   location /uploads {
       proxy_pass http://localhost:5000;
   }

   location / {
       root /var/www/html;  # Update this to your frontend path
       try_files $uri $uri/ /index.html;
   }
   ```

4. Test and reload:
   ```bash
   sudo nginx -t && sudo systemctl reload nginx
   ```

## What Was Fixed

### Backend Changes

- ✅ Added request logging for debugging
- ✅ Enhanced error handling in upload routes
- ✅ Added detailed logging in controllers
- ✅ Better multer error messages

### Nginx Configuration

- ✅ Increased upload size limit to 100MB
- ✅ Added proxy settings for large uploads
- ✅ Configured proper API proxying
- ✅ Set up static file serving

## Testing Your Setup

1. **Check nginx is running:**

   ```bash
   sudo systemctl status nginx
   ```

2. **Check your backend is running:**

   ```bash
   pm2 status
   # or check port 5000
   netstat -tlnp | grep 5000
   ```

3. **Test API:**

   ```bash
   curl http://localhost:5000/api/episodes
   ```

4. **Test upload:**
   - Go to your admin panel
   - Try uploading a small audio file
   - Try uploading a reviewer image

## Common Issues

### 413 Error Still Appears

- Make sure you **reloaded** nginx, not just restarted
- Verify the `client_max_body_size` directive is inside the `server` block
- Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`

### 502 Bad Gateway

- Your Node.js backend isn't running on port 5000
- Check: `pm2 status` or `sudo systemctl status nodejs`
- Start it: `cd backend && pm2 start server.js`

### Files Not Displaying

- Check the `root` path in your nginx config
- Verify the frontend was built: `ls -la dist/`
- Check file permissions: `sudo chmod -R 755 /path/to/dist`

## Need Help?

See these files for more details:

- **QUICK_SETUP.md** - Detailed step-by-step instructions
- **DEPLOYMENT_SETUP.md** - Complete troubleshooting guide
- **FIXES_SUMMARY.md** - Technical details of what was fixed

## Next Steps

1. ✅ Configure nginx (choose Option 1 or 2 above)
2. ✅ Restart your backend: `pm2 restart all`
3. ✅ Test uploads in your admin panel
4. ✅ Set up SSL/HTTPS (optional, see nginx-site-config.conf comments)

Good luck! 🚀
