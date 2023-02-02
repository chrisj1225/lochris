import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RsvpSchema = new Schema({
  userId: {
    type: String,
    // type: Schema.Types.ObjectId,
    ref: 'users',
  },
  attending: {
    type: String,
    required: true,
  },
  p1Attending: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

const Rsvp = mongoose.model('Rsvp', RsvpSchema);
export default Rsvp;