import { reqChangePasswordWidthPwd } from "../api"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import useDebounce from "@/hooks/useDebounce"
import { ReqChangePasswordParams } from "@/types/api"
import PasswordInput from "@/components/PasswordInput"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation"
import { getCookie } from "@/libs/cookies"
import { REGEXP_PASSWORD } from "@/libs/const"
import useSWRMutaion from "swr/mutation"
import { getV1BaseURL } from "@/libs/fetch"
import { ErrorMessage } from "@hookform/error-message"

const AUTH2PATHFROM = process.env.NEXT_PUBLIC_OAUTH2_PATHNAME_FROM as string

export default function UsePassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<ReqChangePasswordParams>({
    defaultValues: {
      checked_password: "",
      password: "",
    },
  })

  const { trigger: apiTrigger } = useSWRMutaion(
    getV1BaseURL("/user/first/change_password"),
    reqChangePasswordWidthPwd,
  )
  const router = useRouter()

  // 加上防抖的提交事件
  const { run: onSubmit }: { run: SubmitHandler<ReqChangePasswordParams> } = useDebounce(
    (values) => {
      apiTrigger(values).then((res) => {
        if (res.code !== 2000) return
        router.push(getCookie(AUTH2PATHFROM) as string)
      })
    },
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "请输入密码",
            pattern: {
              value: REGEXP_PASSWORD,
              message: "数字、大写字母、小写字母以及特殊符号需要涵盖2项以上",
            },
          }}
          render={({ field }) => (
            <PasswordInput
              field={field}
              trigger={trigger}
              errors={errors.password}
              id="first-change-password"
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <p className="text-railway_error text-sm">{message}</p>}
                />
              )}
            />
          )}
        />
        <Controller
          rules={{
            required: true,
            validate: (value, formValues: ReqChangePasswordParams) => {
              return value === formValues.password || "两次密码输入不一致"
            },
          }}
          name="checked_password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              field={field}
              trigger={trigger}
              errors={errors.checked_password}
              id="first-change-checked-password"
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="checked_password"
                  render={({ message }) => <p className="text-railway_error text-sm">{message}</p>}
                />
              )}
            />
          )}
        />
        <Button variant="contained" type="submit" className="bg-railway_blue h-10" fullWidth>
          修改密码
        </Button>
      </form>
    </>
  )
}
