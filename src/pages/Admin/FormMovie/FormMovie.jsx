import React from "react";
import { DatePicker, InputNumber, Typography,notification } from "antd";
import { Form, Button, Input } from "antd";
import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import ImageUploader from 'react-images-upload';
import { useState } from "react";

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

  let [pictures,setPictures] = useState({});

  const onDrop = (picture) => {
    setPictures(picture)
  }
  const openNotificationWithIcon = (type,des) => {
    notification[type]({
      message: 'Thông Báo',
      description:
        des,
    });
  };

  const onFinish = (values) => {
    const formValue = { ... values,
      ngayKhoiChieu: values["ngayKhoiChieu"].format("DD/MM/YYYY"),
      hinhAnh: pictures[0].name,
      trailer: values["trailer"] ? values["trailer"] : ""
    }
    
    quanLyPhimService.ThemPhim(formValue)
    .then(res=> {
      return res.data
    })
    .then((item)=>{
      if(item){
        let frm = new FormData();
        frm.append('File',pictures[0],pictures[0].name);
        frm.append('tenphim',values["tenPhim"]);
        frm.append('manhom',values["maNhom"])
        quanLyPhimService.upLoadHinhAnhPhim(frm).then(res=>{
          console.log(res.data)
          openNotificationWithIcon('success','Add movie successfully !');
        }).catch(error=> openNotificationWithIcon('error',error.response.data))
      }
    })
    .catch(error=> openNotificationWithIcon('error',error.response.data))
  };


  return (
    <>
      <Title style={{ textAlign: "center" }} level={1}>
        Thông tin phim
      </Title>
      <Form labelAlign="left" size="large" {...formItemLayout} onFinish={onFinish} name="register">
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
          <DatePicker showTime format="DD-MM-YYYY" />
        </Form.Item>
        <Form.Item name="danhGia" label="Evaluate" rules={[{required: true,message: "Please input your Evaluate!",}]} hasFeedback >
            <InputNumber min={1} max={10} />
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
          <Input.TextArea rows={10} allowClear/>
        </Form.Item>
        <Form.Item name="hinhAnh" label="Images"  rules={[
            {
              required: true,
              message: "Please input your image!",
            },
          ]}
          hasFeedback>
          <ImageUploader singleImage={true} withIcon={false} buttonText='Choose images' onChange={onDrop} imgExtension={['.jpg', '.gif', '.png', '.gif']} maxFileSize={1048576}/>
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
