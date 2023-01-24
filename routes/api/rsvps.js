import express from 'express';
import passport from 'passport';

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
  (req, res) => {
    const { errors, isValid } = validateRsvp(req.body, req.user?.plusOne);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const rsvpObj = {
      userId: req.user.id,
      attending: req.body.attending,
    };

    if (req.user?.plusOne) {
      rsvpObj.p1Attending = req.body.p1Attending;
    }

    const newRsvp = new Rsvp(rsvpObj);

    newRsvp.save()
      .then(rsvp => res.json(rsvp))
      .catch(err => res.json(err));
  }
);

export default router;