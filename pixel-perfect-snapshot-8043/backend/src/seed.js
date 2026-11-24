import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Candidate from './models/Candidate.js';
import Announcement from './models/Announcement.js';
import connectDB from './config/database.js';

dotenv.config();

// Sample candidates data
const candidates = [
  {
    name: 'Aarav Sharma',
    party: 'People\'s Democratic Party',
    constituency: 'Kathmandu - 1',
    symbol: 'Tree',
    description: 'Aarav Sharma is a fictional sample candidate representing Kathmandu - 1. This demonstration profile highlights community development, accessible education, accountable local government, and better public services. The person, political party, and election details are illustrative only and do not represent a real candidate or election.',
    image: '',
    isSample: true,
  },
  {
    name: 'Sushma Adhikari',
    party: 'Community Progress Party',
    constituency: 'Kathmandu - 2',
    symbol: 'Sun',
    description: 'Sushma Adhikari is a fictional sample candidate representing Kathmandu - 2. This demonstration profile highlights community development, accessible education, accountable local government, and better public services. The person, political party, and election details are illustrative only and do not represent a real candidate or election.',
    image: '',
    isSample: true,
  },
  {
    name: 'Bikash Thapa',
    party: 'Independent',
    constituency: 'Lalitpur - 1',
    symbol: 'Bell',
    description: 'Bikash Thapa is a fictional sample candidate representing Lalitpur - 1. This demonstration profile highlights community development, accessible education, accountable local government, and better public services. The person, political party, and election details are illustrative only and do not represent a real candidate or election.',
    image: '',
    isSample: true,
  },
  {
    name: 'Anita Gurung',
    party: 'People\'s Democratic Party',
    constituency: 'Bhaktapur - 1',
    symbol: 'Tree',
    description: 'Anita Gurung is a fictional sample candidate representing Bhaktapur - 1. This demonstration profile highlights community development, accessible education, accountable local government, and better public services. The person, political party, and election details are illustrative only and do not represent a real candidate or election.',
    image: '',
    isSample: true,
  },
  {
    name: 'Prakash Karki',
    party: 'Community Progress Party',
    constituency: 'Kathmandu - 1',
    symbol: 'Sun',
    description: 'Prakash Karki is a fictional sample candidate representing Kathmandu - 1. This demonstration profile highlights community development, accessible education, accountable local government, and better public services. The person, political party, and election details are illustrative only and do not represent a real candidate or election.',
    image: '',
    isSample: true,
  },
  {
    name: 'Meena Shrestha',
    party: 'Independent',
    constituency: 'Lalitpur - 2',
    symbol: 'Bicycle',
    description: 'Meena Shrestha is a fictional sample candidate representing Lalitpur - 2. This demonstration profile highlights community development, accessible education, accountable local government, and better public services. The person, political party, and election details are illustrative only and do not represent a real candidate or election.',
    image: '',
    isSample: true,
  },
];

// Sample announcements data
const announcements = [
  {
    title: 'Voter Registration Extended',
    content: 'The deadline for voter registration has been extended to December 15, 2026. All eligible citizens are encouraged to register at their nearest registration center.',
    category: 'Important',
    publishedDate: new Date('2026-11-20'),
  },
  {
    title: 'Election Date Announced',
    content: 'The Election Commission has officially announced that the upcoming local elections will be held on January 15, 2027. All candidates must submit their nomination papers by December 20, 2026.',
    category: 'Alert',
    publishedDate: new Date('2026-11-18'),
  },
  {
    title: 'Candidate Forum Schedule',
    content: 'Public forums for candidates will be held in each constituency starting December 1, 2026. Check the schedule for your constituency on our website.',
    category: 'General',
    publishedDate: new Date('2026-11-15'),
  },
  {
    title: 'Polling Station Information Available',
    content: 'Information about polling stations, including locations and facilities, is now available. Visit your local election office or check online to find your designated polling station.',
    category: 'Update',
    publishedDate: new Date('2026-11-10'),
  },
];

// Import data
const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Candidate.deleteMany();
    await Announcement.deleteMany();

    // Insert sample data
    await Candidate.insertMany(candidates);
    await Announcement.insertMany(announcements);

    console.log('✅ Data imported successfully!');
    console.log(`   ${candidates.length} candidates added`);
    console.log(`   ${announcements.length} announcements added`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await connectDB();

    await Candidate.deleteMany();
    await Announcement.deleteMany();

    console.log('✅ Data deleted successfully!');
    
    process.exit();
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
