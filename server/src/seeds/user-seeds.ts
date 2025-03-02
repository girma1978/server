import { User } from '../models/index.js';
import bcrypt from 'bcrypt';

// Function to seed users into the database
export const seedUsers = async () => {
  // Array of user data to be inserted into the users table
  const users = [
    { 
      username: 'JollyGuru', 
      email: 'jolly@guru.com', 
      password: await bcrypt.hash('password', 10) 
    },
    { 
      username: 'SunnyScribe', 
      email: 'sunny@scribe.com', 
      password: await bcrypt.hash('password', 10) 
    },
    { 
      username: 'RadiantComet', 
      email: 'radiant@comet.com', 
      password: await bcrypt.hash('password', 10) 
    },
    { 
      username: 'MoonlitExplorer', 
      email: 'moonlit@explorer.com', 
      password: await bcrypt.hash('password', 10) 
    },
    { 
      username: 'DawnPatroller', 
      email: 'dawn@patroller.com', 
      password: await bcrypt.hash('password', 10) 
    }
  ];

  // Use bulkCreate to insert the data into the database
  await User.bulkCreate(
    users.map(user => ({
      ...user,
      createdAt: new Date(),
      updatedAt: new Date()
    })),
    { individualHooks: true }
  );
};
