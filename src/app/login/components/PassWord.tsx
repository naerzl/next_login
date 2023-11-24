"use client"
import React from "react"
import BasicTabs from "./Tabs"

function PassWord() {
  const logo = "/static/images/logo-newe.png"

  return (
    <div className="center_postion w-full px-20" style={{ minHeight: "40.25rem" }}>
      <h3 className="mx-auto font-bold  text-3xl   flex items-center justify-center phone:text-5xl">
        <img className="inline-block mr-1" src={logo} alt="logo" width={40}></img>
        工程数字化管理系统
      </h3>
      <div className="my-10 text-center text-lg text-railway_gray phone:text-4xl">
        请登录你的账号
      </div>
      <BasicTabs></BasicTabs>
    </div>
  )
}

export default PassWord
