"use client"
import React from "react"
import PassWord from "./components/PassWord"

export default function Login() {
  return (
    <main className="flex h-screen min-h-[43.75rem]">
      <div className="flex-1 bg-gray-400"></div>
      <div
        className="h-full justify-center  relative min-w-[37.5rem]"
        style={{ width: "35%", boxShadow: "-10px 0px 30px -10px rgba(0, 0, 0, 0.3)" }}>
        <PassWord></PassWord>
      </div>
    </main>
  )
}
