import { NextResponse } from 'next/server'
export async function GET() {
  const res = await fetch('http://192.168.2.33:8899/xapi/statements', {
    method:'post',
    body:''
  })
  const data = await res.json()

  return NextResponse.json({ data })
}
