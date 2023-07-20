"use client"
// import { dynamicsSetRemByMobile } from "@/libs/methods"
import "./globals.scss"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "工程化数字管理系统",
  description: "工程化数字管理系统",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // dynamicsSetRemByMobile()
  return (
    <html lang="zh_CN">
      <body className={inter.className} id="_next">
        {children}
      </body>
    </html>
  )
}
