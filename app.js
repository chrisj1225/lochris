import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

import { keys } from './config/keys.js';
import users from './routes/api/users.js';
import rsvps from './routes/api/rsvps.js';
import { passportFunc } from './config/passport.js';

const app = express();
const db = keys.mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
passportFunc(passport);
app.use("/api/users", users);
app.use("/api/rsvps", rsvps);
  
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));