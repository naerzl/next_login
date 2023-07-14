import { useForm, SubmitHandler, Controller } from "react-hook-form"
import React from "react"
import { Button, Checkbox, FormHelperText } from "@mui/material"
import useDebounce from "@/hooks/useDebounce"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginWithPasswordClass } from "@/class"
import { reqLoginWithPassword } from "../api/route"
import PasswordInput from "@/components/PasswordInput"
import UserNameInput from "@/components/UserNameInput"
import Link from "next/link"
import { REGEXP_PHONE } from "@/libs/const"
interface IFormInput {
  username: string
  password: string
  protocol: string | boolean
}
export default function UsePassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      protocol: "1",
    },
  })
  const router = useRouter()
  const search = useSearchParams()

  const { run: onSubmit }: { run: SubmitHandler<IFormInput> } = useDebounce(
    async (values: IFormInput) => {
      // 判断是否勾选协议
      if (values.protocol !== true) return
      // 判断路径查询参数有没有
      if (search.has("redirect_uri")) {
        let searchObj = new LoginWithPasswordClass({
          password: values.password,
          username: values.username,
        })
        search.forEach((value, key) => {
          // @ts-ignore
          searchObj[key] = value
        })
        const res = await reqLoginWithPassword(searchObj)
        if (res.code !== 2000) return
        router.push(res.data.location + `&is_first_login=${res.data.is_first_login}`)
      }
    },
  )
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        rules={{ required: true, pattern: REGEXP_PHONE }}
        render={({ field }) => (
          <UserNameInput field={field} trigger={trigger} errors={errors.username} />
        )}
      />
      <Controller
        rules={{ required: true }}
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordInput field={field} trigger={trigger} errors={errors.password} />
        )}
      />
      <div className="flex justify-between text-sm text-railway_blue my-1">
        <Link href="/forgotpassword">忘记密码?</Link>
      </div>
      <Controller
        rules={{ required: true }}
        name="protocol"
        control={control}
        render={({ field }) => {
          return (
            <>
              <div className="mb-2">
                <Checkbox {...field} id="checkbox" />
                <span className="text-railway_gray">
                  勾选
                  <Link href="/term-of-service" className="hover:text-railway_blue">
                    《服务条款》
                  </Link>
                  和
                  <Link href="/privacy-policy" className="hover:text-railway_blue">
                    《隐私政策》
                  </Link>
                </span>
              </div>
              {!field.value && (
                <FormHelperText error id="checkbox">
                  请勾选服务条款和隐私政策
                </FormHelperText>
              )}
            </>
          )
        }}
      />
      <Button variant="contained" type="submit" className="bg-railway_blue h-10" fullWidth>
        登录
      </Button>
    </form>
  )
}
