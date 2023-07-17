import { FetchParams, ReqFetch } from "@/types/api"
import { formDataInstance } from "@/libs/init_oauth"
import { ReqForgotPhoneCodeParams } from "../types"
import { getV1BaseURL } from "@/libs/fetch"

// 忘记密码-修改密码-发送验证码
export const reqForgotPasswordCode = (
  url: string,
  { arg }: FetchParams<string>,
): Promise<ReqFetch<{ code: string }>> =>
  fetch(`${getV1BaseURL(url) + arg}`, {
    method: "get",
  }).then((res) => res.json())

// 忘记密码- 修改密码
export const reqPutForgotPassword = (
  url: string,
  { arg }: FetchParams<ReqForgotPhoneCodeParams>,
): Promise<ReqFetch<null>> =>
  fetch(getV1BaseURL(url), {
    method: "put",
    body: formDataInstance.convertModelToFormData(arg),
  }).then((res) => res.json())
