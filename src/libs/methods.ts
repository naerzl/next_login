import { OauthObj } from "src/class/oath"
import { LrsOaurhRequestData } from "src/types/authorization"
/**
 *
 * @param queryString string
 * @returns 对象
 */
export function parseQueryString(queryString: string) {
  const params = {} as any
  const pairs = queryString.split('&')
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=')
    let key: string = decodeURIComponent(pair[0])
    let value = decodeURIComponent(pair[1])
    params[key] = value
  }
  return params
}

/**
* @description:
* @param {type}  
* @return: 
*/
export  function GetAuthorizationHeader(request_data:LrsOaurhRequestData<any>){
  const obj =  OauthObj.oauth.authorize(request_data) as any
  const arr = []
  for(let key in obj){
    arr.push(`${key}=${obj[key]}`)
  }
  return arr.join(',')
}

/**
* @description:解析cookie转对象
* @param {type} 
* @return: 
*/
export function parseCookieString(queryString: string){
  const params = {} as any
  const pairs = queryString.split(';')
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=')
    let key: string = decodeURIComponent(pair[0])
    let value = decodeURIComponent(pair[1])
    params[key] = value
  }
  return params
}

/**
* @description:查询字符串转对象
* @param {type} 
* @return: 
*/
export function changeSearchParams(obj:any){
  const arr = []
  for(let key in obj){
    arr.push(`${key}=${obj[key]}`)
  }
  return arr.join('&') 
}