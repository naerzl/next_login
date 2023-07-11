import { ReqChangePasswordParams, ReqFetch, ReqLoginResponse } from "@/types/api"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const reqChangePasswordWidthPwd = (
  body: ReqChangePasswordParams,
): Promise<ReqFetch<ReqLoginResponse>> => {
  const fd = new FormData()
  for (let [key, value] of Object.entries(body)) {
    fd.append(key, value as string)
  }
  return fetch(`${baseUrl}/user/first/change_password`, { method: "post", body: fd }).then((res) =>
    res.json(),
  )
}
