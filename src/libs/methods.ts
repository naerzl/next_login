import { OauthObj } from "src/class/oath"
import { LrsOaurhRequestData } from "src/types/authorization"
/**
 *
 * @param queryString 字符串
 * @returns 对象
 */
export function parseQueryString(queryString: string) {
  const params = {} as any
  const pairs = queryString.split("&")
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=")
    let key: string = decodeURIComponent(pair[0])
    let value = decodeURIComponent(pair[1])
    params[key] = value
  }
  return params
}

/**
 * @description:
 * @param {type}
 * @return:查询字符串
 */
export function GetAuthorizationHeader(request_data: LrsOaurhRequestData<any>) {
  const obj = OauthObj.oauth.authorize(request_data) as any
  return new URLSearchParams(obj).toString()
}

/**
 * @description:解析cookie转对象
 * @param {type}
 * @return:对象
 */
export function parseCookieString(queryString: string) {
  const params = {} as any
  const pairs = queryString.split(";")
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split("=")
    let key: string = decodeURIComponent(pair[0])
    let value = decodeURIComponent(pair[1])
    params[key] = value
  }
  return params
}

/**
 * @description:对象转查询字符串
 * @param {type}
 * @return:查询字符串
 */
export function changeSearchParams(obj: any) {
  return new URLSearchParams(obj).toString()
}
