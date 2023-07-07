'use client'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import usePassword from './components/usePassword'
import React from 'react'
export default function Login() {
  const logo = 'static/images/logo.png'
  return (
    <main className="select-none flex min-h-screen bg-gray-100 bg-no-repeat bg-cover items-center justify-between">
      <div className="lg:flex container justify-center min-h-screen items-center bg-white hidden sm:hidden md:hidden">
        <div className="px-20 mb-20">
          <img src={logo} className="w-16 mb-16" alt="logo" />
          <h1 className="text-5xl font-bold mb-6">工程数字化管理系统</h1>
          <h2 className="text-2xl text-gray-400">用数字化为施工企业赋能。</h2>
        </div>
      </div>
      <div className="flex container flex-col items-center justify-center">
        <img src={logo} className="lg:hidden w-20 mb-3 pb-3" alt="logo" />
        <div className="border shadow mx-6 mb-14 bg-white rounded-md p-8 flex h-full flex-col">
          <h1 className="text-2xl text-center mb-5 pb-3 font-bold">登录</h1>
          {usePassword(function () {})}
          <div className="cursor-pointer text-center text-railway_blue text-xs py-2 font-light focus-visible:outline-none focus:outline-none">
            忘记密码
          </div>
          <div className="border-t-2 my-3 relative">
            <span className="text-center text-gray-400 text-sm bg-white w-8 h-6 absolute inset-x-0 -top-3 left-1/2 -translate-x-2/4">
              OR
            </span>
          </div>
          <div className="flex container flex-col">
            <div className="flex container cursor-pointer flex-row border px-2 py-2 rounded-md">
              <div className="w-8">
                <EnvelopeIcon className="h-5 w-5 text-railway_blue mt-0.5 mx-1" />
              </div>
              <span className="pl-1 mt-0.5 text-slate-800 text-xs">
                使用验证码继续
              </span>
            </div>
            <div className="flex cursor-pointer mt-2 container flex-row border px-2 py-2 rounded-md">
              <div className="w-8">
                <svg className="h-5 w-5 bg mt-0.5 mx-1" viewBox="0 0 1024 1024">
                  <path
                    d="M669.03 317.396c10.18 0 20.235 0.748 30.237 1.865C672.1 192.728 536.831 98.731 382.415 98.731 209.797 98.73 68.38 216.39 68.38 365.797c0 86.242 47.044 157.061 125.674 211.988l-31.406 94.468L272.403 617.2c39.303 7.781 70.81 15.765 110.01 15.765 9.85 0 19.626-0.482 29.324-1.243-6.144-20.996-9.698-42.983-9.698-65.793 0.002-137.196 117.806-248.533 266.99-248.533z m-168.862-85.14c23.639 0 39.302 15.55 39.302 39.186 0 23.536-15.664 39.3-39.302 39.3-23.536 0-47.147-15.765-47.147-39.3 0-23.635 23.612-39.185 47.147-39.185z m-219.765 78.487c-23.538 0-47.3-15.765-47.3-39.3 0-23.635 23.764-39.185 47.3-39.185 23.534 0 39.2 15.55 39.2 39.185 0 23.535-15.666 39.3-39.2 39.3z"
                    fill="#69BB64"
                  ></path>
                  <path
                    d="M955.618 562.147c0-125.543-125.622-227.882-266.734-227.882-149.413 0-267.09 102.339-267.09 227.882 0 125.77 117.677 227.88 267.09 227.88 31.279 0 62.838-7.898 94.243-15.766l86.12 47.17-23.612-78.473c63.04-47.286 109.983-109.993 109.983-180.81z m-353.311-39.289c-15.639 0-31.431-15.549-31.431-31.416 0-15.652 15.792-31.405 31.43-31.405 23.74 0 39.304 15.754 39.304 31.405 0 15.867-15.563 31.416-39.303 31.416z m172.72 0c-15.538 0-31.201-15.549-31.201-31.416 0-15.652 15.664-31.405 31.202-31.405 23.536 0 39.3 15.754 39.3 31.405 0.001 15.867-15.764 31.416-39.3 31.416z"
                    fill="#69BB64"
                  ></path>
                </svg>
              </div>
              <span className="pl-1 mt-0.5 text-slate-800 text-xs">
                使用微信继续
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
