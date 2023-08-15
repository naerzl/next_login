import { FetchParams } from "@/types/api"
import { getCookie, setCookie } from "./cookies"
import { formDataInstance, lrsOAuth2Instance } from "./init_oauth"
import { StatusCodes } from "http-status-codes"
import { OAUTH2_ACCESS_TOKEN, STATUS_SUCCESS } from "./const"

// 拼接接口地址
export const getV1BaseURL = (url: string): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL + url
}

type MethodsType = "get" | "post" | "put" | "delete" | "patch"

interface FetcherOptions<T> {
  url: string
  method?: MethodsType
  data: FetchParams<T>
}

//
export async function fetcher<T>(params: FetcherOptions<T>) {
  let {
    url,
    data: { arg },
    method,
  } = params

  const authCodeOfCookie =
    getCookie(OAUTH2_ACCESS_TOKEN) && JSON.parse(getCookie(OAUTH2_ACCESS_TOKEN) as string)
  url = getV1BaseURL(url)

  let body: any = null

  switch (method) {
    case "post":
    case "put":
      body = formDataInstance.convertModelToFormData(arg)
      break
    case "delete":
      url += "/" + arg
      break
    default:
      url += "?" + new URLSearchParams(arg as Record<string, string>).toString()
  }

  let idStatusOk = true
  const ufetch = () =>
    fetch(`${url}`, {
      method: method || "get",
      body,
      headers: authCodeOfCookie
        ? {
            Authorization: `Bearer ${authCodeOfCookie.access_token}`,
          }
        : undefined,
    })
  const result = ufetch().then(async (fetchRes) => {
    if (fetchRes.status == StatusCodes.UNAUTHORIZED) {
      idStatusOk = false
      const oauth2Res = await lrsOAuth2Instance.lrsOAuth2rRefreshToken(
        getV1BaseURL("/refresh"),
        `Bearer ${authCodeOfCookie.access_token}`,
      )
      if (oauth2Res.status == StatusCodes.UNAUTHORIZED) throw new Error("401")
      const oauth2Result = await oauth2Res.json()
      if (oauth2Result.code !== STATUS_SUCCESS) throw new Error("500")
      setCookie(OAUTH2_ACCESS_TOKEN, oauth2Result.data)
    }
    return fetchRes
  })

  return (idStatusOk ? result : ufetch()).then((res) => res.json())
}
