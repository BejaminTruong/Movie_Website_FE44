import React, { useState, useEffect } from "react";
import axios from "axios";
import { domain } from "configs/setting";
import { userLogin, accessToken } from "configs/setting";
import { dang_nhap } from "redux/types/QuanLyNguoiDungType";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useLocation, useHistory } from "react-router-dom";
export const Login = () => {
  const dispatch = useDispatch();
  const [logInStatus, setLogInStatus] = useState("");
  const propsNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  const checkValidateStatus = () => {
    if (logInStatus === "failed") {
      return "error";
    }
  };
  const checkHelp = () => {
    if (logInStatus === "failed") {
      return "Wrong UserName or Password";
    }
  };
  const dangNhapAction = (thongTinDangNhap) => {
    return (dispatch) => {
      (async () => {
        try {
          const result = await axios({
            method: "post",
            url: `${domain}/api/quanlynguoidung/dangnhap`,
            data: thongTinDangNhap,
          });
          localStorage.setItem(userLogin, JSON.stringify(result.data));
          localStorage.setItem(
            accessToken,
            JSON.stringify(result.data.accessToken)
          );
          dispatch({
            type: dang_nhap,
            nguoiDung: result.data,
          });
          console.log(result.data);
          setLogInStatus("success");
          message.destroy(1);
        } catch (error) {
          console.log(error.response.data);
          setLogInStatus("failed");
        }
      })();
    };
  };
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/admin" } };
  useEffect(() => {
    if (logInStatus === "success") {
      message
        .success("Login Successfully!",1)
        .then(() => message.info(`Welcom back ${propsNguoiDung.taiKhoan}`,2));
      console.log(propsNguoiDung.maLoaiNguoiDung);
      if (propsNguoiDung.maLoaiNguoiDung === "QuanTri") history.replace(from);
      else history.push("/home");
    }
  }, [logInStatus]);
  return (
    <Form
      name="normal_login"
      className="loginForm"
      initialValues={{
        remember: false,
      }}
      onFinish={(values) => {
        message.loading({
          content:"Action in progress...",
          key: 1,
        });
        dispatch(dangNhapAction(values));
      }}
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
