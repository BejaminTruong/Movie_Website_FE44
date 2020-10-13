import { DatePicker, InputNumber, Typography } from "antd";
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

export const FormMovie = () => {
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
        Thông tin phim
      </Title>
      <Form labelAlign="left" size="large" form={form} {...formItemLayout} name="register">
        <Form.Item
          name="maPhim"
          label="Mã Phim"
          rules={[{ required: true, message: "Please input your mã phim" }]}
          hasFeedback
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="tenPhim"
          label="Movies'name"
          rules={[
            {
              required: true,
              message: "Please input your movies'name!",
            },
          ]}
          hasFeedback
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="biDanh"
          label="Aliases"
          rules={[
            {
              required: true,
              message: "Please input aliases",
            },
          ]}
          hasFeedback
        >
          <Input allowClear/>
        </Form.Item>

        <Form.Item
          name="trailer"
          label="Trailer"
          rules={[
            {
              required: true,
              message: "Please input trailer!",
            },
          ]}
          hasFeedback
        >
          <Input allowClear/>
        </Form.Item>
        <Form.Item
          name="hinhAnh"
          label="Image"
          rules={[
            {
              required: true,
              message: "Please input your images' link!",
            },
          ]}
          hasFeedback
        >
          <Input allowClear/>
        </Form.Item>
        <Form.Item
          name="maNhom"
          label="IDs' group"
          rules={[
            {
              required: true,
              message: "Please input your IDs' group!",
            },
          ]}
          hasFeedback
        >
          <Input allowClear/>
        </Form.Item>
        <Form.Item
          name="moTa"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input your Description!",
            },
          ]}
          hasFeedback
        >
          <Input allowClear/>
        </Form.Item>
        <Form.Item
          name="ngayKhoiChieu"
          label="Launch date"
          rules={[
            {
              required: true,
              message: "Please input your launch date!",
            },
          ]}
          hasFeedback
        >
          <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" />
        </Form.Item>
        <Form.Item name="danhGia" label="Evaluate" rules={[{required: true,message: "Please input your Evaluate!",}]} hasFeedback >
            <InputNumber min={1} max={10} />
        </Form.Item>
        <Form.Item>
          <Button onClick={handleAddUser} type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
