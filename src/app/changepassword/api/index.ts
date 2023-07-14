import { FetchParams, ReqFetch } from "@/types/api"
import { formDataInstance } from "@/libs/init_oauth"
import { ReqModifyPasswordParams } from "../types"
import { getCookie } from "@/libs/cookies"
const OAUTH2_ACCESS_TOKEN = process.env.NEXT_PUBLIC_OAUTH2_ACCESS_TOKEN as string
// 密码登录
export const reqPutModifyPassword = (
  url: string,
  { arg }: FetchParams<ReqModifyPasswordParams>,
): Promise<ReqFetch<null>> => {
  const authCodeOfCookie =
    getCookie(OAUTH2_ACCESS_TOKEN as string) &&
    JSON.parse(getCookie(OAUTH2_ACCESS_TOKEN as string) as string)

  return fetch(url, {
    method: "put",
    body: formDataInstance.convertModelToFormData(arg),
    headers: {
      Authorization: `Bearer ${authCodeOfCookie.access_token}`,
    },
  }).then((res) => res.json())
}
