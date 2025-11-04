# Automated Deployment Setup Guide

This guide will help you set up automated deployment from GitHub to your Hostinger VPS server.

## Quick Start

### 1. Generate SSH Key (on your local machine)

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_deploy
```

### 2. Add Public Key to Server

```bash
# Copy the public key
cat ~/.ssh/github_actions_deploy.pub

# On your server, add it:
ssh root@YOUR_SERVER_IP
mkdir -p ~/.ssh
echo "PASTE_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

### 3. Configure GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions**

Add these secrets:

- **SSH_PRIVATE_KEY**: `cat ~/.ssh/github_actions_deploy` (copy entire private key)
- **SERVER_HOST**: Your server IP or domain (e.g., `72.60.43.15`)
- **SERVER_USER**: Your SSH user (usually `root`)

### 4. Test Deployment

```bash
# Make a small change
echo "# Test" >> README.md

# Commit and push
git add .
git commit -m "Test automated deployment"
git push origin main
```

Then check the **Actions** tab in GitHub to see the deployment running!

## How It Works

1. You push code to GitHub
2. GitHub Actions workflow is triggered
3. Workflow connects to your server via SSH
4. Server pulls latest changes from GitHub
5. Frontend dependencies installed and built
6. Backend dependencies installed
7. Backend restarted with PM2
8. Nginx reloaded

## Troubleshooting

### Deployment fails with "Permission denied"

The deployment script needs sudo access for nginx reload. Add this to your server:

```bash
sudo visudo
# Add this line:
YOUR_USER ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx
```

### PM2 not found

Make sure PM2 is installed:

```bash
npm install -g pm2
pm2 startup
```

### Git pull fails

Make sure your server has the repository cloned:

```bash
cd /var/www/group-chat-irl
git remote -v  # Should show your GitHub repo
```

## Security Notes

- The SSH private key is stored as a GitHub secret (encrypted)
- Only you (and authorized users) can trigger deployments
- Consider using a dedicated deployment user instead of root
- The deployment script runs on your server, so keep it secure

## Alternative: Manual Deployment Script

If you prefer to deploy manually, you can use the deployment script directly:

```bash
# On your server
chmod +x /var/www/group-chat-irl/scripts/deploy.sh
/var/www/group-chat-irl/scripts/deploy.sh
```

Or via SSH:

```bash
ssh root@YOUR_SERVER_IP "cd /var/www/group-chat-irl && ./scripts/deploy.sh"
```
