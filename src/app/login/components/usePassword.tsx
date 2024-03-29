import { useForm, SubmitHandler, Controller } from "react-hook-form"
import React, { Suspense } from "react"
import { Button, Checkbox, FormHelperText } from "@mui/material"
import useDebounce from "@/hooks/useDebounce"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginWithPasswordClass } from "@/class"
import { reqLoginWithPassword } from "../api"
import PasswordInput from "@/components/PasswordInput"
import UserNameInput from "@/components/UserNameInput"
import Link from "next/link"
import {
  LOGIN_ACCOUNT,
  LOGIN_PASSWORD,
  LOGIN_PHONE,
  REGEXP_PHONE,
  STATUS_SUCCESS,
} from "@/libs/const"
import useSWRMutaion from "swr/mutation"
import { ErrorMessage } from "@hookform/error-message"
import message from "antd-message-react"
import "antd-message-react/dist/index.css"

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
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      protocol: "1",
    },
  })

  const { trigger: loginTrigger } = useSWRMutaion("/login", reqLoginWithPassword)
  const router = useRouter()
  const search = useSearchParams()

  const { run: onSubmit }: { run: SubmitHandler<IFormInput> } = useDebounce(
    async (values: IFormInput) => {
      try {
        // 判断是否勾选协议
        if (values.protocol !== true) return message.error("请勾选协议")

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
          // 调用登录SWR接口
          const res = await loginTrigger(searchObj)
          if (res.code !== STATUS_SUCCESS) return message.error(res.msg)
          console.log(res.data.location)
          message.success("登录成功")
          localStorage.removeItem(LOGIN_ACCOUNT)
          localStorage.removeItem(LOGIN_PASSWORD)
          localStorage.removeItem(LOGIN_PHONE)
          // const statements: XapiType = new XapiStatementsClass({
          //   actor:
          //     process.env.NEXT_PUBLIC_OAUTH_ORIGIN + "/user/" + "c25b6963edb8488883d7d8441c0fb549",
          //   object: "http://activitystrea.ms/schema/1.0/application",
          //   verb: LrsXapiVerbs.AUTHORIZE,
          // })
          // oAuth1SendStatement(statements)
          router.push(res.data.location + `&is_first_login=${res.data.is_first_login}`)
        }
      } catch (e) {
        console.log(e)
      }
    },
  )

  React.useEffect(() => {
    setValue("username", localStorage.getItem(LOGIN_ACCOUNT) ?? "")
    setValue("password", localStorage.getItem(LOGIN_PASSWORD) ?? "")
    return () => {
      localStorage.setItem(LOGIN_ACCOUNT, getValues("username"))
      localStorage.setItem(LOGIN_PASSWORD, getValues("password"))
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative pb-3.5 phone:pb-10">
        <Controller
          name="username"
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
              errors={errors.username}
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="username"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute -bottom-5 left-0 phone:-bottom-6 phone:text-base">
                      {message}
                    </p>
                  )}
                />
              )}
            />
          )}
        />
      </div>
      <div className="relative pb-3.5 phone:pb-10">
        <Controller
          rules={{ required: "请输入密码" }}
          name="password"
          control={control}
          render={({ field }) => (
            <PasswordInput
              field={field}
              trigger={trigger}
              errors={errors.password}
              id="login-password"
              ErrorMessage={() => (
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <p className="text-railway_error text-sm absolute -bottom-5 left-0 phone:-bottom-6 phone:text-base">
                      {message}
                    </p>
                  )}
                />
              )}
            />
          )}
        />
      </div>
      <div className="flex justify-between text-sm text-railway_blue phone:text-2xl">
        <Link href="/forgotpassword">忘记密码?</Link>
      </div>
      <Controller
        rules={{ required: true }}
        name="protocol"
        control={control}
        render={({ field }) => {
          return (
            <>
              <div className="text-sm flex items-center mt-2 pb-5 relative phone:mt-6 phone:text-2xl ">
                <Checkbox {...field} id="checkbox" size="small" className="p-0" />
                <span className="text-railway_gray">
                  我同意
                  <Link href="/term-of-service" className="hover:text-railway_blue">
                    《服务条款》
                  </Link>
                  和
                  <Link href="/privacy-policy" className="hover:text-railway_blue">
                    《隐私政策》
                  </Link>
                </span>
                {!field.value && (
                  <FormHelperText error id="checkbox" className="absolute bottom-0">
                    请勾选服务条款和隐私政策
                  </FormHelperText>
                )}
              </div>
            </>
          )
        }}
      />
      <Button
        variant="contained"
        type="submit"
        className="bg-railway_blue h-10 phone:h-14 phone:text-xl"
        fullWidth>
        登录
      </Button>
    </form>
  )
}
