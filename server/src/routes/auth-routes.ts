// import { Router, type Request, type Response } from 'express';
// import { User } from '../models/user.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt';



// export const login = async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({
//     where: { username },
//   });
//   if (!user) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }

//   const passwordIsValid = await bcrypt.compare(password, user.password);
//   if (!passwordIsValid) {
//     return res.status(401).json({ message: 'Authentication failed' });
//   }

//   const secretKey = process.env.JWT_SECRET_KEY || '';

//   const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
//   return res.json({ token });
// };

// const router = Router();

// // POST /login - Login a user
// router.post('/login', login);

// export default router;

import { Router, type Request, type Response } from 'express';
import { User } from '../models/user.js';  // Make sure User model is correctly imported
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Login controller function
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed: User not found' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Authentication failed: Invalid password' });
    }

    // Generate a JWT token with the username payload and secret key
    const secretKey = process.env.JWT_SECRET_KEY || '';
    if (!secretKey) {
      return res.status(500).json({ message: 'Server error: JWT secret key not found' });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

    // Send the token as a response
    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Route to login a user and generate a token
router.post('/login', login);

export default router;
