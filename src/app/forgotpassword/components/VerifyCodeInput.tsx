import useCountDown from "@/hooks/useCountDown"
import { REGEXP_PHONE, STATUS_SUCCESS } from "@/libs/const"
import { Button, TextField } from "@mui/material"
import React from "react"
import { reqForgotPasswordCode } from "../api"
import useSWRMutation from "swr/mutation"
import useDebounce from "@/hooks/useDebounce"
import message from "antd-message-react"

const SECONDS = 60
const VerifyCodeInput = React.forwardRef(
  (
    props: {
      field?: any
      trigger?: any
      errors?: any
      getValues?: any
      callback?: any
      ErrorMessage: any
    },
    ref,
  ) => {
    const { trigger: apiTrigger } = useSWRMutation(
      "/user/forgot/password/code",
      reqForgotPasswordCode,
    )
    const { count, start } = useCountDown(SECONDS, () => {})
    const { field, getValues, errors, trigger, ErrorMessage } = props

    // 处理发送验证码事件
    const { run: handleClick } = useDebounce(() => {
      trigger("phone")
      if (REGEXP_PHONE.test(getValues("phone"))) {
        start()
        apiTrigger({ phone: getValues("phone") }).then((res) => {
          if (res.code !== STATUS_SUCCESS) return message.error("操作失败")
          message.success("操作成功")
          console.log(`code=${res.data.code}`)
        })
      }
    })

    // 失去焦点校验value
    const handleBlur = () => {
      trigger(field.name)
    }
    return (
      <>
        <div className="flex justify-evenly mb-4">
          <TextField
            {...field}
            label="验证码"
            variant="outlined"
            className="flex-1"
            ref={ref}
            error={errors ? true : false}
            // helperText={errors ? "请正确填写验证码" : null}
            onBlur={handleBlur}
          />
          <Button
            variant="outlined"
            className="w-2/5 ml-4"
            onClick={handleClick}
            disabled={count !== SECONDS}>
            {count === SECONDS ? "发送验证码" : count}
          </Button>
        </div>
        {ErrorMessage && ErrorMessage()}
      </>
    )
  },
)

VerifyCodeInput.displayName = "VerifyCodeInput"
export default VerifyCodeInput
