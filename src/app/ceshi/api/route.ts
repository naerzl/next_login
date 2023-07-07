import { NextResponse } from "next/server"

export async function GET(request: Request) {
  console.log(request.url)
  return NextResponse.json({ a: 213 })
}
