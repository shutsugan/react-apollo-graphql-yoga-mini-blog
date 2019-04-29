import jwt from 'jsonwebtoken';
import { APP_SECRET } from './config';

export const getUserId = context => {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);

    return userId;
  }

  throw new error('Not authenticated');
};
