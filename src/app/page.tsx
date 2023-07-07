"use client"
import { getTokenWithCookie } from "@/libs/cookies"
import { parseQueryString } from "@/libs/methods"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"

export default function Home() {
  const [oauthToken, setOauthToken] = React.useState("")
  const [action, setAction] = React.useState("")
  const [objId, setObjId] = React.useState("")
  const DButton = React.useRef<null | HTMLButtonElement>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  React.useEffect(() => {
    const url = `${searchParams}`
    const obj = parseQueryString(url)
    setOauthToken(obj.oauth_token)
    setObjId(obj.obj_id)
    setAction(
      `${process.env.NEXT_PUBLIC_OAUTH_BASE_URL}${process.env.NEXT_PUBLIC_OAUTH_AUTHORIZE}?${url}`,
    )
  }, [searchParams])

  React.useEffect(() => {
    oauthToken && action && objId && DButton.current!.click()
  }, [oauthToken, action, objId])

  if (getTokenWithCookie()) {
    router.back()
    return <></>
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div style={{ display: "none" }}>
          <form action={action} method="post">
            <input type="text" name="authorize_access" value="1" readOnly />
            <input type="text" name="obj_id" value={objId} readOnly />
            <input type="text" name="description" value={"工程数字化管理系统APP"} readOnly />
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
}
