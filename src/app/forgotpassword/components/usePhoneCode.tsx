import { useForm, SubmitHandler, Controller } from "react-hook-form"
import React from "react"
import { Button } from "@mui/material"
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { reqPutForgotPassword } from "../api/route"
import PasswordInput from "@/components/PasswordInput"
import UserNameInput from "@/components/UserNameInput"
import { ReqForgotPhoneCodeParams } from "../types"
import VerifyCodeInput from "./VerifyCodeInput"
import { REGEXP_PASSWORD } from "@/libs/const"
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
  const router = useRouter()

  const { run: onSubmit }: { run: SubmitHandler<ReqForgotPhoneCodeParams> } = useDebounce(
    async (values: ReqForgotPhoneCodeParams) => {
      reqPutForgotPassword(values).then((res) => {
        if (res.code !== 2000) return
        debugger
        router.back()
      })
    },
  )
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <UserNameInput field={field} trigger={trigger} errors={errors.phone} />
        )}
      />
      <Controller
        rules={{
          required: true,
        }}
        name="code"
        control={control}
        render={({ field }) => (
          <VerifyCodeInput
            field={field}
            trigger={trigger}
            errors={errors.code}
            getValues={getValues}
          />
        )}
      />
      <Controller
        rules={{
          required: true,
          pattern: REGEXP_PASSWORD,
        }}
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput field={field} trigger={trigger} errors={errors.password} />
        )}
      />
      <Controller
        rules={{
          required: true,
          validate: (value, formValues: ReqForgotPhoneCodeParams) => {
            return value === formValues.password
          },
        }}
        name="checked_password"
        control={control}
        render={({ field }) => (
          <PasswordInput field={field} trigger={trigger} errors={errors.checked_password} />
        )}
      />
      <Button variant="contained" type="submit" className="bg-railway_blue h-10" fullWidth>
        登录
      </Button>
    </form>
  )
}
