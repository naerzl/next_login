"use client"
import React, { useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { OauthObj } from "@/libs/init_oauth"
import { getCookie, setCookie } from "@/libs/cookies"
import { ACCESSTOKEN } from "@zctc/edms-lrs-oauth1.0"
import { OAuth1RequestDataType, OAuth1ThreeDataType } from "@zctc/edms-lrs-oauth1.0/types"
import { OAUTH2_PATH_FROM } from "@/libs/const"

function Auth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // 需要签名的对象
  const request_data: OAuth1RequestDataType<OAuth1ThreeDataType> = {
    url: `${process.env.NEXT_PUBLIC_OAUTH_TOKEN}`,
    method: "get",
    data: {
      oauth_token: searchParams.get("oauth_token") as string,
      oauth_verifier: searchParams.get("oauth_verifier") as string,
    },
  }
  const request = useCallback(async () => {
    // oauth签名的第三步
    try {
      const res = await OauthObj.lrsGetAccessToken({
        request_data,
        url: request_data.url,
      })
      setCookie(ACCESSTOKEN, res)
      router.push(getCookie("_next") || "/login")
    } catch (error) {
      const path = getCookie(OAUTH2_PATH_FROM) as string
      router.push(path)
    }
  }, [])
  useEffect(() => {
    request()
  }, [])

  return <></>
}

export default Auth
