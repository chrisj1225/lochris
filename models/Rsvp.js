import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RsvpSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  attending: {
    type: Boolean,
    required: true,
  },
  p1Attending: {
    type: Boolean,
    required: false,
  },
}, {
  timestamps: true,
});

const Rsvp = mongoose.model('Rsvp', RsvpSchema);
export default Rsvp;