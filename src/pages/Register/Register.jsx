import React from "react";
import { Form, Input, Button } from "antd";
import "./Register.scss";
import { qlNguoiDungService } from "services/QuanLyNguoiDungService";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export const Register = () => {
  const [form] = Form.useForm();
  const handleSubmit = ({ taiKhoan, matKhau, email, soDt, hoTen }) => {
    // let { taiKhoan, matKhau, email, soDt, hoTen } = values;
    const registerUser = {
      taiKhoan,
      matKhau,
      email,
      soDt,
      maNhom: "GP01",
      maLoaiNguoiDung: "KhachHang",
      hoTen,
    };
    qlNguoiDungService.dangKyService(registerUser);
  };
  return (
    <Form
      form={form}
      {...formItemLayout}
      name="register"
      className="registerForm"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="taiKhoan"
        label="User Name"
        rules={[{ required: true, message: "Please input your User Name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            pattern:
              "^[a-z][a-z0-9_.]{5,32}@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="matKhau"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("matKhau") === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                "The two passwords that you entered do not match!"
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="soDt"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="hoTen"
        label="Full Name"
        rules={[
          {
            required: true,
            message: "Please input your Full Name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
