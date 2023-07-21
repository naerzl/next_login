import { FetchParams, ReqFetch } from "@/types/api"
import { ReqModifyPasswordParams } from "../types"
import { fetcher } from "@/libs/fetch"

// 密码登录
export const reqPutModifyPassword = (
  url: string,
  { arg }: FetchParams<ReqModifyPasswordParams>,
): Promise<ReqFetch<null>> => {
  return fetcher({ data: { arg }, url, method: "put" })
}
