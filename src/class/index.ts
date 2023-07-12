import { SearchObjectType } from "./index.d"

export class SearchObject {
  client_id: string
  code_challenge: string
  code_challenge_method: string
  password: string
  redirect_uri: string
  response_type: string
  scope: string
  state: string
  username: string
  constructor(obj: SearchObjectType) {
    ;(this.client_id = ""),
      (this.code_challenge = ""),
      (this.code_challenge_method = ""),
      (this.password = obj.password),
      (this.redirect_uri = ""),
      (this.response_type = ""),
      (this.scope = ""),
      (this.state = ""),
      (this.username = obj.username)
  }
}
