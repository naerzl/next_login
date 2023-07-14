import { getCookie } from "@/libs/cookies"
import { formDataInstance } from "@/libs/init_oauth"
import { ReqChangePasswordParams, ReqFetch, ReqLoginResponse } from "@/types/api"
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
const OAUTH2_ACCESS_TOKEN = process.env.NEXT_PUBLIC_OAUTH2_ACCESS_TOKEN as string
// 修改密码
export const reqChangePasswordWidthPwd = (
  body: ReqChangePasswordParams,
  authorize?: string,
): Promise<ReqFetch<ReqLoginResponse>> => {
  const authCodeOfCookie =
    getCookie(OAUTH2_ACCESS_TOKEN as string) &&
    JSON.parse(getCookie(OAUTH2_ACCESS_TOKEN as string) as string)
  return fetch(`${baseUrl}/user/first/change_password`, {
    method: "put",
    body: formDataInstance.convertModelToFormData(body),
    headers: {
      Authorization: `Bearer ${authCodeOfCookie.access_token}`,
    },
  }).then((res) => res.json())
}
