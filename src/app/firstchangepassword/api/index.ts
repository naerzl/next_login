import { fetcher } from "@/libs/fetch"
import { FetchParams, ReqChangePasswordParams, ReqFetch, ReqLoginResponse } from "@/types/api"

// 修改密码
export const reqChangePasswordWidthPwd = (
  url: string,
  { arg }: FetchParams<ReqChangePasswordParams>,
): Promise<ReqFetch<ReqLoginResponse>> => fetcher({ url, data: { arg }, method: "put" })
