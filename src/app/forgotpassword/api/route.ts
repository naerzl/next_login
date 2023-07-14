import { ReqFetch } from "@/types/api"
import { formDataInstance } from "@/libs/init_oauth"
import { ReqForgotPhoneCodeParams } from "../types"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

// 忘记密码-修改密码-发送验证码
export const reqForgotPasswordCode = (phone: string): Promise<ReqFetch<{ code: string }>> =>
  fetch(`${baseUrl}/user/forgot/password/code?phone=${phone}`, {
    method: "get",
  }).then((res) => res.json())

// 忘记密码- 修改密码
export const reqPutForgotPassword = (body: ReqForgotPhoneCodeParams): Promise<ReqFetch<null>> =>
  fetch(`${baseUrl}/user/forgot/password`, {
    method: "put",
    body: formDataInstance.convertModelToFormData(body),
  }).then((res) => res.json())
