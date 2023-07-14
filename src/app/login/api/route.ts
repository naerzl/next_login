import { ReqFetch, ReqLoginParams, ReqLoginPhoneCodeParams, ReqLoginResponse } from "@/types/api"
import { formDataInstance } from "@/libs/init_oauth"
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
// 密码登录
export const reqLoginWithPassword = (body: ReqLoginParams): Promise<ReqFetch<ReqLoginResponse>> => {
  return fetch(`${baseUrl}/login`, {
    method: "post",
    body: formDataInstance.convertModelToFormData(body),
  }).then((res) => res.json())
}

// 短信密码登录
export const reqLoginWithPhone = (
  body: ReqLoginPhoneCodeParams,
): Promise<ReqFetch<ReqLoginResponse>> =>
  fetch(`${baseUrl}/login/phone`, {
    method: "post",
    body: formDataInstance.convertModelToFormData(body),
  }).then((res) => res.json())

// 获取短信验证码
export const reqGetPhoneCode = (phone: string): Promise<ReqFetch<{ code: string }>> =>
  fetch(`${baseUrl}/login/phone/code?phone=${phone}`, {
    method: "get",
  }).then((res) => res.json())
