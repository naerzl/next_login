"use client"
import React from "react"
import UsePhoneCode from "./usePhoneCode"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import UsePassword from "./usePassword"
import { useSearchParams } from "next/navigation"

const TABSWITHPASSWORD = "1"
const TABSWITHPHONECODE = "2"
const tabsItems: TabsProps["items"] = [
  {
    key: TABSWITHPASSWORD,
    label: `密码修改`,
    children: <UsePassword></UsePassword>,
  },
  {
    key: TABSWITHPHONECODE,
    label: `短信验证修改`,
    children: <UsePhoneCode></UsePhoneCode>,
  },
]

function PassWord() {
  const logo = "static/images/logo-newe.png"
  const params = useSearchParams()
  const tabsKey = params.get("type") == TABSWITHPHONECODE ? TABSWITHPHONECODE : TABSWITHPASSWORD
  return (
    <div className="center_postion w-full px-20 py-6" style={{ minHeight: "40.25rem" }}>
      <h3 className="w-150  mx-auto font-bold h-9 text-4xl">
        <img className="inline-block" src={logo} alt="logo" width={35}></img>
        arion
      </h3>
      <div className="my-10 text-center text-xl text-railway_gray">
        Please login to your account.
      </div>
      <Tabs items={tabsItems} defaultActiveKey={tabsKey} />
    </div>
  )
}

export default PassWord
