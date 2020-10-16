import React from "react";
import moment from "moment";
import {
  DatePicker,
  Typography,
  notification,
  InputNumber,
  Upload,
} from "antd";
import { Form, Button, Input } from "antd";
import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import { useState } from "react";
import { isInteger } from "lodash";

const { Title } = Typography;

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
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const openNotificationWithIcon = (type, des) => {
    notification[type]({
      message: "Thông Báo",
      description: des,
    });
  };

  const onFinish = (values) => {
    const formValue = {
      ...values,
      ngayKhoiChieu: values["ngayKhoiChieu"].format("DD/MM/YYYY"),
      hinhAnh: fileList[0].name,
      trailer: values["trailer"] ? values["trailer"] : "",
    };

    quanLyPhimService 
      .ThemPhim(formValue)
      .then((res) => {
        let frm = new FormData();
        frm.append("File", fileList[0].originFileObj, fileList[0].name);
        frm.append("tenphim", values["tenPhim"]);
        frm.append("manhom", values["maNhom"]);
        quanLyPhimService
          .upLoadHinhAnhPhim(frm)
          .then((res) => {
            form.resetFields();
            openNotificationWithIcon("success", `Add movie successfully!`);
          })
          .catch((error) => {
            openNotificationWithIcon("error", error.response.data);
          });
      })
      .catch((error) => {
        openNotificationWithIcon("error", error.response.data);
      });
  };

  return (
    <>
      <Title style={{ textAlign: "center" }} level={1}>
        Thông tin phim
      </Title>
      <Form
        form={form}
        labelAlign="left"
        size="large"
        {...formItemLayout}
        onFinish={onFinish}
        name="register"
        scrollToFirstError
      >
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
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="trailer"
          label="Trailer"
          rules={[
            { required: true, message: "Please input movies' trailer !" },
          ]}
          hasFeedback
        >
          <Input allowClear />
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
          <Input allowClear />
        </Form.Item>
        <Form.Item
          initialValue={moment()}
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
          <DatePicker showToday format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item
          name="danhGia"
          initialValue={1}
          label="Evaluate"
          rules={[
            { required: true, message: "Please input your Evaluate !" },
            () => ({
              validator(rule, value) {
                if (!value || isInteger(value)) {
                  return Promise.resolve();
                }

                return Promise.reject("Evaluate is not a valid integer!");
              },
            }),
          ]}
          hasFeedback
        >
          <InputNumber min={0} max={10} allowClear />
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
          <Input.TextArea rows={10} allowClear />
        </Form.Item>
        <Form.Item
          name="hinhAnh"
          label="Images"
          rules={[
            {
              required: true,
              message: "Please input your image!",
            },
          ]}
          hasFeedback
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
