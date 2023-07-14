"use client"
import { Button } from "@mui/material"
import React from "react"

function Custom401() {
  return (
    <main className="flex items-center justify-center min-h-screen relative overflow-hidden">
      <div className="text-center">
        <h3 className="font-bold" style={{ color: "#0081ff", fontSize: "250px", lineHeight: "1" }}>
          404
        </h3>
        <div className="font mt-9" style={{ color: "#44566c", fontSize: "50px" }}>
          Looks like you got lost
        </div>
        <div className="my-24">The page you`re looking for doesn`t exist or has been moved</div>
        <Button
          variant="contained"
          className="mx-auto inline-block"
          style={{ backgroundColor: "#0081ff" }}>
          Back to Home
        </Button>
      </div>
      {/* 背景圆 */}
      <div
        className="flex absolute -z-10 w-full rounded-full aspect-square items-center justify-center"
        style={{ backgroundColor: "#f7fbff" }}>
        <div
          className="flex absolute rounded-full aspect-square items-center justify-center"
          style={{ backgroundColor: "#f2f9ff", width: "75%" }}>
          <div
            className="flex absolute rounded-full aspect-square items-center justify-center"
            style={{ backgroundColor: "#edf7ff", width: "75%" }}></div>
        </div>
      </div>
    </main>
  )
}

export default Custom401
