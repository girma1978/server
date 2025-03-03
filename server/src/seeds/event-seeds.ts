import { Event, User } from '../models/index.js';

export const seedEvents = async () => {
  try {
    // Fetch all users to assign as organizers for events
    const users = await User.findAll();

    // Bulk create events with assigned organizers
    await Event.bulkCreate(
      [
        {
          title: 'Tech Conference 2025',
          description: 'A large tech conference with workshops and speakers.',
          date: new Date('2025-06-15'), // Using Date object
          time: '09:00:00',
          location: 'Tech Hub, Silicon Valley',
          organizerId: users[0]?.id, // Assigning the first user as the organizer
        },
        {
          title: 'Web Development Bootcamp',
          description: 'A bootcamp focused on web development for beginners.',
          date: new Date('2025-07-10'), // Using Date object
          time: '10:00:00',
          location: 'Code Academy, New York',
          organizerId: users[1]?.id, // Assigning the second user as the organizer
        },
        {
          title: 'AI Symposium',
          description: 'A symposium discussing artificial intelligence innovations.',
          date: new Date('2025-08-20'), // Using Date object
          time: '13:00:00',
          location: 'AI Center, San Francisco',
          organizerId: users[2]?.id, // Assigning the third user as the organizer
        },
      ],
      { individualHooks: true }
    );

    console.log('Events seeded successfully');
  } catch (error) {
    console.error('Error seeding events:', error);
  }
};
