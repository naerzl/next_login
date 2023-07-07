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
