import jwt from 'jsonwebtoken'

import { AUTH_TOKEN } from "../constants";

export const goBack = (history, path) => history.push(path);
export const setToken = token => localStorage.setItem(AUTH_TOKEN, token);
export const getToken = _ => localStorage.getItem(AUTH_TOKEN);
export const getUserId = _ => jwt.decode(getToken());