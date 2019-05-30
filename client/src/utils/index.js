import jwt from 'jsonwebtoken'

import { AUTH_TOKEN } from "../constants";

export const goBack = (history, path) => history.push(path);
export const getUserId = _ => jwt.decode(getToken());
export const setToken = token => localStorage.setItem(AUTH_TOKEN, token);
export const getToken = _ => localStorage.getItem(AUTH_TOKEN);

export const removeToken = (history, path) => {
  localStorage.removeItem(AUTH_TOKEN);
  goBack(history, path);
};

export const displayError = (error, setter) => {
  let message = (error[0])
    ? error[0].message
    : 'Something went wrong';

  setter(message);
}
