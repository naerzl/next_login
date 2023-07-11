import {
  ReqFetch,
  ReqLoginParams,
  ReqLoginResponse,
  ReqOauth2TokenParams,
} from "../../../types/api"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
const auth2_url = "http://192.168.2.33:8003/v1"
// 密码登录
export const reqLoginWithPassword = (body: ReqLoginParams): Promise<ReqFetch<ReqLoginResponse>> => {
  const fd = new FormData()
  for (let [key, value] of Object.entries(body)) {
    fd.append(key, value as string)
  }
  return fetch(`${baseUrl}/login`, { method: "post", body: fd }).then((res) => res.json())
}

// 获取token
export const reqOauth2GetToken = (body: ReqOauth2TokenParams) => {
  // @ts-ignore
  return fetch(`${auth2_url}/oauth2?${new URLSearchParams(body).toString()}`).then((res) =>
    res.json(),
  )
}

// 刷新token
export const reqOauth2Refresh = () => {
  return fetch(`${auth2_url}/refresh`).then((res) => res.json())
}
