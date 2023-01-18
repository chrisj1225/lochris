const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const User = require('../../models/User');

router.get("/test", (req, res) => res.json({ msg: "This is the users route"}));

router.post('/register', (req, res) => {
  // Check if someone already registered with a duplicate email
  User.findOne({ email: req.body.email})
    .then(user => {
      if (user) {
        return res.status(400).json({email: "A user has already registered with this email"});
      } else {
        // Create a new user
        const newUser = new User({
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: req.body.password,
          plusOne: req.body.plusOne || null,
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
});

module.exports = router;