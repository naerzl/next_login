import { LrsOauthInitOptions } from "./oath.d"
import OAuth from "oauth-1.0a"
import CryptoJS from "crypto-js"
import { LrsOauthInitiate } from "src/types/authorization"
import { parseCookieString } from "@/libs/methods"
import { setTokenWithCookie } from "@/libs/cookies"
import { apiGetOauthWithFetcher } from "src/app/api/route"
class LrsOauthClient {
  oauth: OAuth
  constructor(consumer: LrsOauthInitOptions) {
    this.oauth = new OAuth({
      consumer,
      signature_method: process.env.NEXT_PUBLIC_SIGNATURE_METHOD,
      hash_function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
      },
    })
  }

  // 签名并初始化oauth_token
  async lrsOauthInitiate(obj: LrsOauthInitiate) {
    const signature = this.oauth.authorize(obj.request_data)
    signature.oauth_signature = encodeURIComponent(signature.oauth_signature)
    const data = await apiGetOauthWithFetcher(
      obj.url + `?${new URLSearchParams(signature as any).toString()}`,
    )
    if (data) {
      let str = data + `&callback=${obj.request_data.data.oauth_callback}`
      return "/?" + str
    }
    return "/"
  }

  lrsGetAccessToken(obj: LrsOauthInitiate) {
    const oAuthObj = this.oauth.authorize(obj.request_data)
    apiGetOauthWithFetcher(
      `${obj.request_data.url}?${new URLSearchParams({
        ...obj.request_data.data,
        ...oAuthObj,
      } as any).toString()}`,
    ).then((res) => {
      setTokenWithCookie(res)
      const cookieObj = parseCookieString(document.cookie)
      const next = cookieObj._next || "/login"
      obj.router.push(`${next}`)
    })
  }
}

export default LrsOauthClient
