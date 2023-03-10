import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { keys } from '../../config/keys.js';
import User from '../../models/User.js';
import Rsvp from '../../models/Rsvp.js';
import { validateRegisterInput } from '../../validation/register.js';
import { validateLoginInput } from '../../validation/login.js';

const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "This is the users route"}));

// private user auth route
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    superuser: req.user.superuser,
  });
});

router.get('/', 
  passport.authenticate('jwt', {session: false}),
  async (req, res) => {
  const allUsers = await User.find().sort({ lastName: 1 });
  const allRsvps = await Rsvp.find();
  
  // combine each user with its rsvp and then return all
  const rsvpsMap = {};
  allRsvps.forEach((rsvp) => {
    rsvpsMap[rsvp.userId] = rsvp;
  });

  const finalAllUsers = allUsers.map(user => {
    const currRsvp = rsvpsMap[user._id];

    let newUserObj = { ...user._doc, id: user._id };
    if (currRsvp?.attending) {
      newUserObj.attending = currRsvp.attending;
      newUserObj.p1Attending = currRsvp.p1Attending;
      newUserObj.status = currRsvp.attending === 'y' ? 'attending' : 'declined';
    } else {
      newUserObj.status = 'pending';
    }
    return (newUserObj);
  });

  // create user map by id to easily find each selected user 
  const usersMap = {};
  finalAllUsers.forEach(user => {
    usersMap[user._id] = user;
  });

  res.json({
    allUsers: finalAllUsers,
    userIdMap: usersMap,
  });
});

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if someone already registered with a duplicate email
  User.findOne({ email: req.body.email})
    .then(user => {
      if (user) {
        errors.email = "User already exists";
        return res.status(400).json(errors);
      } else {
        // Create a new user
        const newUser = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
          plusOne: req.body.plusOne || null,
          superuser: req.body.superuser,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                const { id, email, firstName, lastName, plusOne, superuser } = user;
                const payload = {
                  id,
                  email,
                  firstName,
                  lastName,
                  plusOne,
                  superuser
                };
                
                jwt.sign(
                  payload,
                  keys.secretOrKey,
                  {expiresIn: 3600},
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token,
                    });
                  }
                );
              })
              .catch(err => console.log(err));
          })
        })
      }
    })
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "This user does not exist";
        return res.status(404).json(errors);
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const { id, email, firstName, lastName, plusOne, superuser } = user; 
            const payload = {
              id,
              email,
              firstName,
              lastName,
              plusOne,
              superuser
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              {expiresIn: 3600},
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token,
                });
              }
            );
          } else {
            errors.password = "Incorrect password";
            return res.status(404).json(errors);
          }
        })
    })
})

export default router;