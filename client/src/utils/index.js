import { AUTH_TOKEN } from "../constants";

export const goBack = _ => window.history.back();
export const setToken = token => localStorage.setItem(AUTH_TOKEN, token);
export const getToken = _ => localStorage.getItem(AUTH_TOKEN);