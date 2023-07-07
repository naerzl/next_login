import Cookies from "js-cookie"

const ACCESSTOKEN = "access_token"

export function getTokenWithCookie() {
  return Cookies.get(ACCESSTOKEN)
}

export function setTokenWithCookie(token: string) {
  return Cookies.set(ACCESSTOKEN, token)
}

export function removeTokenWithCookie() {
  return Cookies.remove(ACCESSTOKEN)
}
