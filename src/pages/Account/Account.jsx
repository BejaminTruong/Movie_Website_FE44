import React, { useEffect, useState } from "react";
import "./Account.scss";
import {
  Tabs,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Divider,
  Skeleton,
  Space,
  message
} from "antd";
import {
  EditFilled,
  UserOutlined,
  MailOutlined,
  SmileOutlined,
  PhoneOutlined,
  LockOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { qlNguoiDungService } from "services/QuanLyNguoiDungService";

import moment from "moment";
import { useHistory } from "react-router-dom";
const { TabPane } = Tabs;
const columns = [
  {
    title: "Tên Rạp",
    dataIndex: "tenRap",
    key: "tenRap",
  },
  {
    title: "Tên hệ thống rạp",
    dataIndex: "tenHeThongRap",
    key: "tenHeThongRap",
  },
  {
    title: "Ghế",
    key: "ghe",
    dataIndex: "ghe",
  },
  {
    title: "Ngày đặt",
    dataIndex: "ngayDat",
    key: "ngayDat",
  },
  {
    title: "Tên Phim",
    key: "tenPhim",
    dataIndex: "tenPhim",
  },
];
let data = [];
const formItemLayout = {
  labelCol: {
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    sm: {
      span: 20,
    },
  },
};
export const Account = () => {
  const history = useHistory();
  const propNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  let index = 0;

  const initial = () =>{
    qlNguoiDungService
      .layThongTinTaiKhoan({ taiKhoan: propNguoiDung.taiKhoan })
      .then((res) => {
        setUserInfo(res.data);
        res.data.thongTinDatVe.forEach((ve) => {
          ve.danhSachGhe.forEach((g) => {
            index++;
            data.push({
              key: index,
              tenRap: g.tenRap,
              tenHeThongRap: g.tenHeThongRap,
              ghe: g.tenGhe,
              ngayDat: moment(ve.ngayDat).format("MM-DD-YYYY"),
              tenPhim: ve.tenPhim,
            });
          });
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      setUserInfo({});
      data = [];
    };
  }
  useEffect(initial, []);
  const handleOk = () => {
    let { taiKhoan, matKhau, email, hoTen, soDt } = form.getFieldsValue([
      "taiKhoan",
      "matKhau",
      "email",
      "hoTen",
      "soDt",
    ]);
    let updatedValues = {
      taiKhoan,
      matKhau,
      email,
      soDt,
      maNhom: "GP01",
      maLoaiNguoiDung: "KhachHang",
      hoTen,
    };
    qlNguoiDungService
      .capNhatThongTinTaiKhoan(updatedValues)
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
        setShowModal(false);
        message.success("Update Successfully!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Update Failed!");
      });
  };
  const handleLogOut = () => {
    dispatch({ type: "LOGGEDOUT" });
    setUserInfo({});
    localStorage.clear();
    history.push("/home");
  };
  return (
    <Tabs className="accountTab" defaultActiveKey="1" type="card" size="large">
      <TabPane className="accountTab_Tab1" tab="Personal Information" key="1">
        {!loading ? (
          <>
            <Row gutter={[24, 24]}>
              <Col
                xl={{ span: 6, offset: 7 }}
                sm={{ span: 8, offset: 4 }}
                xs={{ span: 24, offset: 6 }}
              >
                Email: {userInfo.email}
              </Col>
              <Col xl={{ span: 4, offset: 2 }} sm={{ span: 8, offset: 4 }} md={{offset: 2}} xs={{span:24, offset: 6}}>
                UserName: {userInfo.taiKhoan}
              </Col>
              <Col
                xl={{ span: 6, offset: 7 }}
                sm={{ span: 8, offset: 4 }}
                xs={{ span: 24, offset: 6 }}
              >
                Full Name: {userInfo.hoTen}
              </Col>
              <Col xl={{ span: 4 }} sm={{ span: 8, offset: 2 }} xs={{span:24, offset: 6}}>
                Password: {userInfo.matKhau}
              </Col>
              <Col
                xl={{ span: 6, offset: 7 }}
                sm={{ span: 4, offset: 4 }}
                xs={{ span: 24, offset: 6 }}
              >
                Phone: {userInfo.soDT}
              </Col>
            </Row>
            <Divider />
            <Row justify="center" gutter={[8]}>
              <Col>
                <Button type="primary" onClick={() => setShowModal(true)}>
                  <EditFilled /> Edit
                </Button>
              </Col>
              <Col>
                <Button onClick={handleLogOut}>
                  <LogoutOutlined /> Log Out
                </Button>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ width: "50%", margin: "auto" }}>
            <Skeleton active paragraph={{ rows: 3 }} />
            <Divider />
            <Space>
              <Skeleton.Button active />
              <Skeleton.Button active />
            </Space>
          </div>
        )}

        <Modal
          className="customModal"
          title="Edit User Information"
          visible={showModal}
          onOk={handleOk}
          onCancel={() => setShowModal(false)}
        >
          <Form
            initialValues={{
              taiKhoan: userInfo.taiKhoan,
              matKhau: userInfo.matKhau,
              email: userInfo.email,
              hoTen: userInfo.hoTen,
              soDt: userInfo.soDT,
            }}
            form={form}
            labelAlign="left"
            {...formItemLayout}
          >
            <Form.Item hidden name="taiKhoan" label="UserName">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                allowClear
              />
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
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                allowClear
              />
            </Form.Item>
            <Form.Item label="Full Name" name="hoTen">
              <Input
                prefix={<SmileOutlined className="site-form-item-icon" />}
                placeholder="Full Name"
                allowClear
              />
            </Form.Item>
            <Form.Item label="Telephone" name="soDt">
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Telephone"
                allowClear
              />
            </Form.Item>
            <Form.Item label="Password" name="matKhau">
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
                allowClear
              />
            </Form.Item>
          </Form>
        </Modal>
      </TabPane>
      <TabPane tab="Booking History" key="2" className="accountTab_Tab2">
        <Table
          pagination={{ position: ["bottomCenter"], pageSize: 10 }}
          columns={columns}
          dataSource={data}
        />
      </TabPane>
    </Tabs>
  );
};
