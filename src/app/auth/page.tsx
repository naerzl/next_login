"use client"
import React, { useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { OauthObj } from "@/libs/init_oauth"
import { LrsOaurhRequestData } from "src/types/authorization"
import { ACCESSTOKEN } from "src/class/oath"
import { getCookie, setCookie } from "@/libs/cookies"
function Auth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // 需要签名的对象
  const request_data: LrsOaurhRequestData = {
    url: `${process.env.NEXT_PUBLIC_OAUTH_TOKEN}`,
    method: "get",
    data: {
      oauth_token: searchParams.get("oauth_token") as string,
      oauth_verifier: searchParams.get("oauth_verifier") as string,
    },
  }
  const request = useCallback(async () => {
    // oauth签名的第三步
    const res = await OauthObj.lrsGetAccessToken({
      request_data,
      router,
      url: request_data.url,
    })
    setCookie(ACCESSTOKEN, res)
    router.push(getCookie("_next") || "/login")
  }, [])
  useEffect(() => {
    request()
  }, [])

  return <></>
}

export default Auth
