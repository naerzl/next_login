import { NextResponse } from "next/server"
export async function GetStatements() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_OAUTH_BASE_URL}/statements`, {
    method: "post",
    body: "",
  })
  const data = await res.json()

  return NextResponse.json({ data })
}
