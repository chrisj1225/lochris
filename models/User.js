import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  plusOne: {
    type: String,
    required: false,
  },
  superuser: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);
export default User;