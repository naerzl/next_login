import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '工程化数字管理系统',
  description: '工程化数字管理系统',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="zh_CN">
      <body className={inter.className}>{children}</body>
      </html>
  )
}
