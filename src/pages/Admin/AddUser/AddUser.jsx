import { Typography } from "antd";
import { Form, Button, Input, Select, message } from "antd";
import React from "react";
import { qlNguoiDungService } from "../../../services/QuanLyNguoiDungService";
const { Title } = Typography;
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
      offset: 2,
    },
    md: {
      span: 20,
      offset: 0,
    },
  },
};

export const AddUser = () => {
  const [form] = Form.useForm();
  const handleAddUser = () => {
    let userInfo = { ...form.getFieldsValue(), maNhom: "GP06" };
    qlNguoiDungService
      .themNguoiDung(userInfo)
      .then((res) => {
        console.log(res.data);
        message.success("Update Successfully!");
        form.resetFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Title style={{ textAlign: "center" }} level={1}>
        Thêm Người Dùng
      </Title>
      <Form
        labelAlign="left"
        size="large"
        form={form}
        {...formItemLayout}
        name="register"
      >
        <Form.Item
          name="taiKhoan"
          label="User Name"
          rules={[{ required: true, message: "Please input your User Name" }]}
          hasFeedback
        >
          <Input allowClear />
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
          <Input.Password allowClear />
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
          hasFeedback
        >
          <Input allowClear/>
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
          hasFeedback
        >
          <Input allowClear/>
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
          hasFeedback
        >
          <Input allowClear/>
        </Form.Item>
        <Form.Item
          name="maLoaiNguoiDung"
          label="User Type"
          rules={[
            {
              required: true,
            },
          ]}
          hasFeedback
        >
          <Select defaultValue="KhachHang" placeholder="Select User Type">
            <Option value="KhachHang">Khách Hàng</Option>
            <Option value="QuanTri">Quản Trị</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleAddUser} type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
