import express from 'express';
import passport from 'passport';

import User from '../../models/User.js';
import Rsvp from '../../models/Rsvp.js';
import { validateRsvp } from '../../validation/rsvp.js';

const router = express.Router();

// fetch all rsvps
router.get('/', (req, res) => {
  Rsvp.find()
    .then(rsvps => res.json(rsvps))
    .catch(err => 
      res.status(404).json({ norsvpsfound: 'No Rsvps found'})
    );
});

// fetch a user's rsvp
router.get('/user/:user_id', (req, res) => {
  Rsvp.find({ user: req.params.user_id })
    .then(rsvp => res.json(rsvp))
    .catch(err =>
      res.status(404).json({ norsvpfound: `No rsvp found for user ${req.params.user_id }` })  
    );
});

// fetch single rsvp by id
router.get('/:id', (req, res) => {
  Rsvp.findById(req.params.id)
    .then(rsvp => res.json(rsvp))
    .catch(err =>
      res.status(404).json({ notweetfound: `No rsvp found with id ${req.params.id}` })  
    );
});

// create an rsvp
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
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

    User.findById(req.user.id)
      .then(user => {
        if (user?.plusOne) {
          rsvpObj.p1Attending = req.body.p1Attending;
          rsvpObj.p1Appetizer = req.body.p1Appetizer;
          rsvpObj.p1MainCourse = req.body.p1MainCourse;
        }
      });

    const newRsvp = new Rsvp(rsvpObj);

    newRsvp.save().then(rsvp => res.json(rsvp));
  }
);

export default router;