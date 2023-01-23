import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RsvpSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  attending: {
    type: Boolean,
    required: true,
  },
  appetizer: {
    type: String,
    required: true,
  },
  mainCourse: {
    type: String,
    required: false,
  },
  p1Attending: {
    type: Boolean,
    required: true,
  },
  p1Appetizer: {
    type: String,
    required: true,
  },
  p1MainCourse: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const Rsvp = mongoose.model('Rsvp', RsvpSchema);
export default Rsvp;