import { useForm, SubmitHandler, Controller } from "react-hook-form"
import React from "react"
import { Button } from "@mui/material"
import useDebounce from "@/hooks/useDebounce"
import { useRouter, useSearchParams } from "next/navigation"
import { LoginWithPhoneClass } from "@/class"
import { reqLoginWithPhone } from "../api"
import UserNameInput from "@/components/UserNameInput"
import VerifyCodeInput from "@/app/login/components/VerifyCodeInput"
import {
  LOGIN_ACCOUNT,
  LOGIN_PASSWORD,
  LOGIN_PHONE,
  REGEXP_PHONE,
  STATUS_SUCCESS,
} from "@/libs/const"
import useSWRMutation from "swr/mutation"
import { ErrorMessage } from "@hookform/error-message"
import message from "antd-message-react"

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
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      phone: "",
      code: "",
    },
  })

  const { trigger: LoginWithPhoneTrigger } = useSWRMutation("/login/phone", reqLoginWithPhone)
  const router = useRouter()
  const search = useSearchParams()

  const { run: onSubmit }: { run: SubmitHandler<IFormInput> } = useDebounce((values) => {
    if (search.has("redirect_uri")) {
      let searchObj = new LoginWithPhoneClass({ phone: values.phone, code: values.code })
      search.forEach((value, key) => {
        // @ts-ignore
        searchObj[key] = value
      })
      // 调用SWR接口
      LoginWithPhoneTrigger(searchObj).then((res) => {
        if (res.code !== STATUS_SUCCESS) return message.error("登录失败")
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
      })
    }
  })

  React.useEffect(() => {
    setValue("phone", localStorage.getItem(LOGIN_PHONE) ?? "")
    return () => {
      localStorage.setItem(LOGIN_PHONE, getValues("phone"))
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative pb-3.5 phone:pb-10">
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
                    <p className="text-railway_error text-sm absolute -bottom-5 left-0 phone:-bottom-6">
                      {message}
                    </p>
                  )}
                />
              )}
            />
          )}
        />
      </div>
      <div className="relative pb-3.5 phone:mb-16 mb-6">
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
      </div>

      <Button
        variant="contained"
        type="submit"
        className="bg-railway_blue h-10 phone:h-14"
        fullWidth>
        登录
      </Button>
    </form>
  )
}
