import { XapiType } from "@/types/authorization"
import { LoginParamsType, LoginWithPhoneParamsType } from "./index.d"

// 登录基类
export class LoginParamsClass {
  client_id: string
  code_challenge: string
  code_challenge_method: string
  redirect_uri: string
  response_type: string
  scope: string
  state: string
  constructor() {
    ;(this.client_id = ""),
      (this.code_challenge = ""),
      (this.code_challenge_method = ""),
      (this.redirect_uri = ""),
      (this.response_type = ""),
      (this.scope = ""),
      (this.state = "")
  }
}

// 密码登录子类
export class LoginWithPasswordClass extends LoginParamsClass {
  password: string
  username: string
  constructor(obj: LoginParamsType) {
    super()
    this.password = obj.password
    this.username = obj.username
  }
}

// 手机号登录子类
export class LoginWithPhoneClass extends LoginParamsClass {
  phone: string
  code: string
  constructor(obj: LoginWithPhoneParamsType) {
    super()
    this.phone = obj.phone
    this.code = obj.code
  }
}

interface XapiClassType {
  actor: string
  object: string
  verb: string | XapiType["verb"]
}

// statements类
export class XapiStatementsClass {
  actor: XapiType["actor"]
  verb: XapiType["verb"]
  object: XapiType["object"]
  constructor({ actor, object, verb }: XapiClassType) {
    this.actor = {
      objectType: "Agent",
      openid: actor,
    }
    this.object = {
      objectType: "Activity",
      id: object,
    }
    if (typeof verb === "string") {
      this.verb = {
        id: verb,
      }
    } else {
      this.verb = verb
    }
  }
}
