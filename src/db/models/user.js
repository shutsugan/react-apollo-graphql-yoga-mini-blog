import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
    validate: {
      validator: value => /[a-zA-Z0-9._]/.test(value),
      message: props => `${props.value} is not a valid user name`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: value => /\S+@\S+\.\S+/.test(value),
      message: props => `${props.value} is not a valid email`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, { timestamps: { createdAt: 'createdAt' } });

const User = mongoose.model('User', userSchema);
export default User;
