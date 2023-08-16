"use client"
import "./globals.scss"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh_CN">
      <body className={inter.className} id="_next">
        {children}
      </body>
    </html>
  )
}
