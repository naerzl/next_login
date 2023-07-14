import { reqChangePasswordWidthPwd } from "../api/route"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import useDebounce from "@/hooks/useDebounce"
import { ReqChangePasswordParams } from "@/types/api"
import PasswordInput from "@/components/PasswordInput"
import { Button } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"
import { getCookie } from "@/libs/cookies"
import { REGEXP_PASSWORD } from "@/libs/const"
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
  const router = useRouter()
  const params = useSearchParams()
  const { run: onSubmit }: { run: SubmitHandler<ReqChangePasswordParams> } = useDebounce(
    (values) => {
      reqChangePasswordWidthPwd(values, params.get("code") as string).then((res) => {
        if (res.code !== 2000) return
        debugger
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
            required: true,
            pattern: REGEXP_PASSWORD,
          }}
          render={({ field }) => (
            <PasswordInput field={field} trigger={trigger} errors={errors.password} />
          )}
        />
        <Controller
          rules={{
            required: true,
            validate: (value, formValues: ReqChangePasswordParams) => {
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
          修改密码
        </Button>
      </form>
    </>
  )
}
