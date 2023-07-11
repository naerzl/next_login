"use client"
import React from "react"
import UsePhoneCode from "./usePhoneCode"
import { Tabs } from "antd"
import type { TabsProps } from "antd"
import UsePassword from "./usePassword"

const tabsItems: TabsProps["items"] = [
  {
    key: "1",
    label: `密码登录`,
    children: <UsePassword></UsePassword>,
  },
  {
    key: "2",
    label: `短信登录`,
    children: <UsePhoneCode></UsePhoneCode>,
  },
]

function PassWord() {
  const logo = "static/images/logo-newe.png"
  const facebook = "/static/images/login/facebook.png"
  const google_plus = "/static/images/login/google-plus.png"
  const pinterest = "/static/images/login/pinterest.png"
  const twitter = "/static/images/login/twitter.png"

  return (
    <div className="center_postion w-full px-80 py-24" style={{ minHeight: "644px" }}>
      <h3 className="w-150  mx-auto font-bold" style={{ height: "35px", fontSize: "35px" }}>
        <img className="inline-block" src={logo} alt="logo" width={35}></img>
        arion
      </h3>
      <div className="my-40 text-center text-20" style={{ color: "#8697A8" }}>
        Please login to your account.
      </div>
      <Tabs items={tabsItems} defaultActiveKey="1" />
      <div className="border-t-2 my-40 relative">
        <span className="text-center text-gray-400 text-sm bg-white w-8 h-6 absolute inset-x-0 -top-3 left-1/2 -translate-x-2/4">
          OR
        </span>
      </div>
      <div className="flex justify-center gap-3">
        <img src={facebook} className="cursor-pointer" alt="" width={80} />
        <img src={twitter} className="cursor-pointer" alt="" width={80} />
        <img src={google_plus} className="cursor-pointer" alt="" width={80} />
        <img src={pinterest} className="cursor-pointer" alt="" width={80} />
      </div>
    </div>
  )
}

export default PassWord
