"use client"
import { Row, Col, Form, Input, Button } from "antd"
import { ToolOutlined, UserOutlined } from "@ant-design/icons"
import React from "react"
import useCountDown from "@/hooks/useCountDown"
import useDebounce from "@/hooks/useDebounce"

const rules = {
  phone: [
    { required: true, message: "请输入手机号" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入合法的手机号",
    },
  ],
  code: [{ required: true, message: "验证码" }],
}

export default function UsePhoneCode() {
  const { count, start } = useCountDown(60, () => {})
  const [phoneCodeData, setPhoneCodeData] = React.useState({
    phone: "",
    code: "",
  })

  //   提交
  const { run: onFinish } = useDebounce((values: any) => {
    console.log(values)
  })
  //   处理input value改变
  const handleChangeInput = (type: string, e: any) => {
    setPhoneCodeData((pre) => ({ ...pre, [type]: e.target.value.replace(/[^\d]/g, "") }))
  }
  //   点击发送验证码倒计时
  const { run: handleClickTime } = useDebounce(() => {
    start()
  })
  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name="phone" rules={rules.phone}>
          <Input
            className="h-40"
            prefix={<UserOutlined />}
            placeholder="请输入手机号"
            value={phoneCodeData.phone}
            onChange={(e: any) => handleChangeInput("phone", e)}
          />
        </Form.Item>
        <Form.Item name="code" rules={rules.code}>
          <Row>
            <Col span={17}>
              <Input
                className="h-40"
                prefix={<ToolOutlined />}
                placeholder="请输入验证码"
                value={phoneCodeData.code}
                onChange={(e: any) => handleChangeInput("code", e)}
              />
            </Col>
            <Col span={6} offset={1}>
              <Button
                className="w-full h-full plain_Btn"
                color="#0162B1"
                onClick={handleClickTime}
                disabled={count !== 60}>
                {count === 60 ? "发送验证码" : count}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-railway_blue w-full h-40 fill_Btn"
            type="primary"
            htmlType="submit"
            disabled={count !== 60}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
