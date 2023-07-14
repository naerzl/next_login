import useCountDown from "@/hooks/useCountDown"
import { REGEXP_PHONE } from "@/libs/const"
import { Button, TextField } from "@mui/material"
import React from "react"
import { reqForgotPasswordCode } from "../api"
import useSWRMutation from "swr/mutation"
import { getV1BaseURL } from "@/libs/fetch"
import useDebounce from "@/hooks/useDebounce"

const SECONDS = 60
const VerifyCodeInput = React.forwardRef(
  (props: { field?: any; trigger?: any; errors?: any; getValues?: any; callback?: any }, ref) => {
    const { trigger: apiTrigger } = useSWRMutation(
      getV1BaseURL("/user/forgot/password/code?phone="),
      reqForgotPasswordCode,
    )
    const { count, start } = useCountDown(SECONDS, () => {})
    const { field, getValues, errors, trigger } = props

    // 处理发送验证码事件
    const { run: handleClick } = useDebounce(() => {
      trigger("phone")
      if (REGEXP_PHONE.test(getValues("phone"))) {
        start()
        apiTrigger(getValues("phone")).then((res) => {
          if (res.code !== 2000) return
          console.log(`code=${res.data.code}`)
        })
      }
    })

    // 失去焦点校验value
    const handleBlur = () => {
      trigger(field.name)
    }
    return (
      <div className=" flex justify-evenly mb-4">
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
          className="h-14 w-1/4 ml-4"
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
