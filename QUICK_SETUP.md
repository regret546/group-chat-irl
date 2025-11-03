# Quick Setup Guide for Nginx

## Step-by-Step Instructions

Based on your current nginx configuration, follow these steps:

### 1. Disable the Default Site

Since you're using this as your main configuration, you might want to disable the default site:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

**OR** keep it and just make sure your new config loads after it.

### 2. Create Your Site Configuration

Copy the configuration file to nginx:

```bash
sudo cp nginx-site-config.conf /etc/nginx/sites-available/group-chat-irl
```

### 3. Enable Your Site

Create a symlink to enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/group-chat-irl /etc/nginx/sites-enabled/
```

### 4. Update the File Path

**IMPORTANT:** Edit the configuration to set the correct path for your frontend:

```bash
sudo nano /etc/nginx/sites-available/group-chat-irl
```

Change this line:

```nginx
root /var/www/group-chat-irl/dist;
```

To the actual path where you built/deployed your frontend. For example:

- `/var/www/html/` (if you built in the default location)
- `/home/yourusername/group-chat-irl/dist`
- `/var/www/group-chat-irl/dist`

### 5. Test Your Configuration

Before reloading, test that your configuration is valid:

```bash
sudo nginx -t
```

You should see:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If there are errors, fix them before proceeding.

### 6. Reload Nginx

If the test is successful, reload nginx:

```bash
sudo systemctl reload nginx
```

### 7. Verify It's Working

Check that nginx is running:

```bash
sudo systemctl status nginx
```

### 8. Test Uploads

Now try uploading an episode with an audio file. The 413 error should be gone!

---

## Quick Troubleshooting

### If uploads still fail:

1. **Check nginx error logs:**

   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Check that your Node.js backend is running:**

   ```bash
   pm2 status
   # or
   sudo systemctl status nodejs
   ```

3. **Verify the proxy is working:**

   ```bash
   curl http://localhost:5000/api/episodes
   ```

4. **Check file permissions:**
   ```bash
   ls -la /var/www/group-chat-irl/dist/
   # Uploads directory
   ls -la /path/to/backend/uploads/
   ```

### If you see "502 Bad Gateway":

This means nginx can't reach your Node.js backend:

1. Make sure your backend is running on port 5000
2. Check firewall settings
3. Verify `proxy_pass http://localhost:5000;` is correct

### If files aren't being served:

1. Check the `root` directive points to the correct directory
2. Verify you ran `npm run build` for the frontend
3. Check file permissions: `sudo chmod -R 755 /path/to/dist`

---

## After Setup

Your site should now handle:

- ✅ Large file uploads (up to 100MB)
- ✅ API requests properly proxied
- ✅ Static file serving
- ✅ Uploaded files accessible

## Need to Revert?

If something goes wrong and you need to go back to the default:

```bash
# Remove your site
sudo rm /etc/nginx/sites-enabled/group-chat-irl

# Restore default
sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default

# Reload
sudo nginx -t && sudo systemctl reload nginx
```
