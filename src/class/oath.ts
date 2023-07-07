import OAuth from "oauth-1.0a"
import axios from "axios"
import CryptoJS from "crypto-js"
import { HasQuery, LrsOauthInitiate } from "src/types/authorization"
import { changeSearchParams, parseCookieString } from "@/libs/methods"
class LrsOauthClient {
  oauth: OAuth
  constructor() {
    this.oauth = new OAuth({
      consumer: {
        key: process.env.NEXT_PUBLIC_CONSUMER_KEY as string,
        secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET as string,
      },
      signature_method: process.env.NEXT_PUBLIC_SIGNATURE_METHOD,
      hash_function(base_string, key) {
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
      },
    })
  }

  // 签名并初始化oauth_token
  async lrsOauthInitiate(obj: LrsOauthInitiate<any>) {
    const signature = this.oauth.authorize(obj.request_data)
    signature.oauth_signature = encodeURIComponent(signature.oauth_signature)
    const res = await fetch(obj.url + `?${changeSearchParams(signature)}`)
    const data = await res.text()
    if (data) {
      let str = data + `&callback=${obj.request_data.data.oauth_callback}`
      return "/?" + str
    }
    return "/"
  }

  lrsGetAccessToken(obj: LrsOauthInitiate<any> & HasQuery) {
    obj.request_data.data = {
      oauth_verifier: obj.oauth_verifier,
      oauth_token: obj.oauth_token,
    }
    const oAuthObj = this.oauth.authorize(obj.request_data)
    axios({
      url: obj.request_data.url,
      method: obj.request_data.method,
      params: { ...obj.request_data.data, ...oAuthObj },
    }).then((res) => {
      document.cookie = `access_token=${res.data}`
      const cookieObj = parseCookieString(document.cookie)
      const next = cookieObj._next || "/login"
      obj.router.push(`${next}`)
    })
  }
}

export let OauthObj = new LrsOauthClient()
