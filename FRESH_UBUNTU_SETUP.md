# Fresh Ubuntu Server Setup for groupchatirl.blog

Complete step-by-step guide for setting up your podcast website on a fresh Ubuntu server.

## 🎯 Overview

This guide will walk you through:

1. ✅ Setting up Ubuntu server
2. ✅ Installing Node.js, npm, and MongoDB
3. ✅ Setting up your project
4. ✅ Installing and configuring nginx
5. ✅ Setting up your domain with SSL
6. ✅ Deploying your application

---

## 📋 Prerequisites

- Fresh Ubuntu Server (20.04 or 22.04 recommended)
- Root or sudo access
- Domain name: `groupchatirl.blog`
- SSH access to your server

---

## Part 1: Initial Server Setup

### Step 1: Update System

```bash
# Update package list
sudo apt update
sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl wget git build-essential
```

### Step 2: Create Non-Root User (Optional but Recommended)

```bash
# Create a new user
sudo adduser groupchat

# Add to sudo group
sudo usermod -aG sudo groupchat

# Switch to new user
su - groupchat
```

---

## Part 2: Install Node.js and npm

### Step 1: Install Node.js 18 (LTS)

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x
```

### Step 2: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2

# Verify installation
pm2 --version
```

---

## Part 3: MongoDB Setup

### Step 1: Use MongoDB Atlas (Cloud Database)

**You're using MongoDB Atlas**, which is great! No local installation needed.

✅ **Your connection string:** `mongodb+srv://db_admin:test@cluster0.nt2iaqp.mongodb.net/`

**Benefits:**

- ✅ No local database installation
- ✅ Managed by MongoDB (backups, scaling)
- ✅ Free tier available
- ✅ Secure and reliable

### Step 2: Configure MongoDB Atlas Network Access

⚠️ **IMPORTANT:** You need to allow your server IP in MongoDB Atlas!

1. Go to **MongoDB Atlas Dashboard**: https://cloud.mongodb.com/
2. Click **Network Access** (left sidebar)
3. Click **Add IP Address**
4. Click **Allow Access from Anywhere** (for testing)
   - Or add your server IP: `72.60.43.15`
5. Click **Confirm**
6. Wait 1-2 minutes for the change to take effect

**No additional steps needed** - we'll configure the connection in the backend setup!

---

## Part 4: Install and Configure nginx

### Step 1: Install nginx

```bash
sudo apt install -y nginx

# Start nginx and enable on boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx
```

### Step 2: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

---

## Part 5: Deploy Your Application

### Step 1: Create Directory Structure

```bash
# Create project directory
sudo mkdir -p /var/www/group-chat-irl
sudo chown -R $USER:$USER /var/www/group-chat-irl

# Create backend directory
sudo mkdir -p /var/www/group-chat-irl/backend
sudo chown -R $USER:$USER /var/www/group-chat-irl

# Create uploads directory
mkdir -p /var/www/group-chat-irl/backend/uploads/{audio,images}
```

### Step 2: Clone or Upload Your Project

**Option A: If using Git**

```bash
cd /var/www/group-chat-irl
git clone https://github.com/yourusername/group-chat-irl.git .

# Move backend files
mv backend/* /var/www/group-chat-irl/backend/
```

**Option B: Upload files manually**

Use SCP, SFTP, or any file transfer method to upload your project files.

### Step 3: Set Up Backend

```bash
cd /var/www/group-chat-irl/backend

# Install dependencies
npm install

# Create .env file
nano .env
```

**Add to .env:**

```env
MONGO_URI=mongodb+srv://db_admin:test@cluster0.nt2iaqp.mongodb.net/group-chat-irl
JWT_SECRET=your-super-secret-jwt-key-change-this-to-something-random
PORT=5000
```

**Note:** Make sure your MongoDB Atlas database name matches! You can use `group-chat-irl` or create a different database name. Update the connection string accordingly:

- `mongodb+srv://db_admin:test@cluster0.nt2iaqp.mongodb.net/your-database-name`

**Generate a secure JWT secret:**

```bash
# Generate a random JWT secret
openssl rand -base64 32
```

Copy this to your `.env` file as the `JWT_SECRET`.

**Save and exit** (Ctrl+X, then Y, then Enter)

### Step 4: Test Backend

```bash
cd /var/www/group-chat-irl/backend

# Test if it runs
node server.js
```

**If successful**, you'll see "MongoDB connected" and "Server running on port 5000".

Press **Ctrl+C** to stop.

### Step 5: Run Backend with PM2

```bash
# Start with PM2
pm2 start server.js --name group-chat-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

# Follow the instructions it gives you (usually just copy/paste the command)
```

### Step 6: Build and Deploy Frontend

```bash
# Navigate to frontend directory (on your local machine)
cd /path/to/group-chat-irl

# Build for production
npm run build

# Upload dist folder to server
# Using SCP:
scp -r dist/ groupchat@72.60.43.15:/var/www/group-chat-irl/

# Or use SFTP/FTP to upload the dist folder
```

**On your server**, verify the files are there:

```bash
ls -la /var/www/group-chat-irl/dist/
```

---

## Part 6: Configure nginx for Your Domain

### Step 1: Create nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/group-chat-irl
```

**Copy this configuration:**

```nginx
# Nginx configuration for groupchatirl.blog
server {
    listen 80;
    listen [::]:80;
    server_name groupchatirl.blog www.groupchatirl.blog;

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

**Save and exit** (Ctrl+X, then Y, then Enter)

### Step 2: Enable Site

```bash
# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Enable your site
sudo ln -s /etc/nginx/sites-available/group-chat-irl /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t
```

You should see:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Step 3: Reload nginx

```bash
sudo systemctl reload nginx
```

---

## Part 7: Configure DNS at Hostinger

### Step 1: Add DNS Records

1. Log into **Hostinger** account
2. Go to **Domains** → **groupchatirl.blog**
3. Click **DNS / Nameservers**
4. Add these **A Records**:

**Record 1:**

- Type: **A**
- Host: **@** (or leave blank)
- Points to: **72.60.43.15** (your server IP)
- TTL: **3600**

**Record 2:**

- Type: **A**
- Host: **www**
- Points to: **72.60.43.15**
- TTL: **3600**

5. **Save** and wait 5-10 minutes for DNS propagation

### Step 2: Test DNS

```bash
# On your local machine or server
nslookup groupchatirl.blog

# Should show: 72.60.43.15
```

---

## Part 8: Install SSL Certificate (HTTPS)

### Step 1: Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Step 2: Get SSL Certificate

```bash
sudo certbot --nginx -d groupchatirl.blog -d www.groupchatirl.blog
```

**Follow the prompts:**

1. **Enter email:** Your email address (for renewal notices)
2. **Agree to terms:** Type `Y` and press Enter
3. **Share email:** Type `N` (unless you want to)
4. **Redirect HTTP to HTTPS:** Type `2` (Redirect - recommended)

**Done!** Certbot automatically modifies your nginx config.

### Step 3: Verify SSL

```bash
# Check certificate
sudo certbot certificates

# Test auto-renewal
sudo certbot renew --dry-run
```

---

## Part 9: Test Everything

### Step 1: Test DNS

```bash
nslookup groupchatirl.blog
# Should return: 72.60.43.15
```

### Step 2: Test HTTPS

```bash
curl -I https://groupchatirl.blog
# Should return: 200 OK
```

### Step 3: Test in Browser

1. Visit: **https://groupchatirl.blog**
2. Look for **padlock icon** 🔒 in address bar
3. Test all pages work
4. Test episode upload

### Step 4: Check Backend

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs group-chat-backend

# Check MongoDB
sudo systemctl status mongod

# Check nginx
sudo systemctl status nginx
```

---

## Part 10: Set Up Admin User (First Time)

### Option 1: Use Seed Script

If you have a seed script:

```bash
cd /var/www/group-chat-irl/backend
npm run seed  # or whatever your seed command is
```

### Option 2: Create Manually

```bash
# Connect to MongoDB
mongosh group-chat-irl

# Create admin user
db.users.insertOne({
  email: "admin@groupchatirl.blog",
  password: "$2b$10$XXXXXXXXXXXXXX",  # Use bcrypt hash
  role: "admin"
});

# Exit
exit
```

**Generate password hash:**

```bash
# Install bcrypt-cli
npm install -g bcrypt-cli

# Hash a password
bcrypt "YourSecurePassword123!"
```

Copy the hash and use it in MongoDB.

---

## Maintenance Commands

```bash
# Check all services
pm2 status
sudo systemctl status nginx

# View logs
pm2 logs group-chat-backend
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart all
sudo systemctl restart nginx

# Update nginx config
sudo nano /etc/nginx/sites-available/group-chat-irl
sudo nginx -t
sudo systemctl reload nginx

# Update application
cd /var/www/group-chat-irl
git pull  # if using Git
pm2 restart all
```

---

## Troubleshooting

### Can't Connect via SSH

```bash
# Check if SSH is allowed in firewall
sudo ufw status
sudo ufw allow OpenSSH
```

### 502 Bad Gateway

```bash
# Check if backend is running
pm2 status

# Start backend
pm2 start server.js --name group-chat-backend

# Check logs
pm2 logs
```

### Can't Upload Files (413 Error)

```bash
# Verify nginx config has client_max_body_size
sudo grep "client_max_body_size" /etc/nginx/sites-available/group-chat-irl

# Should show: client_max_body_size 100M;
```

### SSL Certificate Issues

```bash
# Check certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew --dry-run  # Test
sudo certbot renew             # Actual renewal
```

### MongoDB Connection Issues

```bash
# If you see "MongoError: Authentication failed"
# 1. Check your MongoDB Atlas connection string in .env
# 2. Verify database name is correct
# 3. Check MongoDB Atlas Network Access allows your server IP
# 4. Verify username and password are correct

# View backend logs for specific MongoDB errors
pm2 logs group-chat-backend

# Test connection manually
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected!')).catch(e => console.error(e))"
```

### Frontend Not Loading

```bash
# Check files exist
ls -la /var/www/group-chat-irl/dist/

# Check permissions
sudo chown -R www-data:www-data /var/www/group-chat-irl
sudo chmod -R 755 /var/www/group-chat-irl
```

---

## Quick Reference

### File Locations

```
Backend:     /var/www/group-chat-irl/backend/
Frontend:    /var/www/group-chat-irl/dist/
Nginx Config: /etc/nginx/sites-available/group-chat-irl
Env File:    /var/www/group-chat-irl/backend/.env
PM2 Config:  ~/.pm2/
MongoDB:     MongoDB Atlas (cloud - no local files)
```

### Important Ports

```
22   - SSH
80   - HTTP (redirects to HTTPS)
443  - HTTPS
5000 - Node.js Backend
```

### MongoDB Atlas

```
Connection: mongodb+srv://db_admin:test@cluster0.nt2iaqp.mongodb.net/
Dashboard:  https://cloud.mongodb.com/
```

### Useful Commands

```bash
# Server info
uname -a
free -h
df -h

# Check what's listening
sudo netstat -tlnp

# Check disk space
df -h

# Check memory
free -h

# View running processes
ps aux | grep node
```

---

## Next Steps

✅ Server setup complete!
✅ Application deployed!
✅ Domain configured!
✅ SSL installed!

Now you can:

- **Add content** to your podcast site
- **Monitor logs** for errors
- **Set up backups** (important!)
- **Configure CDN** (optional)
- **Set up monitoring** (optional)

---

## Security Checklist

- [ ] ✅ Firewall configured (UFW)
- [ ] ✅ SSH key-based authentication set up
- [ ] ✅ Non-root user created
- [ ] ✅ SSL certificate installed
- [ ] ✅ nginx configured with security headers
- [ ] ✅ JWT secret is strong and unique
- [ ] ✅ MongoDB Atlas Network Access configured (allow your server IP)
- [ ] ✅ PM2 auto-restart configured
- [ ] ✅ SSL auto-renewal configured

---

## Part 11: Set Up Automated Deployment (GitHub Actions)

Automate deployments so that when you push to GitHub, your server automatically updates!

### Step 1: Generate SSH Key Pair on Your Local Machine

```bash
# On your local machine (not the server)
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_deploy

# This creates two files:
# ~/.ssh/github_actions_deploy (private key - keep secret!)
# ~/.ssh/github_actions_deploy.pub (public key - add to server)
```

### Step 2: Add Public Key to Your Server

```bash
# Copy the public key content
cat ~/.ssh/github_actions_deploy.pub

# On your server, add it to authorized_keys
ssh root@YOUR_SERVER_IP

# Then on the server:
mkdir -p ~/.ssh
echo "PASTE_YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add these secrets:

**Secret 1: SSH_PRIVATE_KEY**

- Name: `SSH_PRIVATE_KEY`
- Value: Copy the entire content of `~/.ssh/github_actions_deploy` (the private key)
  ```bash
  # On your local machine:
  cat ~/.ssh/github_actions_deploy
  ```
  Copy everything including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----`

**Secret 2: SERVER_HOST**

- Name: `SERVER_HOST`
- Value: Your server IP (e.g., `72.60.43.15`) or domain name

**Secret 3: SERVER_USER**

- Name: `SERVER_USER`
- Value: Your SSH username (usually `root`)

### Step 4: Test the Deployment

1. Make a small change to your code (e.g., update README.md)
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test automated deployment"
   git push origin main
   ```
3. Go to your GitHub repository → **Actions** tab
4. You should see the deployment workflow running
5. Once complete, check your server to verify changes are deployed

### Step 5: Verify Deployment

```bash
# SSH into your server
ssh root@YOUR_SERVER_IP

# Check if the latest changes are there
cd /var/www/group-chat-irl
git log -1

# Check PM2 status
pm2 status

# View deployment logs
pm2 logs group-chat-backend
```

### Troubleshooting

**If deployment fails:**

1. **Check GitHub Actions logs** in the Actions tab
2. **Verify SSH key** is correctly added to server
3. **Check PM2** is installed and running:
   ```bash
   pm2 list
   ```
4. **Verify sudo access** - the script needs sudo for nginx reload
   ```bash
   # Test sudo access
   sudo -n systemctl reload nginx
   ```

**To allow passwordless sudo for nginx reload:**

```bash
# On your server
sudo visudo

# Add this line (replace USERNAME with your SSH user, usually root):
USERNAME ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx
```

**Or use a safer approach - create a deployment user:**

```bash
# Create a deployment user
sudo adduser deployer
sudo usermod -aG sudo deployer

# Add SSH key for deployer user
sudo su - deployer
mkdir -p ~/.ssh
echo "YOUR_PUBLIC_KEY" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh

# Give deployer permission to reload nginx
sudo visudo
# Add: deployer ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx
```

Then update your GitHub secret `SERVER_USER` to `deployer`.

---

**Your podcast site is now live with automated deployment! 🎉**

Visit: **https://groupchatirl.blog**

For issues or questions, refer to the troubleshooting section or check:

- `pm2 logs` for backend errors
- `/var/log/nginx/error.log` for nginx errors
- MongoDB logs for database issues
- GitHub Actions logs for deployment issues

Good luck with your podcast! 🎙️✨
