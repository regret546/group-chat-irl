require('dotenv').config();
const mongoose = require('mongoose');
const Episode = require('../models/Episode');
const Review = require('../models/Review');

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected for seeding');
    seedDatabase();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const seedDatabase = async () => {
  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    await Episode.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Create dummy episodes
    const dummyEpisodes = [
      {
        title: 'Episode 8: Atty. Jelou Ann Feb Tabanao-Salon',
        thumbnailUrl: '/uploads/images/thumbnail1.jpg',
        audioUrl: '/uploads/audio/episode8.mp3',
        uploadDate: new Date('2024-11-15'),
        durationSeconds: 2278,
        durationHuman: '37:58',
        description: 'A conversation about law and justice with Atty. Jelou Ann Feb Tabanao-Salon',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        title: 'Episode 7: Flood Control Issue As A Tax Payers',
        thumbnailUrl: '/uploads/images/thumbnail2.jpg',
        audioUrl: '/uploads/audio/episode7.mp3',
        uploadDate: new Date('2024-09-20'),
        durationSeconds: 2583,
        durationHuman: '43:03',
        description: 'Discussing flood control and taxpayer concerns',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        title: 'Episode 6: Mental Health Awareness',
        thumbnailUrl: '/uploads/images/thumbnail3.jpg',
        audioUrl: '/uploads/audio/episode6.mp3',
        uploadDate: new Date('2024-08-10'),
        durationSeconds: 1800,
        durationHuman: '30:00',
        description: 'Important conversation about mental health awareness',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      },
      {
        title: 'Episode 5: Business and Entrepreneurship',
        thumbnailUrl: '/uploads/images/thumbnail4.jpg',
        audioUrl: '/uploads/audio/episode5.mp3',
        uploadDate: new Date('2024-07-05'),
        durationSeconds: 2100,
        durationHuman: '35:00',
        description: 'Tips and insights from successful entrepreneurs',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }
    ];

    const createdEpisodes = await Episode.insertMany(dummyEpisodes);
    console.log(`✓ Created ${createdEpisodes.length} episodes`);

    // Create dummy reviews
    const dummyReviews = [
      {
        reviewerName: 'John Smith',
        reviewText: 'Absolutely fantastic podcast! The discussions are engaging and thought-provoking. Keep up the great work!',
        reviewerPicUrl: 'https://i.pravatar.cc/150?img=1',
        createdAt: new Date('2024-11-20')
      },
      {
        reviewerName: 'Maria Garcia',
        reviewText: 'SO SO SO HAPPY WE FOUND YOU GUYS!!!! You saved me 100 hours last quarter. This podcast changed my perspective on everything.',
        reviewerPicUrl: 'https://i.pravatar.cc/150?img=2',
        createdAt: new Date('2024-11-18')
      },
      {
        reviewerName: 'David Chen',
        reviewText: 'If I could give 11 stars, I would give 12. Best podcast I\'ve listened to this year!',
        reviewerPicUrl: 'https://i.pravatar.cc/150?img=3',
        createdAt: new Date('2024-11-15')
      },
      {
        reviewerName: 'Sarah Johnson',
        reviewText: 'Took some convincing, but now that I\'m hooked on this podcast, I\'m never going back. Amazing content every episode!',
        reviewerPicUrl: 'https://i.pravatar.cc/150?img=4',
        createdAt: new Date('2024-11-12')
      },
      {
        reviewerName: 'Michael Brown',
        reviewText: 'It\'s just the best. Period. No other podcast comes close to this quality and depth of discussion.',
        reviewerPicUrl: 'https://i.pravatar.cc/150?img=5',
        createdAt: new Date('2024-11-10')
      },
      {
        reviewerName: 'Emily Davis',
        reviewText: 'I switched to this podcast 5 years ago and never looked back. Every episode is a gem!',
        reviewerPicUrl: 'https://i.pravatar.cc/150?img=6',
        createdAt: new Date('2024-11-08')
      },
      {
        reviewerName: 'Robert Martinez',
        reviewText: 'Incredible insights and conversations. You guys tackle topics that matter with such grace and expertise.',
        reviewerPicUrl: 'https://i.pravatar.cc/150?img=7',
        createdAt: new Date('2024-11-05')
      },
      {
        reviewerName: 'Lisa Anderson',
        reviewText: 'My go-to podcast for learning and entertainment. Always looking forward to the next episode!',
        reviewerPicUrl: 'https://i.pravatar.cc/150?img=8',
        createdAt: new Date('2024-11-03')
      }
    ];

    const createdReviews = await Review.insertMany(dummyReviews);
    console.log(`✓ Created ${createdReviews.length} reviews`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nCreated:');
    console.log(`  - ${createdEpisodes.length} Episodes`);
    console.log(`  - ${createdReviews.length} Reviews`);
    console.log('\nYou can now view this data in your admin panel!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

