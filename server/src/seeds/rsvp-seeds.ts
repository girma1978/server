import { Rsvp, User, Event } from '../models/index.js';

export const seedRsvps = async () => {
  // Fetch users and events to create RSVPs
  const users = await User.findAll();
  const events = await Event.findAll();

  // Create some RSVPs for events
  await Rsvp.bulkCreate(
    [
      {
        userId: users[0]?.id, // User 1
        eventId: events[0]?.id, // Event 1 (Tech Conference)
        status: 'going',
      },
      {
        userId: users[1]?.id, // User 2
        eventId: events[1]?.id, // Event 2 (Web Development Bootcamp)
        status: 'interested',
      },
      {
        userId: users[2]?.id, // User 3
        eventId: events[2]?.id, // Event 3 (AI Symposium)
        status: 'not going',
      },
      {
        userId: users[0]?.id, // User 1
        eventId: events[1]?.id, // Event 2 (Web Development Bootcamp)
        status: 'going',
      },
      {
        userId: users[1]?.id, // User 2
        eventId: events[2]?.id, // Event 3 (AI Symposium)
        status: 'interested',
      },
    ],
    { individualHooks: true }
  );
};
