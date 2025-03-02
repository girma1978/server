
import { seedUsers } from './user-seeds.js';
import { seedEvents } from './event-seeds.js';
import { seedRsvps } from './rsvp-seeds.js';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    // Sync the database
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');

    // Seed the data
    await seedUsers();  // Seed users first
    console.log('\n----- USERS SEEDED -----\n');

    await seedEvents();  // Seed events after users
    console.log('\n----- EVENTS SEEDED -----\n');

    await seedRsvps();  // Seed RSVPs after events
    console.log('\n----- RSVPS SEEDED -----\n');

    // Exit after seeding
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Call the seed function
seedAll();
