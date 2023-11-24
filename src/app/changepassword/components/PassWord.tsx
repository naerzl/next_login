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
    </div>
  )
}

export default PassWord
