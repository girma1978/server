import { Rsvp, User, Event } from '../models/index.js';

export const seedRsvps = async () => {
  try {
    // Fetch users and events to create RSVPs
    const users = await User.findAll();
    const events = await Event.findAll();

    // Check if there are at least 3 users and 3 events
    if (users.length < 3 || events.length < 3) {
      console.error('Not enough users or events to create RSVPs');
      return;
    }

    // Create some RSVPs for events
    await Rsvp.bulkCreate(
      [
        {
          userId: users[0].id, // User 1
          eventId: events[0].id, // Event 1 (Tech Conference)
          status: 'going',
        },
        {
          userId: users[1].id, // User 2
          eventId: events[1].id, // Event 2 (Web Development Bootcamp)
          status: 'interested',
        },
        {
          userId: users[2].id, // User 3
          eventId: events[2].id, // Event 3 (AI Symposium)
          status: 'not going',
        },
        {
          userId: users[0].id, // User 1
          eventId: events[1].id, // Event 2 (Web Development Bootcamp)
          status: 'going',
        },
        {
          userId: users[1].id, // User 2
          eventId: events[2].id, // Event 3 (AI Symposium)
          status: 'interested',
        },
      ],
      { individualHooks: true }
    );

    console.log('RSVPs have been created');
  } catch (error) {
    console.error('Error seeding RSVPs:', error);
  }
};
