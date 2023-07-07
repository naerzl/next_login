"use client"
import { useSearchParams } from "next/navigation"
import React from "react"

export default function Page() {
  const search = useSearchParams().get("oauth_token")
  console.log(search)
  return <div>page</div>
}
