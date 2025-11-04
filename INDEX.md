# Documentation Index

Welcome! This document helps you find the right guide for your needs.

## 🎯 Quick Navigation

### Fresh Ubuntu Server Setup

**Starting from scratch?**

1. **[FRESH_UBUNTU_SETUP.md](FRESH_UBUNTU_SETUP.md)** 🎯
   - Complete server setup from scratch
   - Node.js, MongoDB, nginx installation
   - Domain and SSL configuration
   - Step-by-step with all commands
   - Perfect for fresh Ubuntu installs

---

### Setting Up Your Domain (groupchatirl.blog)

**New to domain setup? Start here:**

1. **[DOMAIN_QUICK_START.md](DOMAIN_QUICK_START.md)** ⚡
   - Get your domain working in 15 minutes
   - Step-by-step with screenshots references
   - Perfect for first-time setup

2. **[DOMAIN_SETUP.md](DOMAIN_SETUP.md)** 📖
   - Complete domain setup guide
   - DNS configuration
   - SSL/HTTPS setup
   - Troubleshooting

**Configuration File:**
- [nginx-domain-config.conf](nginx-domain-config.conf) - Complete nginx config with SSL

---

### Fixing Upload Issues (413 Errors)

**Having upload problems? Start here:**

1. **[GETTING_STARTED.md](GETTING_STARTED.md)** 🚀
   - Quick reference for both issues
   - Two solution options
   - Fastest path to resolution

2. **[QUICK_SETUP.md](QUICK_SETUP.md)** 📝
   - Step-by-step nginx configuration
   - Uses provided config file
   - Perfect for Debian/Ubuntu

3. **[DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md)** 🔧
   - Full deployment guide
   - nginx and Apache configurations
   - Comprehensive troubleshooting

**Configuration File:**
- [nginx-site-config.conf](nginx-site-config.conf) - Basic nginx config template

---

### Understanding What Was Fixed

**Want to know what changes were made?**

- All backend improvements
- Error handling enhancements
- Logging additions
- Technical details

---

## 📚 All Documentation Files

### Quick Start Guides
- ✅ **[DOMAIN_QUICK_START.md](DOMAIN_QUICK_START.md)** - Domain setup in 15 min
- ✅ **[GETTING_STARTED.md](GETTING_STARTED.md)** - Upload issues quick fix
- ✅ **[QUICK_SETUP.md](QUICK_SETUP.md)** - nginx configuration

### Comprehensive Guides
- ✅ **[FRESH_UBUNTU_SETUP.md](FRESH_UBUNTU_SETUP.md)** - Complete server setup from scratch
- ✅ **[DOMAIN_SETUP.md](DOMAIN_SETUP.md)** - Complete domain configuration
- ✅ **[DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md)** - Full deployment guide
- ✅ **[README.md](README.md)** - Main project documentation

### Configuration Files
- ✅ **[nginx-domain-config.conf](nginx-domain-config.conf)** - Domain + SSL config
- ✅ **[nginx-site-config.conf](nginx-site-config.conf)** - Basic nginx config

---

## 🎯 Common Scenarios

### "I'm setting up a fresh Ubuntu server"

👉 Start here: **[FRESH_UBUNTU_SETUP.md](FRESH_UBUNTU_SETUP.md)**

Complete guide from zero to running site with all dependencies installed.

---

### "I just bought a domain and want to set it up"

👉 Start here: **[DOMAIN_QUICK_START.md](DOMAIN_QUICK_START.md)**

Then read: **[DOMAIN_SETUP.md](DOMAIN_SETUP.md)** for details

---

### "I'm getting 413 errors when uploading files"

👉 Start here: **[GETTING_STARTED.md](GETTING_STARTED.md)**

Then read: **[QUICK_SETUP.md](QUICK_SETUP.md)** for step-by-step

---

### "I need to understand the full deployment process"

👉 Read: **[DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md)**

Includes: nginx, Apache, PM2, MongoDB, troubleshooting

---

### "My uploads aren't working and I need to fix it fast"

👉 Read: **[GETTING_STARTED.md](GETTING_STARTED.md)** (5 minutes)

Quick commands to run on your server

---

### "I'm setting up everything from scratch"

👉 Follow: **[FRESH_UBUNTU_SETUP.md](FRESH_UBUNTU_SETUP.md)**

**OR** follow in order:
1. **[GETTING_STARTED.md](GETTING_STARTED.md)** - Fix basic issues
2. **[QUICK_SETUP.md](QUICK_SETUP.md)** - Configure nginx
3. **[DOMAIN_QUICK_START.md](DOMAIN_QUICK_START.md)** - Setup domain
4. **[DOMAIN_SETUP.md](DOMAIN_SETUP.md)** - Add SSL/HTTPS

---

## 🔍 What Each Guide Covers

### FRESH_UBUNTU_SETUP.md
- ✅ Complete fresh Ubuntu server setup
- ✅ Installing Node.js, npm, PM2
- ✅ Installing MongoDB
- ✅ Installing and configuring nginx
- ✅ Setting up firewall
- ✅ Deploying your application
- ✅ DNS and SSL configuration
- ✅ Creating admin users
- ✅ Troubleshooting guide

### DOMAIN_QUICK_START.md
- ✅ DNS configuration at Hostinger
- ✅ nginx update for domain
- ✅ SSL certificate installation
- ✅ Quick testing commands
- ✅ Common issues & fixes

### DOMAIN_SETUP.md
- ✅ Complete DNS setup
- ✅ nginx configuration (HTTP + HTTPS)
- ✅ Certbot installation
- ✅ SSL auto-renewal
- ✅ Advanced troubleshooting
- ✅ Maintenance tips

### GETTING_STARTED.md
- ✅ Backend improvements summary
- ✅ nginx configuration options
- ✅ Testing checklist
- ✅ Troubleshooting guide

### QUICK_SETUP.md
- ✅ Step-by-step nginx setup
- ✅ Using provided config files
- ✅ Verification steps
- ✅ Revert instructions

### DEPLOYMENT_SETUP.md
- ✅ Complete deployment process
- ✅ nginx AND Apache configs
- ✅ PM2 process management
- ✅ MongoDB setup
- ✅ File permissions
- ✅ Comprehensive troubleshooting

### README.md
- ✅ Project overview
- ✅ Tech stack
- ✅ Features list
- ✅ Links to all guides

---

## ⚙️ Configuration Files Explained

### nginx-domain-config.conf
**Use when:** You have a domain and want HTTPS

**Contains:**
- HTTP to HTTPS redirect
- SSL configuration
- SSL certificate paths
- All location blocks for API/uploads/static
- Upload size limits (100MB)
- Security headers

**Complete and ready to use!**

---

### nginx-site-config.conf
**Use when:** You're setting up on an IP address first

**Contains:**
- HTTP-only configuration
- All location blocks
- Upload size limits (100MB)
- Security headers
- Optional SSL block (commented out)

**Ready to use, with SSL as optional upgrade!**

---

## 🆘 Need Help?

### Find Your Issue

**Domain Issues:**
- Can't reach site via domain
- SSL certificate errors
- DNS not resolving
→ See: [DOMAIN_SETUP.md](DOMAIN_SETUP.md) Troubleshooting section

**Upload Issues:**
- 413 Request Entity Too Large
- Files not uploading
- Images not displaying
→ See: [GETTING_STARTED.md](GETTING_STARTED.md) Troubleshooting

**Server Issues:**
- 502 Bad Gateway
- Backend not running
- nginx errors
→ See: [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md) Troubleshooting

---

## 📞 Quick Reference

### Essential Commands

```bash
# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Check SSL certificate
sudo certbot certificates

# Check backend status
pm2 status

# View logs
pm2 logs
sudo tail -f /var/log/nginx/error.log
```

### Important File Paths

```
Configuration:
/etc/nginx/sites-available/group-chat-irl
/etc/letsencrypt/live/groupchatirl.blog/

Logs:
/var/log/nginx/error.log
/var/log/nginx/access.log

SSL:
/etc/letsencrypt/live/groupchatirl.blog/fullchain.pem
/etc/letsencrypt/live/groupchatirl.blog/privkey.pem
```

---

## ✅ Setup Checklist

### Basic Setup
- [ ] Backend running on port 5000
- [ ] nginx installed and running
- [ ] nginx configured with upload limits
- [ ] Frontend built and deployed
- [ ] MongoDB connected

### Domain Setup
- [ ] DNS configured at Hostinger
- [ ] nginx updated with domain name
- [ ] SSL certificate installed
- [ ] HTTPS working
- [ ] www subdomain working

### Testing
- [ ] Site loads via domain
- [ ] HTTPS shows padlock
- [ ] All pages accessible
- [ ] API calls working
- [ ] Uploads working (no 413 errors)
- [ ] Images displaying correctly

---

**Happy deploying!** 🚀

For questions or issues, refer to the specific guide for your scenario above.

