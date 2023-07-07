export type LrsOathRequestData_Data = {
  oauth_callback?: string
  oauth_verifier?: string
  oauth_token?: string
}

export type LrsOaurhRequestData = {
  url: string
  method: string
  data: LrsOathRequestData_Data
}

export type LrsOauthInitiate = {
  url: string
  request_data: LrsOaurhRequestData
  router?: AppRouterInstance
  _next?: string
}
