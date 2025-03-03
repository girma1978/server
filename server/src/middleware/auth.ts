// import type { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// interface JwtPayload {
//   username: string;
// }

// export const authenticateToken = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader) {
//     const token = authHeader.split(' ')[1];

//     const secretKey = process.env.JWT_SECRET_KEY || '';

//     jwt.verify(token, secretKey, (err, user) => {
//       if (err) {
//         return res.sendStatus(403); // Forbidden
//       }

//       req.user = user as JwtPayload;
//       return next();
//     });
//   } else {
//     res.sendStatus(401); // Unauthorized
//   }
// };

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the type for the JWT payload
interface JwtPayload {
  username: string;
}

// Middleware to authenticate user with JWT token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    const secretKey = process.env.JWT_SECRET_KEY || ''; // Secret key for JWT signing

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        console.log('JWT verification failed:', err);
        return res.sendStatus(403); // Forbidden if the token is invalid or expired
      }

      req.user = user as JwtPayload; // Attach the decoded user data (from JWT payload) to the request object
      console.log('Authenticated user:', req.user); // Log authenticated user
      return next(); // Proceed to the next middleware or route handler
    });
  } else {
    console.log('No authorization header provided');
    res.sendStatus(401); // Unauthorized if no token is provided
  }
};

// Middleware to authenticate users (User-specific routes)
export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return authenticateToken(req, res, next); // Use general token authentication for user routes
};

// Middleware to authenticate events-related actions for specific users
export const authenticateEvent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return authenticateToken(req, res, () => {
    const eventId = req.params.eventId || req.body.eventId;

    if (!eventId) {
      return res.status(400).json({ message: 'Event ID is required' });
    }

    // Example check to verify if the event belongs to the authenticated user
    console.log('Event ID to check:', eventId);

    // In-memory event example, replace with actual database query logic
    const event = events.find((event) => event.id === eventId); 

    if (!event) {
      console.log(`Event not found for ID: ${eventId}`);
      return res.status(404).json({ message: 'Event not found' });
    }

    console.log('Event found:', event);

    // Check if the event's userId matches the authenticated user's username
    if (event.userId !== req.user?.username) {
      console.log('User does not have permission to modify this event');
      return res.status(403).json({ message: "You don't have permission to modify this event" });
    }

    return next(); // Continue if event belongs to the user
  });
};

// Middleware to authenticate RSVPs for a user
export const authenticateRsvp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return authenticateToken(req, res, () => {
    const rsvpId = req.params.rsvpId || req.body.rsvpId;

    if (!rsvpId) {
      return res.status(400).json({ message: 'RSVP ID is required' });
    }

    // Example check to verify if the RSVP belongs to the authenticated user
    console.log('RSVP ID to check:', rsvpId);

    // In-memory RSVP example, replace with actual database query logic
    const rsvp = rsvps.find((rsvp) => rsvp.id === rsvpId);

    if (!rsvp) {
      console.log(`RSVP not found for ID: ${rsvpId}`);
      return res.status(404).json({ message: 'RSVP not found' });
    }

    console.log('RSVP found:', rsvp);

    // Check if the RSVP's userId matches the authenticated user's username
    if (rsvp.userId !== req.user?.username) {
      console.log('User does not have permission to modify this RSVP');
      return res.status(403).json({ message: "You don't have permission to modify this RSVP" });
    }

    return next(); // Continue if RSVP belongs to the user
  });
};

// Example in-memory data (replace with real database queries)
const events = [
  { id: '1', userId: 'user1', name: 'Event 1', description: 'Description 1' },
  { id: '2', userId: 'user2', name: 'Event 2', description: 'Description 2' },
];

const rsvps = [
  { id: '1', userId: 'user1', eventId: '1', status: 'attending' },
  { id: '2', userId: 'user2', eventId: '2', status: 'not attending' },
];
