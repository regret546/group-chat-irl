# Admin Panel Setup Guide

## 🎉 Admin Frontend Ready!

Your admin panel has been successfully set up with full CRUD functionality for Episodes and Reviews.

## 📍 Access Points

- **Main Website**: `http://localhost:5173/`
- **Admin Login**: `http://localhost:5173/admin-login`
- **Admin Dashboard**: `http://localhost:5173/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c`

## 🔐 Authentication

### Demo Login Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Security Features
- Protected routes with authentication guard
- UUID-based admin URL for security through obscurity
- LocalStorage-based session management (replace with JWT for production)
- Automatic redirect to login if not authenticated
- Logout functionality to clear session

## 🎨 Features

### Episodes Management
- ✅ Add new episodes with:
  - Thumbnail image upload
  - Episode title
  - Upload date
  - Total duration time
  - Audio file (MP3) upload
- ✅ View all episodes in a list
- ✅ Edit existing episodes
- ✅ Delete episodes

### Reviews Management
- ✅ Add new reviews with:
  - Reviewer picture upload
  - Reviewer name/title
  - Review text content
- ✅ View all reviews in a card grid
- ✅ Edit existing reviews
- ✅ Delete reviews

## 🔌 Backend Integration

### API Endpoints You Need to Create

#### Authentication

```javascript
// Admin Login
POST /api/admin/login
Content-Type: application/json
Body: {
  username: String,
  password: String
}
Response: {
  token: String,
  message: String
}

// Verify Token (optional)
GET /api/admin/verify
Headers: {
  Authorization: Bearer <token>
}
Response: {
  valid: Boolean,
  user: Object
}
```

#### Episodes

```javascript
// GET all episodes
GET /api/episodes

// GET single episode
GET /api/episodes/:id

// CREATE new episode
POST /api/episodes
Content-Type: multipart/form-data
Body: {
  title: String,
  uploadDate: Date,
  totalTime: String,
  thumbnail: File,
  audio: File
}

// UPDATE episode
PUT /api/episodes/:id
Content-Type: multipart/form-data

// DELETE episode
DELETE /api/episodes/:id
```

#### Reviews

```javascript
// GET all reviews
GET /api/reviews

// GET single review
GET /api/reviews/:id

// CREATE new review
POST /api/reviews
Content-Type: multipart/form-data
Body: {
  title: String,
  review: String,
  picture: File
}

// UPDATE review
PUT /api/reviews/:id
Content-Type: multipart/form-data

// DELETE review
DELETE /api/reviews/:id
```

## 🔧 Files to Update

### 1. Login Page (`src/pages/Login.jsx`)

Update line 28 with your authentication endpoint:

```javascript
const response = await fetch('http://your-backend-url/api/admin/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
const data = await response.json();

if (data.token) {
  localStorage.setItem('adminToken', data.token);
  localStorage.setItem('isAdminAuthenticated', 'true');
  navigate('/a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c');
}
```

### 2. Episode Form (`src/pages/EpisodeForm.jsx`)

Update line 35 with your API endpoint:

```javascript
const response = await fetch('http://your-backend-url/api/episodes', {
  method: 'POST',
  body: episodeData
});
```

### 3. Review Form (`src/pages/ReviewForm.jsx`)

Update line 30 with your API endpoint:

```javascript
const response = await fetch('http://your-backend-url/api/reviews', {
  method: 'POST',
  body: reviewData
});
```

### 4. Episode List (`src/pages/EpisodeList.jsx`)

Update line 12 and 30:

```javascript
// Fetch episodes
useEffect(() => {
  fetch('http://your-backend-url/api/episodes')
    .then(res => res.json())
    .then(data => setEpisodes(data));
}, []);

// Delete episode
await fetch(`http://your-backend-url/api/episodes/${id}`, { 
  method: 'DELETE' 
});
```

### 5. Review List (`src/pages/ReviewList.jsx`)

Update line 12 and 30:

```javascript
// Fetch reviews
useEffect(() => {
  fetch('http://your-backend-url/api/reviews')
    .then(res => res.json())
    .then(data => setReviews(data));
}, []);

// Delete review
await fetch(`http://your-backend-url/api/reviews/${id}`, { 
  method: 'DELETE' 
});
```

## 🎯 Next Steps

1. **Create your MongoDB Schema**
   ```javascript
   // Episode Schema
   {
     title: String,
     uploadDate: Date,
     totalTime: String,
     thumbnailUrl: String,
     audioUrl: String
   }

   // Review Schema
   {
     title: String,
     review: String,
     pictureUrl: String
   }
   ```

2. **Set up file upload handling** (using Multer or similar)
   - Configure storage for thumbnails and audio files
   - Set up proper file paths/URLs

3. **Create Express routes** for all CRUD operations

4. **Add authentication** (optional but recommended)
   - Protect admin routes
   - Add login functionality

5. **Update the frontend** forms with your actual API endpoints

## 🔑 Customizing the Admin UUID

The admin panel uses a UUID-based URL for security. To change it:

1. Generate a new UUID (use an online UUID generator or terminal: `uuidgen`)
2. Find and replace `a7f3c8e2-4d1b-9f6e-8c2a-5b7d9e4f1a3c` in:
   - `src/App.jsx` (all routes)
   - `src/pages/Admin.jsx` (button links)
   - `src/pages/EpisodeForm.jsx` (navigation)
   - `src/pages/EpisodeList.jsx` (navigation)
   - `src/pages/ReviewForm.jsx` (navigation)
   - `src/pages/ReviewList.jsx` (navigation)
   - `src/pages/Login.jsx` (login redirect)

## 🚀 Running the Project

```bash
# Start the frontend
npm run dev

# Navigate to login page
# Open browser: http://localhost:5173/admin-login

# Login with demo credentials:
# Username: admin
# Password: admin123
```

## 📱 Responsive Design

All admin pages are fully responsive and work on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Styling

- Uses Tailwind CSS
- Consistent color scheme with main site
- Primary color: #FFD700 (yellow)
- Dark color: #1a1a1a

## 📝 Notes

- All forms include file upload previews
- Form validation is built-in (HTML5 required attributes)
- Delete operations include confirmation dialogs
- Success/error messages are shown via alerts (you can replace with toast notifications)

## 🔒 Production Security Recommendations

1. **Replace LocalStorage with JWT**
   - Store JWT tokens with expiration
   - Implement token refresh mechanism
   - Add httpOnly cookies for better security

2. **Add Middleware Authentication**
   - Verify JWT on every API request
   - Use `Authorization: Bearer <token>` header

3. **Environment Variables**
   - Store API URLs in `.env` file
   - Keep sensitive data out of codebase

4. **Change Default Credentials**
   - Never use `admin/admin123` in production
   - Implement strong password requirements
   - Add password hashing (bcrypt)

5. **Rate Limiting**
   - Limit login attempts
   - Add CAPTCHA for brute force protection

6. **HTTPS Only**
   - Always use HTTPS in production
   - Enable secure cookies

7. **Access Control**
   - Implement role-based permissions
   - Add audit logs for admin actions

---

Need help? Check the TODO comments in each file for specific integration points!

