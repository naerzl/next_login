"use client"
import React from "react"
import UsePassword from "./usePassword"

function PassWord() {
  const logo = "/static/images/logo-newe.png"
  const facebook = "/static/images/login/facebook.png"
  const google_plus = "/static/images/login/google-plus.png"
  const pinterest = "/static/images/login/pinterest.png"
  const twitter = "/static/images/login/twitter.png"

  return (
    <div className="center_postion w-full px-20 py-" style={{ minHeight: "40.25rem" }}>
      <h3 className="mx-auto font-bold  text-3xl   flex items-center justify-center">
        <img className="inline-block mr-1" src={logo} alt="logo" width={40}></img>
        工程数字化管理系统
      </h3>
      <div className="my-10 text-center text-lg text-railway_gray">请修改你的密码</div>
      <UsePassword></UsePassword>
      <div className="border-t-2 my-10 relative">
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
