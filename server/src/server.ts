
import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import { seedUsers } from './seeds/user-seeds.js'; // Import user seed function
import { seedEvents } from './seeds/event-seeds.js'; // Import event seed function
import { seedRsvps } from './seeds/rsvp-seeds.js'; // Import RSVP seed function

const app = express();
const PORT = process.env.PORT || 3001;

const forceDatabaseRefresh = false;

// Run the seed functions before starting the server
const initializeApp = async () => {
  try {
    // Seed the users, events, and RSVPs before syncing the database
    await seedUsers();
    await seedEvents(); // Call seed for events
    await seedRsvps(); // Call seed for RSVPs

    // Sync Sequelize models and start the server
    await sequelize.sync({ force: forceDatabaseRefresh });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during app initialization:', error);
  }
};

app.use(express.static('../client/dist'));
app.use(express.json());
app.use(routes);

// Start the application and run the seed
initializeApp();
