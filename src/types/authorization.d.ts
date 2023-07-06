export type LrsOaurhRequestData<T> = {
    url:string
    method:string
    data:T
}

export  type LrsOauthInitiate<T> ={
    url:string,
    request_data:LrsOaurhRequestData<T>,
    router?:AppRouterInstance
    _next?:string
  }
  
export  type HasQuery={
    oauth_verifier:string
    oauth_token:string
  }