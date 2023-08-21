import { useForm, SubmitHandler, Controller } from "react-hook-form"
import React from "react"
import { Button } from "@mui/material"
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { reqPutForgotPassword } from "../api"
import PasswordInput from "@/components/PasswordInput"
import UserNameInput from "@/components/UserNameInput"
import { ReqForgotPhoneCodeParams } from "../types"
import VerifyCodeInput from "./VerifyCodeInput"
import { REGEXP_PASSWORD, REGEXP_PHONE, STATUS_SUCCESS } from "@/libs/const"
import useSWRMutation from "swr/mutation"
import { ErrorMessage } from "@hookform/error-message"
import message from "antd-message-react"

export default function UsePhoneCode() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm({
    defaultValues: {
      phone: "",
      code: "",
      password: "",
      checked_password: "",
    },
  })

  // swrapi
  const { trigger: apiTrigger } = useSWRMutation("/user/forgot/password", reqPutForgotPassword)
  const router = useRouter()

  // 调用api
  const { run: onSubmit }: { run: SubmitHandler<ReqForgotPhoneCodeParams> } = useDebounce(
    async (values: ReqForgotPhoneCodeParams) => {
      apiTrigger(values).then((res) => {
        if (res.code !== STATUS_SUCCESS) return message.error("操作失败")
        message.success("操作成功")
        router.back()
      })
    },
  )
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative pb-3.5">
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "请输入手机号",
            pattern: {
              value: REGEXP_PHONE,
              message: "手机号格式不正确",
            },
          }}
          render={({ field }) => (
            <UserNameInput
              field={field}
              trigger={trigger}
              errors={errors.phone}
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="phone"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute -bottom-5 left-0">
                      {message}
                    </p>
                  )}
                />
              )}
            />
          )}
        />
      </div>
      <div className="relative pb-3.5">
        <Controller
          rules={{
            required: "请输入验证码",
          }}
          name="code"
          control={control}
          render={({ field }) => (
            <VerifyCodeInput
              field={field}
              trigger={trigger}
              errors={errors.code}
              getValues={getValues}
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="code"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute bottom-2.5 left-0">
                      {message}
                    </p>
                  )}
                />
              )}
            />
          )}
        />
      </div>
      <div className="relative pb-3.5">
        <Controller
          rules={{
            required: "请输入密码",
            pattern: {
              value: REGEXP_PASSWORD,
              message: "数字、大写字母、小写字母以及特殊符号需要涵盖2项以上",
            },
          }}
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              field={field}
              trigger={trigger}
              errors={errors.password}
              id="forgot-password"
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute -bottom-5 left-0">
                      {message}
                    </p>
                  )}
                />
              )}
            />
          )}
        />
      </div>

      <div className="relative pb-3.5">
        <Controller
          rules={{
            required: true,
            validate: (value, formValues: ReqForgotPhoneCodeParams) => {
              return value === formValues.password || "两次密码不正确"
            },
          }}
          name="checked_password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              field={field}
              trigger={trigger}
              errors={errors.checked_password}
              id="forgot-checked-password"
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="checked_password"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute -bottom-5 left-0">
                      {message}
                    </p>
                  )}
                />
              )}
            />
          )}
        />
      </div>
      <Button variant="contained" type="submit" className="bg-railway_blue h-10" fullWidth>
        登录
      </Button>
    </form>
  )
}
