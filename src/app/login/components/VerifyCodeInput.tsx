import { reqGetPhoneCode } from "@/app/login/api"
import useCountDown from "@/hooks/useCountDown"
import useDebounce from "@/hooks/useDebounce"
import { REGEXP_PHONE, STATUS_SUCCESS } from "@/libs/const"
import { Button, TextField } from "@mui/material"
import React from "react"
import useSWRMutation from "swr/mutation"
import message from "antd-message-react"

const SECONDS = 60

const VerifyCodeInput = React.forwardRef(
  (props: { field?: any; trigger?: any; errors?: any; getValues?: any; callback?: any }, ref) => {
    const { trigger: apiTrigger } = useSWRMutation("/login/phone/code?phone=", reqGetPhoneCode)
    // 倒计时hooks接口一个时间和一个倒计时结束的回调函数
    const { count, start } = useCountDown(SECONDS, () => {})
    const { field, getValues, errors, trigger } = props

    // 处理发送验证码时间
    const { run: handleClick } = useDebounce(() => {
      // 校验手机号
      trigger("phone")
      // 校验手机号是否合法
      if (REGEXP_PHONE.test(getValues("phone"))) {
        // 开始计时
        start()
        // 调佣api
        apiTrigger(getValues("phone")).then((res) => {
          if (res.code !== STATUS_SUCCESS) return message.error("操作失败")
          console.log(`code=${res.data.code}`)
        })
      }
    })

    const handleBlur = () => {
      trigger(field.name)
    }
    return (
      <div className="h-14 flex justify-evenly mb-6">
        <TextField
          {...field}
          label="验证码"
          variant="outlined"
          className="flex-1"
          ref={ref}
          error={errors ? true : false}
          helperText={errors ? "请正确填写验证码" : null}
          onBlur={handleBlur}
        />
        <Button
          variant="outlined"
          className="h-full w-1/4 ml-4"
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
