import { useForm, SubmitHandler, Controller } from "react-hook-form"
import React from "react"
import { Button } from "@mui/material"
import useDebounce from "@/hooks/useDebounce"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginWithPhoneClass } from "@/class"
import { reqLoginWithPhone } from "../api/route"
import UserNameInput from "@/components/UserNameInput"
import VerifyCodeInput from "@/app/login/components/VerifyCodeInput"
import { REGEXP_PHONE } from "@/libs/const"
interface IFormInput {
  phone: string
  code: string
}

export default function UsePhoneCode() {
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      code: "",
    },
  })
  const router = useRouter()
  const search = useSearchParams()

  const { run: onSubmit }: { run: SubmitHandler<IFormInput> } = useDebounce((values) => {
    if (search.has("redirect_uri")) {
      let searchObj = new LoginWithPhoneClass({ phone: values.phone, code: values.code })
      search.forEach((value, key) => {
        // @ts-ignore
        searchObj[key] = value
      })
      reqLoginWithPhone(searchObj).then((res) => {
        if (res.code !== 2000) return
        debugger
        router.push(res.data.location + `&is_first_login=${res.data.is_first_login}`)
      })
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="phone"
        control={control}
        rules={{ required: true, pattern: REGEXP_PHONE }}
        render={({ field }) => (
          <UserNameInput field={field} trigger={trigger} errors={errors.phone} />
        )}
      />
      <Controller
        rules={{ required: true }}
        name="code"
        control={control}
        render={({ field }) => (
          <VerifyCodeInput
            field={field}
            getValues={getValues}
            trigger={trigger}
            errors={errors.code}
          />
        )}
      />

      <Button variant="contained" type="submit" className="bg-railway_blue h-10" fullWidth>
        登录
      </Button>
    </form>
  )
}
