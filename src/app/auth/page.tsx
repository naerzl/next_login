"use client"
import React, { useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { OauthObj } from "@/libs/init_oauth"
import { LrsOaurhRequestData } from "src/types/authorization"
function Auth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const request_data: LrsOaurhRequestData = {
    url: `${process.env.NEXT_PUBLIC_OAUTH_TOKEN}`,
    method: "get",
    data: {
      oauth_token: searchParams.get("oauth_token") as string,
      oauth_verifier: searchParams.get("oauth_verifier") as string,
    },
  }
  const request = useCallback(() => {
    OauthObj.lrsGetAccessToken({
      request_data,
      router,
      url: request_data.url,
    })
  }, [])
  useEffect(() => {
    request()
  }, [])

  return <></>
}

export default Auth
