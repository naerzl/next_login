"use client"
import React from "react"
import UsePhoneCode from "./usePhoneCode"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import UsePassword from "./usePassword"
import { useSearchParams } from "next/navigation"

const tabsItems: TabsProps["items"] = [
  {
    key: "1",
    label: `密码修改`,
    children: <UsePassword></UsePassword>,
  },
  {
    key: "2",
    label: `短信验证修改`,
    children: <UsePhoneCode></UsePhoneCode>,
  },
]

function PassWord() {
  const logo = "static/images/logo-newe.png"
  const params = useSearchParams()
  const tabsKey = params.get("type") == "2" ? "2" : "1"
  return (
    <div className="center_postion w-full px-80 py-24" style={{ minHeight: "644px" }}>
      <h3 className="w-150  mx-auto font-bold" style={{ height: "35px", fontSize: "35px" }}>
        <img className="inline-block" src={logo} alt="logo" width={35}></img>
        arion
      </h3>
      <div className="my-40 text-center text-20" style={{ color: "#8697A8" }}>
        Please login to your account.
      </div>
      <Tabs items={tabsItems} defaultActiveKey={tabsKey} />
    </div>
  )
}

export default PassWord
