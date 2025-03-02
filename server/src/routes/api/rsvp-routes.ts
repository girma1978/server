import express from 'express';
import type { Request, Response } from 'express';
import { Rsvp } from '../../models/index.js'; // Import the RSVP model

const router = express.Router();

// GET /rsvps - Get all RSVPs
router.get('/', async (_req: Request, res: Response) => {
  try {
    const rsvps = await Rsvp.findAll(); // Fetch all RSVPs
    res.json(rsvps); // Return the RSVPs as JSON
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
});

// GET /rsvps/:id - Get a specific RSVP by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rsvp = await Rsvp.findByPk(id); // Fetch RSVP by primary key (id)
    if (rsvp) {
      res.json(rsvp); // Return the RSVP if found
    } else {
      res.status(404).json({ message: 'RSVP not found' }); // RSVP not found
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
});

// POST /rsvps - Create a new RSVP
router.post('/', async (req: Request, res: Response) => {
  const { userId, eventId, status } = req.body;
  try {
    const newRsvp = await Rsvp.create({ userId, eventId, status });
    res.status(201).json(newRsvp); // Return the created RSVP
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // Handle bad request errors
  }
});

// PUT /rsvps/:id - Update an RSVP by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userId, eventId, status } = req.body;
  try {
    const rsvp = await Rsvp.findByPk(id); // Find the RSVP by ID
    if (rsvp) {
      rsvp.userId = userId;
      rsvp.eventId = eventId;
      rsvp.status = status;
      await rsvp.save(); // Save the updated RSVP
      res.json(rsvp); // Return the updated RSVP
    } else {
      res.status(404).json({ message: 'RSVP not found' }); // RSVP not found
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message }); // Handle bad request errors
  }
});

// DELETE /rsvps/:id - Delete an RSVP by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rsvp = await Rsvp.findByPk(id); // Find the RSVP by ID
    if (rsvp) {
      await rsvp.destroy(); // Delete the RSVP
      res.json({ message: 'RSVP deleted' }); // Return success message
    } else {
      res.status(404).json({ message: 'RSVP not found' }); // RSVP not found
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
});

export { router as rsvpRouter };
