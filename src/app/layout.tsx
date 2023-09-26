"use client"
import "./globals.scss"
import { Inter } from "next/font/google"

export const dynamic = "error"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh_CN" id="_next">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
