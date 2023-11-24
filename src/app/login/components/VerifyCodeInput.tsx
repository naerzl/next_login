import { reqGetPhoneCode } from "@/app/login/api"
import useCountDown from "@/hooks/useCountDown"
import useDebounce from "@/hooks/useDebounce"
import { REGEXP_PHONE } from "@/libs/const"
import { Button, TextField } from "@mui/material"
import React from "react"
import useSWRMutation from "swr/mutation"
import * as process from "process"
import message from "antd-message-react"

const SECONDS = 60

const VerifyCodeInput = React.forwardRef(
  (props: { field?: any; trigger?: any; errors?: any; getValues?: any; callback?: any }, ref) => {
    const { trigger: apiTrigger } = useSWRMutation("/login/phone/code", reqGetPhoneCode)
    // 倒计时hooks接口一个时间和一个倒计时结束的回调函数
    const { count, start } = useCountDown(SECONDS, () => {})
    const { field, getValues, errors, trigger } = props

    // 处理发送验证码时间
    const { run: handleClick } = useDebounce(async () => {
      // 校验手机号
      trigger("phone")
      // 校验手机号是否合法
      if (REGEXP_PHONE.test(getValues("phone"))) {
        // 开始计时
        start()
        // 调佣api
        const res = await apiTrigger({ phone: getValues("phone") })
        if (process.env.NEXT_PUBLIC_SHOW_CODE == "1" && res) {
          message.success(`短信验证码为：${res.data.code}`)
        }
      }
    })

    const handleBlur = () => {
      trigger(field.name)
    }
    return (
      <div className="flex justify-evenly">
        <TextField
          {...field}
          label="验证码"
          variant="outlined"
          className="flex-1"
          ref={ref}
          error={!!errors}
          helperText={errors ? "请正确填写验证码" : null}
          onBlur={handleBlur}
        />
        <Button
          variant="outlined"
          className="w-2/5 ml-4 h-14"
          onClick={handleClick}
          disabled={count !== SECONDS}>
          {count === SECONDS ? "发送验证码" : count}
        </Button>
      </div>
    )
  },
)

VerifyCodeInput.displayName = "VerifyCodeInput"
export default VerifyCodeInput
