import { ACCESSTOKEN } from "@zctc/edms-lrs-oauth1.0"
import { LrsOaurhRequestData } from "@/types/authorization"
import XAPI from "@xapi/xapi"
import { OauthObj } from "./init_oauth"
import { getCookie } from "./cookies"

// 获取statement请求的authorization
export function GetAuthorizationHeader(request_data: LrsOaurhRequestData) {
  const obj = OauthObj.oauth.authorize(request_data) as any
  return "OAuth " + new URLSearchParams(obj).toString().replaceAll("&", ",")
}

// oauthq.0发送statement
export function oAuth1SendStatement(statement: any) {
  // 从cookie里面获取oauth_token和secret
  const searchObj = new URLSearchParams(getCookie(ACCESSTOKEN))
  const request_data = {
    url: process.env.NEXT_PUBLIC_OAUTH_STATEMENTS as string,
    method: "post",
    data: {
      oauth_token: searchObj.get("oauth_token") as string,
      oauth_token_secret: searchObj.get("oauth_token_secret"),
    },
  }
  const auth = GetAuthorizationHeader(request_data)
  const xapi = new XAPI({
    endpoint: process.env.NEXT_PUBLIC_XAPI_URL as string,
    auth,
  })
  //  发送用户行为数据
  xapi.sendStatement({ statement })
}

export const dynamicsSetRemByMobile = () => {
  let remRatio = 16 / 1920
  window.onresize = () => {
    document.documentElement.style.fontSize = `${remRatio * window.innerWidth}px`
  }
}
