# Deployment Setup Guide

This guide will help you fix the 413 Request Entity Too Large error and ensure file uploads work correctly in production.

> **📝 Quick Start:** If you have the default Debian/Ubuntu nginx configuration, see [QUICK_SETUP.md](QUICK_SETUP.md) for step-by-step instructions using the provided configuration file.

## Issues Fixed

1. **413 Request Entity Too Large Error** - Occurs when uploading large audio files
2. **Reviewer Images Not Working** - Images are uploaded but not displaying correctly

## Root Cause

When deploying to a server with an IP like `72.60.43.15`, you're likely using nginx (or another reverse proxy) in front of your Node.js Express server. The reverse proxy has a default `client_max_body_size` of 1MB, which is too small for audio uploads.

## Solution

### For Nginx (Most Common)

Update your nginx configuration file (usually located at `/etc/nginx/sites-available/default` or `/etc/nginx/nginx.conf`):

```nginx
server {
    listen 80;
    server_name 72.60.43.15;  # Your server IP or domain

    # CRITICAL: Increase client max body size for file uploads
    client_max_body_size 100M;

    # Increase timeouts for large file uploads
    client_body_timeout 120s;
    proxy_connect_timeout 120s;
    proxy_send_timeout 120s;
    proxy_read_timeout 120s;

    # Location for API requests
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
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

    # Location for uploaded files
    location /uploads {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;

        # Allow access to uploaded files
        add_header Access-Control-Allow-Origin *;
    }

    # Location for static files (Vite build)
    location / {
        root /var/www/group-chat-irl/dist;  # Update this path to your build directory
        try_files $uri $uri/ /index.html;
    }
}
```

### Steps to Apply the Fix

1. **Edit the nginx configuration:**

   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

   Or

   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```

2. **Add the configuration above** (replace your existing server block or add the critical settings)

3. **Test the configuration:**

   ```bash
   sudo nginx -t
   ```

4. **Reload nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

### For Apache (If Using Apache Instead)

Update your Apache configuration file:

```apache
<VirtualHost *:80>
    ServerName 72.60.43.15

    # Increase max upload size
    LimitRequestBody 104857600  # 100MB in bytes

    # Increase timeouts
    Timeout 120

    # Proxy settings
    ProxyPreserveHost On
    ProxyPass /api http://localhost:5000/api
    ProxyPassReverse /api http://localhost:5000/api
    ProxyPass /uploads http://localhost:5000/uploads
    ProxyPassReverse /uploads http://localhost:5000/uploads

    # Static files
    DocumentRoot /var/www/group-chat-irl/dist
    <Directory /var/www/group-chat-irl/dist>
        AllowOverride All
        Require all granted
        FallbackResource /index.html
    </Directory>
</VirtualHost>
```

Reload Apache:

```bash
sudo systemctl reload apache2
```

### For PM2 or Other Process Managers

Make sure your Node.js server is running:

```bash
# Start the backend server with PM2
cd /path/to/group-chat-irl/backend
pm2 start server.js --name "group-chat-backend"

# Save PM2 configuration
pm2 save
pm2 startup
```

### Verification Steps

1. **Check nginx status:**

   ```bash
   sudo systemctl status nginx
   ```

2. **Check Node.js server status:**

   ```bash
   pm2 status
   # or
   sudo systemctl status nodejs
   ```

3. **Test upload from your site:**

   - Go to the admin panel
   - Try uploading a small audio file (< 1MB) first
   - Then try a larger file
   - Upload a reviewer image

4. **Check server logs:**

   ```bash
   # Nginx error log
   sudo tail -f /var/log/nginx/error.log

   # Application logs
   pm2 logs group-chat-backend
   # or
   journalctl -u nodejs -f
   ```

## Additional Configuration

### Environment Variables

Make sure your `.env` file in the backend directory has all necessary variables:

```env
MONGO_URI=mongodb://localhost:27017/group-chat-irl
JWT_SECRET=your-secret-key-here
PORT=5000
```

### File Permissions

Ensure upload directories have proper permissions:

```bash
cd /path/to/group-chat-irl/backend
chmod -R 755 uploads/
chown -R www-data:www-data uploads/  # For nginx
```

### Build Frontend for Production

```bash
cd /path/to/group-chat-irl
npm run build
```

Copy the `dist` folder to your web server directory.

## Troubleshooting

### Still Getting 413 Error?

1. **Double-check nginx configuration was reloaded:**

   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

2. **Check if there are multiple nginx config files:**

   ```bash
   ls -la /etc/nginx/sites-enabled/
   ```

3. **Look for the actual client_max_body_size setting:**
   ```bash
   grep -r "client_max_body_size" /etc/nginx/
   ```

### Images Not Displaying?

1. **Check file was uploaded:**

   ```bash
   ls -lh backend/uploads/images/
   ```

2. **Check file permissions:**

   ```bash
   ls -la backend/uploads/images/
   ```

3. **Test direct access to image:**

   ```
   http://72.60.43.15/uploads/images/[filename]
   ```

4. **Check nginx is serving /uploads correctly** - verify the proxy_pass directive

### Other Common Issues

1. **Port 5000 not accessible:** Make sure your Node.js server is binding to `0.0.0.0` not `localhost`
2. **MongoDB connection issues:** Check MongoDB is running and accessible
3. **CORS errors:** The backend should have `cors()` enabled (already configured)

## Need Help?

Check these resources:

- Nginx documentation: https://nginx.org/en/docs/
- PM2 documentation: https://pm2.keymetrics.io/docs/usage/quick-start/
- Vite deployment guide: https://vitejs.dev/guide/static-deploy.html
