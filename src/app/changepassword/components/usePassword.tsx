import { Form, Input, Button } from "antd"
import { LockOutlined } from "@ant-design/icons"
import { reqChangePasswordWidthPwd } from "../api/route"

const rules = {
  checkPassword: [
    { required: true, message: "请输入密码" },
    {
      pattern: /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![!#$%^&*]+$)[\da-zA-z!#$%^&*]{6,8}$/,
      message: "数字、大写字母、小写字母以及特殊符号组成的6-8位(涵盖2项即可)",
      validateTrigger: ["onBlur"],
    },
  ],
}
export default function UsePassword() {
  const onFinish = (value: any) => {
    reqChangePasswordWidthPwd(value).then((res) => {})
  }

  return (
    <>
      <Form onFinish={onFinish}>
        <Form.Item name="password">
          <Input.Password className="h-10" prefix={<LockOutlined />} placeholder="请输入旧密码" />
        </Form.Item>
        <Form.Item name="checked_password" rules={rules.checkPassword} validateTrigger={["onBlur"]}>
          <Input.Password className="h-10" prefix={<LockOutlined />} placeholder="请输入新密码" />
        </Form.Item>
        <Button className="bg-railway_blue w-full h-10" type="primary" htmlType="submit">
          Edit
        </Button>
      </Form>
    </>
  )
}
