#!/bin/bash

# Deployment script for Group Chat IRL
# This script is run on the server by GitHub Actions

set -e  # Exit on any error

echo "🚀 Starting deployment..."

# Navigate to project directory
cd /var/www/group-chat-irl

# Pull latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install/update frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build frontend
echo "🏗️  Building frontend..."
npm run build

# Install/update backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Restart backend with PM2
echo "🔄 Restarting backend..."
if pm2 list | grep -q "group-chat-backend"; then
  pm2 restart group-chat-backend
else
  pm2 start server.js --name group-chat-backend
fi

# Reload nginx
echo "🔄 Reloading nginx..."
sudo systemctl reload nginx

echo "✅ Deployment completed successfully!"

