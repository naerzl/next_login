"use client"
import React, { Suspense } from "react"
import PassWord from "./components/PassWord"
import Banner from "@/components/Banner"

// export const metadata: Metadata = {
//   title: "这是login 111" ,
// }

export default function Login() {
  return (
    <main className="flex h-screen min-h-[43.75rem]">
      <div className="flex-1 bg-gray-400 phone:hidden">
        <Banner />
      </div>
      <div
        className="h-full justify-center  relative  max-sm:w-full max-sm:h-full w-[37.5rem] phone:w-full"
        style={{ boxShadow: "-10px 0px 30px -10px rgba(0, 0, 0, 0.3)" }}>
        <Suspense fallback={<div>Suspense</div>}>
          <PassWord></PassWord>
        </Suspense>
      </div>
    </main>
  )
}
