"use client"
import { Row, Col, Form, Input, Button } from "antd"
import { ToolOutlined, UserOutlined, LockOutlined } from "@ant-design/icons"
import React from "react"
import useCountDown from "@/hooks/useCountDown"
import { useDebounceFn } from "ahooks"

const rules = {
  phone: [
    { required: true, message: "请输入手机号" },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: "请输入合法的手机号",
    },
  ],
  code: [{ required: true, message: "请输入验证码" }],
  checkPassword: [
    { required: true, message: "请输入密码" },
    {
      pattern: /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![!#$%^&*]+$)[\da-zA-z!#$%^&*]{6,8}$/,
      message: "数字、大写字母、小写字母以及特殊符号组成的6-8位(涵盖2项即可)",
    },
  ],
}

const SECONDS = 60
export default function UsePhoneCode() {
  const { count, start } = useCountDown(SECONDS, () => {})

  //   提交
  const { run: onFinish } = useDebounceFn((values: any) => {}, {
    wait: 500,
  })

  //   点击发送验证码倒计时
  const { run: handleClickTime } = useDebounceFn(
    () => {
      start()
    },
    { wait: 500 },
  )
  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name="phone" rules={rules.phone}>
          <Input className="h-10" prefix={<UserOutlined />} placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item name="code" rules={rules.code}>
          <Row>
            <Col span={17}>
              <Input className="h-10" prefix={<ToolOutlined />} placeholder="请输入验证码" />
            </Col>
            <Col span={6} offset={1}>
              <Button
                className="w-full h-full plain_Btn"
                color="#0162B1"
                onClick={handleClickTime}
                disabled={count !== SECONDS}>
                {count === SECONDS ? "发送验证码" : count}
              </Button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name="password">
          <Input.Password className="h-10" prefix={<LockOutlined />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item name="checkPassword" rules={rules.checkPassword}>
          <Input.Password className="h-10" prefix={<LockOutlined />} placeholder="请再次输入密码" />
        </Form.Item>
        <Form.Item>
          <Button
            className="bg-railway_blue w-full h-10 fill_Btn"
            type="primary"
            htmlType="submit"
            disabled={count !== SECONDS}>
            Edit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
