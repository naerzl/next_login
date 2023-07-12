import { formDataInstance } from "@/libs/init_oauth"
import { ReqChangePasswordParams, ReqFetch, ReqLoginResponse } from "@/types/api"
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const reqChangePasswordWidthPwd = (
  body: ReqChangePasswordParams,
): Promise<ReqFetch<ReqLoginResponse>> => {
  return fetch(`${baseUrl}/user/first/change_password`, {
    method: "post",
    body: formDataInstance.convertModelToFormData(body),
  }).then((res) => res.json())
}
