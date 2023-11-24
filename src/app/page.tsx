"use client"
import { getCookie } from "@/libs/cookies"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { ACCESSTOKEN } from "@zctc/edms-lrs-oauth1.0"

const CLIENT_URL = process.env.NEXT_PUBLIC_CLiENT_URL as string

export default function Home() {
  const [oauthToken, setOauthToken] = React.useState("")
  const [action, setAction] = React.useState("")
  const [objId, setObjId] = React.useState("")
  const DButton = React.useRef<HTMLButtonElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  React.useEffect(() => {
    setOauthToken(searchParams.get("oauth_token") as string)
    setObjId(searchParams.get("obj_id") as string)
    setAction(`${process.env.NEXT_PUBLIC_OAUTH_AUTHORIZE}?${searchParams.toString()}`)
  }, [searchParams])

  React.useEffect(() => {
    // 第二步 判断所有状态都有值之后再模拟点击
    oauthToken && action && objId && DButton.current!.click()
  }, [oauthToken, action, objId])

  if (!getCookie(ACCESSTOKEN) && !searchParams.get("oauth_token")) {
    router.push(CLIENT_URL)
    // location.href = CLIENT_URL
  }

  // 判断如果有token退回上一级路由
  if (getCookie(ACCESSTOKEN)) {
    router.push(CLIENT_URL)
    // location.href = CLIENT_URL
    return <></>
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ display: "none" }}>
        <form action={action} method="post">
          <input type="text" name="authorize_access" value="1" readOnly />
          <input type="text" name="obj_id" value={objId} readOnly />
          <input
            type="text"
            name="description"
            value={process.env.NEXT_PUBLIC_OAUTH_DESCRIPTION}
            readOnly
          />
          <input type="text" name="scopes" value="statements/write" readOnly />
          <input type="text" name="scopes" value="statements/read/mine" readOnly />
          <input type="text" name="oauth_token" value={oauthToken} readOnly />
          <button type="submit" ref={DButton}>
            提交
          </button>
        </form>
      </div>
    </main>
  )
}
