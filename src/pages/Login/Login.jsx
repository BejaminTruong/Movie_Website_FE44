import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";
import React, { useEffect, useLayoutEffect } from "react";
import { dangNhapAction } from "redux/actions/QuanLyNguoiDungAction";
import { useDispatch, useSelector } from "react-redux";
export const Login = (props) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.QuanLyNguoiDungReducer.status);

  useLayoutEffect(()=>{
    document.getElementById("footer").style.position = "absolute";
    document.getElementById("footer").style.bottom="0";
    document.getElementById("footer").style.left="0";
    document.getElementById("footer").style.right="0";
  })

  const checkValidateStatus = () => {
    if (status === "success") {
      return "success";
    }
    if (status === "error") {
      return "error";
    }
  };
  const checkHelp = () => {
    if (status === "error") {
      return "Wrong UserName or Password";
    }
  };
  const handleSubmit = (values) => {
    dispatch(dangNhapAction(values));
  };
  useEffect(() => {
    if (status === "success") {
      props.history.replace("/home");
    }
  });

  return (
    <Form
      name="normal_login"
      className="loginForm"
      initialValues={{
        remember: false,
      }}
      onFinish={handleSubmit}
    >
      <Form.Item
        help={checkHelp()}
        validateStatus={checkValidateStatus()}
        hasFeedback
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          allowClear
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        help={checkHelp()}
        validateStatus={checkValidateStatus()}
        hasFeedback
        name="matKhau"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          allowClear
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/login">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
  );
};
