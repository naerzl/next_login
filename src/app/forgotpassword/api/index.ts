import { FetchParams, ReqFetch } from "@/types/api"
import { formDataInstance } from "@/libs/init_oauth"
import { ReqForgotPhoneCodeParams } from "../types"

// 忘记密码-修改密码-发送验证码
export const reqForgotPasswordCode = (
  url: string,
  { arg }: FetchParams<string>,
): Promise<ReqFetch<{ code: string }>> =>
  fetch(`${url + arg}`, {
    method: "get",
  }).then((res) => res.json())

// 忘记密码- 修改密码
export const reqPutForgotPassword = (
  url: string,
  { arg }: FetchParams<ReqForgotPhoneCodeParams>,
): Promise<ReqFetch<null>> =>
  fetch(url, {
    method: "put",
    body: formDataInstance.convertModelToFormData(arg),
  }).then((res) => res.json())
