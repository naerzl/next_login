import OAuth from "oauth-1.0a";
import axios from "axios";
import CryptoJS from 'crypto-js'
import { HasQuery, LrsOauthInitiate } from "src/types/authorization";
import {  changeSearchParams, parseCookieString } from "@/libs/methods";
class LrsOauthClient {
oauth: OAuth;
_next:string
    constructor(){
      this._next = ''
       this.oauth = new OAuth({
        consumer: {
            key: 'ec84c66bdbce457297a2c625edda76be',
            secret: 'lDzaJHqcrCtElMDk',
          },
          signature_method: 'HMAC-SHA1',
          hash_function(base_string, key) {
            return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64)
          },
       })
    }

    async lrsOauthInitiate(obj:LrsOauthInitiate<any>){
      this._next= obj._next?obj._next:'/login'
      const signature = this.oauth.authorize(obj.request_data)
      signature.oauth_signature = encodeURIComponent(signature.oauth_signature)
      const res =await  fetch(obj.url+`?${changeSearchParams(signature)}`)
      const data = await res.text()
      if(data){
        let str = data + `&callback=${obj.request_data.data.oauth_callback}`
        obj.router && obj.router.push(`/?${str}`)
        return '/?'+ str
      }
      return '/'
    }

    lrsGetAccessToken(obj:LrsOauthInitiate<any> & HasQuery){
      obj.request_data.data = {
        oauth_verifier: obj.oauth_verifier,
        oauth_token: obj.oauth_token,
      }
      const oAuthObj = this.oauth.authorize(obj.request_data)
      axios({
        url:obj. request_data.url,
        method: obj.request_data.method,
        params: { ...obj.request_data.data, ...oAuthObj },
      }).then((res) => {
        localStorage.setItem('access_token', res.data)
        document.cookie=`access_token=${res.data}`
        const cookieObj = parseCookieString(document.cookie)
        const next = cookieObj._next || '/login'
        obj.router.push(`${next}`)
      })

    }
    
}

export let OauthObj =  new LrsOauthClient()