import { getCookie } from "@/libs/cookies"
import { getV1BaseURL } from "@/libs/fetch"
import { formDataInstance } from "@/libs/init_oauth"
import { FetchParams, ReqChangePasswordParams, ReqFetch, ReqLoginResponse } from "@/types/api"

const OAUTH2_ACCESS_TOKEN = process.env.NEXT_PUBLIC_OAUTH2_ACCESS_TOKEN as string

// 修改密码
export const reqChangePasswordWidthPwd = (
  url: string,
  { arg }: FetchParams<ReqChangePasswordParams>,
): Promise<ReqFetch<ReqLoginResponse>> => {
  const authCodeOfCookie =
    getCookie(OAUTH2_ACCESS_TOKEN as string) &&
    JSON.parse(getCookie(OAUTH2_ACCESS_TOKEN as string) as string)
  return fetch(getV1BaseURL(url), {
    method: "put",
    body: formDataInstance.convertModelToFormData(arg),
    headers: {
      Authorization: `Bearer ${authCodeOfCookie.access_token}`,
    },
  }).then((res) => res.json())
}
