import { LrsOauthInitOptions } from "./oath.d"
import OAuth from "oauth-1.0a"
import CryptoJS from "crypto-js"
import { LrsOauthInitiate } from "src/types/authorization"
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

  // 第一步 签名并初始化oauth_token
  async lrsOauthInitiate(obj: LrsOauthInitiate) {
    const signature = this.oauth.authorize(obj.request_data)
    // 转码签名里面的特殊字符
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

  // 第三步 通过授权后的oauth_token换取access_token
  lrsGetAccessToken(obj: LrsOauthInitiate) {
    const oAuthObj = this.oauth.authorize(obj.request_data)
    apiGetOauthWithFetcher(
      `${obj.request_data.url}?${new URLSearchParams({
        ...obj.request_data.data,
        ...oAuthObj,
      } as any).toString()}`,
    ).then((res) => {
      // 获取到的token存在cookie
      setTokenWithCookie(res)
      const _next = new URLSearchParams(document.cookie.replaceAll("; ", "&")).get("_next")
      obj.router.push(`${_next || "/login"}`)
    })
  }
}

export default LrsOauthClient
