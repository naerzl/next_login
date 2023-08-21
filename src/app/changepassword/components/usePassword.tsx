import { useForm, SubmitHandler, Controller } from "react-hook-form"
import React from "react"
import { Button } from "@mui/material"
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { reqPutModifyPassword } from "../api/index"
import PasswordInput from "@/components/PasswordInput"
import { ReqModifyPasswordParams } from "../types"
import { REGEXP_PASSWORD, STATUS_SUCCESS } from "@/libs/const"
import useSWRMutation from "swr/mutation"
import { ErrorMessage } from "@hookform/error-message"
import message from "antd-message-react"

export default function UsePassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      raw_password: "",
      password: "",
      checked_password: "",
    },
  })
  const { trigger: apiTrigger } = useSWRMutation("/user/modify/password", reqPutModifyPassword)
  const router = useRouter()

  const { run: onSubmit }: { run: SubmitHandler<ReqModifyPasswordParams> } = useDebounce(
    async (values: ReqModifyPasswordParams) => {
      apiTrigger(values).then((res) => {
        if (res.code !== STATUS_SUCCESS) return message.error("登录失败")
        message.success("登录成功")
        router.back()
      })
    },
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative pb-3.5">
        <Controller
          name="raw_password"
          control={control}
          rules={{
            required: "请输入原始密码",
          }}
          render={({ field }) => (
            <PasswordInput
              field={field}
              trigger={trigger}
              errors={errors.raw_password}
              id="change-raw-pasword"
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="raw_password"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute -bottom-5">{message}</p>
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
              id="change-pasword"
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute -bottom-5">{message}</p>
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
            validate: {
              value: (value, formValues: ReqModifyPasswordParams) => {
                return value === formValues.password || "两次密码不一致"
              },
            },
          }}
          name="checked_password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              field={field}
              trigger={trigger}
              errors={errors.checked_password}
              id="change-checked-pasword"
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="checked_password"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute -bottom-5">{message}</p>
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
