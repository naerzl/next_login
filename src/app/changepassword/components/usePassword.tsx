import { useForm, SubmitHandler, Controller } from "react-hook-form"
import React from "react"
import { Button } from "@mui/material"
import useDebounce from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"
import { reqPutModifyPassword } from "../api/route"
import PasswordInput from "@/components/PasswordInput"
import { ReqModifyPasswordParams } from "../types"
import { REGEXP_PASSWORD } from "@/libs/const"
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
  const router = useRouter()

  const { run: onSubmit }: { run: SubmitHandler<ReqModifyPasswordParams> } = useDebounce(
    async (values: ReqModifyPasswordParams) => {
      reqPutModifyPassword(values).then((res) => {
        if (res.code !== 2000) return
        debugger
        router.back()
      })
    },
  )
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="raw_password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <PasswordInput field={field} trigger={trigger} errors={errors.raw_password} />
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
          validate: (value, formValues: ReqModifyPasswordParams) => {
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
