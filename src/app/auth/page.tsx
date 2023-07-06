'use client'
import React, { useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { OauthObj } from 'src/class/oath'
import { parseQueryString } from '@/libs/methods'
function Auth() {
  const router = useRouter()
  const request_data = {
    url:process.env.OAUTH_TOKEN || 'http://192.168.2.33:8899/xapi/OAuth/token',
    method: 'get',
    data: {},
  }
  const query = useSearchParams()
  const request = useCallback(() => {
    const url = `${query}`
    const {oauth_token,oauth_verifier} = parseQueryString(url)

    OauthObj.lrsGetAccessToken({request_data,oauth_token,oauth_verifier,router,url:request_data.url})
  }, [query])
  useEffect(() => {
    request()
  }, [])

  return <div style={{ display: 'none' }}>auth</div>
}

export default Auth
