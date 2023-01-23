import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userId: {
    type: Number,
    required: true,
  },
  attending: {
    type: Boolean,
    required: true,
  },
  plusOneAttending: {
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
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);
export default User;