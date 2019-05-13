import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { APP_SECRET } from '../../config';
import { getUserId } from '../../utils';

const users = async (_, __, { context }) => {
  const users = await context.models
    .User
    .find()
    .populate('posts')
    .sort({ name: 1 });

  if (!users) throw new Error('Users do not exist');

  return users;
};

const user = async (_, { id }, { context }) => {
  const user = await context.models
    .User
    .findById(id)
    .populate('posts');

  if (!user) throw new Error('User does not exist');

  return user;
};

const signup = async (_, { name, email, password }, { context }) => {
  const pwd = await bcrypt.hash(password, 10);

  const userExists = await context.models.User.findOne({email});
  if (userExists) throw new Error('User already exists');

  const user = await context.models.User.create({ name, email, password: pwd });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  try {
    await user.save();
  } catch (err) {
    throw new Error('Can not save the User');
  }

  return {
    token,
    user
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

export {
  users,
  user,
  signup,
  login
};
