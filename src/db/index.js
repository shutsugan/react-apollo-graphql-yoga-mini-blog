import mongoose from 'mongoose';
import User from './models/user';
import Post from './models/post';
import Vote from './models/vote';

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

export const startDb = ({ url }) => mongoose.connect(url, { useNewUrlParser: true });
export const models = {
  User,
  Post,
  Vote
};
