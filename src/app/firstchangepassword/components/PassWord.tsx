"use client"
import React from "react"
import BasicTabs from "./Tabs"

function PassWord() {
  const logo = "static/images/logo-newe.png"
  return (
    <div className="center_postion w-full px-20 py-6" style={{ minHeight: "40.25rem" }}>
      <h3 className="w-150  mx-auto font-bold h-9 text-4xl">
        <img className="inline-block" src={logo} alt="logo" width={35}></img>
        arion
      </h3>
      <div className="my-10 text-center text-xl text-railway_gray">
        Please login to your account.
      </div>
      <BasicTabs></BasicTabs>
    </div>
  )
}

export default PassWord
