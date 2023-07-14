import {
  FetchParams,
  ReqFetch,
  ReqLoginParams,
  ReqLoginPhoneCodeParams,
  ReqLoginResponse,
} from "@/types/api"
import { formDataInstance } from "@/libs/init_oauth"

// 密码登录
export const reqLoginWithPassword = (
  url: string,
  { arg }: FetchParams<ReqLoginParams>,
): Promise<ReqFetch<ReqLoginResponse>> => {
  return fetch(url, {
    method: "post",
    body: formDataInstance.convertModelToFormData(arg),
  }).then((res) => res.json())
}

// 短信密码登录
export const reqLoginWithPhone = (
  url: string,
  { arg }: FetchParams<ReqLoginPhoneCodeParams>,
): Promise<ReqFetch<ReqLoginResponse>> =>
  fetch(url, {
    method: "post",
    body: formDataInstance.convertModelToFormData(arg),
  }).then((res) => res.json())

// 获取短信验证码
export const reqGetPhoneCode = (
  url: string,
  { arg }: FetchParams<string>,
): Promise<ReqFetch<{ code: string }>> =>
  fetch(`${url}${arg}`, {
    method: "get",
  }).then((res) => res.json())
