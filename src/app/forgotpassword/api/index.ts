import { FetchParams, ReqFetch } from "@/types/api"
import { ReqForgotPhoneCodeParams } from "../types"
import { fetcher } from "@/libs/fetch"

// 忘记密码-修改密码-发送验证码
export const reqForgotPasswordCode = (
  url: string,
  { arg }: FetchParams<{ phone: string }>,
): Promise<ReqFetch<{ code: string }>> => fetcher({ url, data: { arg } })

// 忘记密码- 修改密码
export const reqPutForgotPassword = (
  url: string,
  { arg }: FetchParams<ReqForgotPhoneCodeParams>,
): Promise<ReqFetch<null>> => fetcher({ url, data: { arg }, method: "put" })
