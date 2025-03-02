// import { Router } from 'express';
// import { userRouter } from './user-routes.js';

// const router = Router();

// router.use('/users', userRouter);

// export default router;

import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { eventRouter } from './event-routes.js'; // Import event router
import { rsvpRouter } from './rsvp-routes.js'; // Import RSVP router

const router = Router();

// Use the different routers for the specific routes
router.use('/users', userRouter); // User routes
router.use('/events', eventRouter); // Event routes
router.use('/rsvps', rsvpRouter); // RSVP routes

export default router;
