import { Form, Input, Button, Checkbox, message } from "antd"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import useDebounce from "@/hooks/useDebounce"
import { useRouter, useSearchParams } from "next/navigation"
import { reqLoginWithPassword } from "../api/route"
import { ReqLoginParams } from "../../../types/api"

export default function UsePassword() {
  // @ts-ignore
  const router = useRouter()
  const search = useSearchParams()

  const { run: onFinish } = useDebounce(async (values) => {
    if (search.has("redirect_uri")) {
      let searchObj: ReqLoginParams = {
        client_id: "",
        code_challenge: "",
        code_challenge_method: "",
        password: values.password,
        redirect_uri: "",
        response_type: "",
        scope: "",
        state: "",
        username: values.username,
      }
      search.forEach((value, key) => {
        // @ts-ignore
        searchObj[key] = value
      })
      reqLoginWithPassword(searchObj).then((res) => {
        console.log(res.data)
        message.success("success")
        if (res.data.is_first_login) {
          router.push(
            `/changepassword?${res.data.location.slice(res.data.location.indexOf("?") + 1)}`,
          )
        }
      })
    }
  })
  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item name="username">
          <Input className="h-40" prefix={<UserOutlined />} placeholder="请输入账号" />
        </Form.Item>
        <Form.Item name="password">
          <Input.Password className="h-40" prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="potocol"
          valuePropName="checked"
          rules={[
            {
              validator(_, value) {
                return value ? Promise.resolve() : Promise.reject(new Error("请勾选协议"))
              },
            },
          ]}>
          <div className="flex justify-between items-center">
            <Checkbox>Remember me</Checkbox>
            <Button type="link">Forgot password?</Button>
          </div>
        </Form.Item>
        <Button className="bg-railway_blue w-full h-40" type="primary" htmlType="submit">
          Login
        </Button>
      </Form>
    </>
  )
}
