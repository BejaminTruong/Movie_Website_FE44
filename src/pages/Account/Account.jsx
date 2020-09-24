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
} from "antd";
import {
  EditFilled,
  UserOutlined,
  MailOutlined,
  SmileOutlined,
  PhoneOutlined,
  LockOutlined,
  LogoutOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { qlNguoiDungService } from "services/QuanLyNguoiDungService";
import _ from "lodash";
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
const data = [];
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
export const Account = (props) => {
  const history = useHistory();
  const propNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    qlNguoiDungService
      .layThongTinTaiKhoan({ taiKhoan: propNguoiDung.taiKhoan })
      .then((res) => {
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [propNguoiDung.taiKhoan]);
  let index = -1;
  useEffect(() => {
    if (!_.isEmpty(userInfo)) {
      userInfo.thongTinDatVe.forEach((ve) => {
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
    }
  }, [userInfo, index]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const handleModal = () => {
    setShowModal(true);
  };
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
        window.location.reload(false);
        setShowModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleLogOut = () => {
    localStorage.clear();
    history.push("/home");
    window.location.reload(false);
  };
  const handleDelete = () => {
    qlNguoiDungService
      .xoaTaiKhoanNguoiDung(props.match.params.TaiKhoan)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err, props.match.params.TaiKhoan);
      });
  };
  return (
    <Tabs className="accountTab" defaultActiveKey="1" type="card" size="large">
      <TabPane className="accountTab_Tab1" tab="Personal Information" key="1">
        <Row gutter={[24, 24]}>
          <Col
            xl={{ span: 5, offset: 7 }}
            sm={{ span: 8, offset: 4 }}
            xs={{ span: 12, offset: 2 }}
          >
            Email: {userInfo.email}
          </Col>
          <Col xl={{ span: 4, offset: 3 }} sm={{ span: 8, offset: 4 }}>
            UserName: {userInfo.taiKhoan}
          </Col>
          <Col
            xl={{ span: 4, offset: 7 }}
            sm={{ span: 8, offset: 4 }}
            xs={{ span: 12, offset: 2 }}
          >
            Full Name: {userInfo.hoTen}
          </Col>
          <Col xl={{ span: 4 }} sm={{ span: 8, offset: 4 }}>
            Password: {userInfo.matKhau}
          </Col>
          <Col
            xl={{ offset: 7 }}
            sm={{ span: 4, offset: 4 }}
            xs={{ span: 10, offset: 2 }}
          >
            Phone: {userInfo.soDT}
          </Col>
        </Row>
        <Divider />
        <Row justify="center" gutter={[8]}>
          <Col>
            <Button type="primary" onClick={handleModal}>
              <EditFilled /> Edit
            </Button>
          </Col>
          <Col>
            <Button onClick={handleLogOut}>
              <LogoutOutlined /> Log Out
            </Button>
          </Col>
          <Col>
            <Button onClick={handleDelete} danger>
              <DeleteOutlined /> Delete
            </Button>
          </Col>
        </Row>
        <Modal
          className="customModal"
          title="Edit User Information"
          visible={showModal}
          onOk={handleOk}
          onCancel={handleCancel}
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
