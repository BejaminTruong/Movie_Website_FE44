import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";
import React, { useState } from "react";
import { dangNhapAction } from "redux/actions/QuanLyNguoiDungAction";
import { useDispatch, useSelector } from "react-redux";
export const Login = (props) => {
  const propNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  const [stateUser, setUser] = useState({ taiKhoan: "", matKhau: "" });
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(dangNhapAction(stateUser));
    props.history.replace("/home");
  };
  const handleChange = (event) => {
    let { name, value } = event.target;
    setUser({ ...stateUser, [name]: value });
  };
  return (
    <Form
      name="normal_login"
      className="loginForm"
      initialValues={{
        remember: false,
      }}
      onFinish={handleSubmit}
    >
      <h1>
        {propNguoiDung.taiKhoan ? `Hi ${propNguoiDung.taiKhoan}` : "Login"}
      </h1>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          onChange={handleChange}
          name="taiKhoan"
          allowClear
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input.Password
          onChange={handleChange}
          name="matKhau"
          allowClear
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
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
