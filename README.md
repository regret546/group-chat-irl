# Group Chat IRL - Podcast Website

A full-stack podcast website with admin panel for managing episodes and reviews.

## Features

- \*Episode Management\*\* - Upload and manage podcast episodes with audio files
- **Reviews** - Display and manage listener reviews
- **Admin Panel** - Secure admin dashboard with JWT authentication
- **Responsive Design** - Mobile-friendly UI built with Tailwind CSS
- **Audio Player** - Custom waveform player with playback controls
- **Modern UI** - Beautiful, modern design with animations

## Tech Stack

**Frontend:**

- React 19
- Vite
- Tailwind CSS
- React Router
- WaveSurfer.js
- Framer Motion

**Backend:**

- Node.js
- Express
- MongoDB
- JWT Authentication
- Multer (file uploads)
- Bcrypt (password hashing)

## Quick Fix for Production Issues

If you're experiencing **413 Request Entity Too Large** errors or **upload issues** in production:

> **🚀 Start Here:** See [GETTING_STARTED.md](GETTING_STARTED.md) for the fastest solution!

Detailed guides:
1. **Quick Setup**: See [QUICK_SETUP.md](QUICK_SETUP.md) for step-by-step instructions
2. **Full Guide**: See [DEPLOYMENT_SETUP.md](DEPLOYMENT_SETUP.md) for complete deployment instructions
3. **Configuration Files**: Use `nginx-site-config.conf` as a template for your nginx setup

Quick fix: Update your nginx configuration to include:
```nginx
client_max_body_size 100M;
```