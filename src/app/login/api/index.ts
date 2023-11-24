import {
  FetchParams,
  ReqFetch,
  ReqLoginParams,
  ReqLoginPhoneCodeParams,
  ReqLoginResponse,
} from "@/types/api"
import { fetcher } from "@/libs/fetch"

// 密码登录

export const reqLoginWithPassword = (
  url: string,
  { arg }: FetchParams<ReqLoginParams>,
): Promise<ReqFetch<ReqLoginResponse>> => {
  return fetcher({ url, data: { arg }, method: "post" })
}

// 短信密码登录
export const reqLoginWithPhone = (
  url: string,
  { arg }: FetchParams<ReqLoginPhoneCodeParams>,
): Promise<ReqFetch<ReqLoginResponse>> => fetcher({ url, data: { arg }, method: "post" })

// 获取短信验证码
export const reqGetPhoneCode = (
  url: string,
  { arg }: FetchParams<{ phone: string }>,
): Promise<ReqFetch<{ code: string }>> => fetcher({ url, data: { arg } })
