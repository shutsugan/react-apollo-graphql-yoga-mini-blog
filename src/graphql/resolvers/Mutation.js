import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APP_SECRET } from '../../config';
import { getUserId } from '../../utils';

const createPost = async (_, { title, article, art, author }, { context }) => {
  const post = await context.models.Post.findOne({ title });
  if (post) throw new Error('Please provide a unique title');

  const newPost = new models.Post({
    title,
    article,
    art,
    author
  });

  try {
    await newPost.save();
  } catch (err) {
    throw new Error('Can not Save The Post!!');
  }

  return newPost;
};

const signup = async (_, { name, email, password }, { context }) => {
  const pwd = await bcrypt.hash(password, 10);

  const user = await context.models.User.findOne({email});
  if (user) throw new Error('User already exists');

  const newUser = await context.models.User.create({
    name,
    email,
    password: pwd
  });
  
  const token = jwt.sign({ userId: newUser.id }, APP_SECRET);

  try {
    await newUser.save();
  } catch (err) {
    throw new Error('Can not save the User!!');
  }

  return {
    token,
    user: newUser
  };
};

const login = async (_, {email, password}, { context }) => {
  const user = await context.models.User.findOne({ email });
  if (!user) throw new Error('No such user found');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');

  return {
    token: jwt.sign({ userId: user.id }, APP_SECRET),
    user
  }
};

export default {
  createPost,
  signup,
  login
}
