import Cookies from "js-cookie";

const ACCESSTOKEN = "access_token";

export function getToken() {
  return Cookies.get(ACCESSTOKEN);
}

export function setToken(token: string) {
  return Cookies.set(ACCESSTOKEN, token);
}

export function removeToken() {
  return Cookies.remove(ACCESSTOKEN);
}