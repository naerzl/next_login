import { reqGetPhoneCode } from "@/app/login/api/route"
import useCountDown from "@/hooks/useCountDown"
import { REGEXP_PHONE } from "@/libs/const"
import { Button, TextField } from "@mui/material"
import React from "react"
const SECONDS = 60
const VerifyCodeInput = React.forwardRef(function (
  props: { field?: any; trigger?: any; errors?: any; getValues?: any; callback?: any },
  ref,
) {
  const { count, start } = useCountDown(SECONDS, () => {})
  const { field, getValues, errors, trigger } = props
  const handleClick = () => {
    trigger("phone")
    if (REGEXP_PHONE.test(getValues("phone"))) {
      start()
      reqGetPhoneCode(getValues("phone"))
        .then((res) => {
          if (res.code !== 2000) return
          console.log(`code=${res.data.code}`)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
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
})

VerifyCodeInput.displayName = "VerifyCodeInput"
export default VerifyCodeInput
