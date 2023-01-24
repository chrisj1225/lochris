import express from 'express';
import passport from 'passport';

import User from '../../models/User.js';
import Rsvp from '../../models/Rsvp.js';
import { validateRsvp } from '../../validation/rsvp.js';

const router = express.Router();

// fetch all rsvps
router.get('/', async (req, res) => {
  const rsvp = await Rsvp.find();
  res.json(rsvps);
});

// fetch a user's rsvp
router.get('/user/:user_id', async (req, res) => {
  const rsvp = await Rsvp.find({ user: req.params.user_id });
  res.json(rsvp);
});

// fetch single rsvp by id
router.get('/:id', async (req, res) => {
  const rsvp = await Rsvp.findById(req.params.id);
  res.json(rsvp);
});

// create an rsvp
router.post('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateRsvp(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const rsvpObj = {
      userId: req.user.id,
      attending: req.body.attending,
      appetizer: req.body.appetizer,
      mainCourse: req.body.mainCourse,
    };

    const user = await User.findById(req.user.id);
    if (user?.plusOne) {
      rsvpObj.p1Attending = req.body.p1Attending;
      rsvpObj.p1Appetizer = req.body.p1Appetizer;
      rsvpObj.p1MainCourse = req.body.p1MainCourse;
    }

    const newRsvp = new Rsvp(rsvpObj);

    newRsvp.save().then(rsvp => res.json(rsvp));
  }
);

export default router;