# Database Seeding Scripts

## seedData.js

This script populates your MongoDB database with dummy data for testing and development.

### Usage

```bash
cd backend
npm run seed
```

### What it does

- **Clears existing data** from Episodes and Reviews collections
- **Creates 4 dummy episodes** with:
  - Episode titles and descriptions
  - Upload dates
  - Duration information (formatted as MM:SS)
  - Thumbnail and audio URLs (placeholder paths)
  
- **Creates 8 dummy reviews** with:
  - Reviewer names
  - Review text
  - Reviewer profile pictures (using Pravatar service)
  - Creation dates

### Customization

Edit `backend/scripts/seedData.js` to:
- Change the number of items created
- Modify the dummy data
- Remove the data clearing step (comment out `Episode.deleteMany()` and `Review.deleteMany()`)

### Note

The thumbnail and audio URLs are placeholder paths. In production, these should point to actual uploaded files in your `/uploads` directory.

