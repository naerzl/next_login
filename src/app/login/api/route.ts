import { ReqFetch, ReqLoginParams, ReqLoginResponse, ReqOauth2TokenParams } from "@/types/api"
import { formDataInstance } from "@/libs/init_oauth"
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
const auth2_url = process.env.NEXT_PUBLIC_AUTH2_URL
// 密码登录
export const reqLoginWithPassword = (body: ReqLoginParams): Promise<ReqFetch<ReqLoginResponse>> => {
  return fetch(`${baseUrl}/login`, {
    method: "post",
    body: formDataInstance.convertModelToFormData(body),
  }).then((res) => res.json())
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
