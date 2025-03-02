
import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { EventFactory } from './event.js';
import { RsvpFactory } from './rsvp.js';

const User = UserFactory(sequelize);
const Event = EventFactory(sequelize);
const Rsvp = RsvpFactory(sequelize);

// Set up model relationships if needed
User.hasMany(Rsvp, { foreignKey: 'userId' });
Rsvp.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Rsvp, { foreignKey: 'eventId' });
Rsvp.belongsTo(Event, { foreignKey: 'eventId' });

export { User, Event, Rsvp };
