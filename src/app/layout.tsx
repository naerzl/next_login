"use client"
import "./globals.scss"
import { Inter } from "next/font/google"
import React from "react"

export const dynamic = "error"

const inter = Inter({ subsets: ["latin"] })

const baseSize = 16
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例
  const scale = document.documentElement.clientWidth / 750
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 1) + "px"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    // setRem()
    // window.onresize = function () {
    //   setRem()
    // }
  }, [])
  return (
    <html lang="zh_CN" id="_next">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
