import express from 'express';
import type { Request, Response } from 'express';
import { Event } from '../../models/index.js';  // Import the Event model

const router = express.Router();

// GET /events - Get all events
router.get('/', async (_req: Request, res: Response) => {
  try {
    const events = await Event.findAll();  // Fetch all events
    res.json(events);  // Return events as JSON response
  } catch (error: any) {
    res.status(500).json({ message: error.message });  // Handle server error
  }
});

// GET /events/:id - Get a specific event by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);  // Fetch event by primary key (id)
    if (event) {
      res.json(event);  // Return event if found
    } else {
      res.status(404).json({ message: 'Event not found' });  // Handle case when event is not found
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });  // Handle server error
  }
});

// POST /events - Create a new event
router.post('/', async (req: Request, res: Response) => {
  const { title, description, date, time, location, organizerId } = req.body;
  try {
    const newEvent = await Event.create({
      title, description, date, time, location, organizerId
    });
    res.status(201).json(newEvent);  // Return created event
  } catch (error: any) {
    res.status(400).json({ message: error.message });  // Handle bad request error
  }
});

// PUT /events/:id - Update an event by ID
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, date, time, location, organizerId } = req.body;
  try {
    const event = await Event.findByPk(id);  // Find event by ID
    if (event) {
      // Update event properties
      event.title = title;
      event.description = description;
      event.date = date;
      event.time = time;
      event.location = location;
      event.organizerId = organizerId;

      await event.save();  // Save the updated event
      res.json(event);  // Return the updated event
    } else {
      res.status(404).json({ message: 'Event not found' });  // Handle case when event is not found
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });  // Handle bad request error
  }
});

// DELETE /events/:id - Delete an event by ID
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await Event.findByPk(id);  // Find event by ID
    if (event) {
      await event.destroy();  // Delete the event
      res.json({ message: 'Event deleted' });  // Return success message
    } else {
      res.status(404).json({ message: 'Event not found' });  // Handle case when event is not found
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });  // Handle server error
  }
});

export { router as eventRouter };
