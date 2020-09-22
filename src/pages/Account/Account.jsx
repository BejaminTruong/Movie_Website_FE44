import React, { useEffect, useState } from "react";
import "./Account.scss";
import { Tabs, Row, Col, Button, Table, Tag, Space } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { qlNguoiDungService } from "services/QuanLyNguoiDungService";
const { TabPane } = Tabs;
const columns = [
  {
    title: "Tên Rạp",
    dataIndex: "tenRap",
    key: "tenRap",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Địa Chỉ",
    dataIndex: "diaChi",
    key: "diaChi",
  },
  {
    title: "Ngày đặt",
    dataIndex: "ngayDat",
    key: "ngayDat",
  },
  {
    title: "Rạp",
    key: "rap",
    dataIndex: "rap",
  },
  {
    title: "Ghế",
    key: "ghe",
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
export const Account = () => {
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
        console.log(err.response.data);
      });
  }, [propNguoiDung.taiKhoan]);
  return (
    <Tabs className="accountTab" defaultActiveKey="1" type="card" size="large">
      <TabPane tab="Personal Information" key="1">
        <Row gutter={[24, 24]}>
          <Col span={12}>Email: {userInfo.email}</Col>
          <Col span={12}>UserName: {userInfo.taiKhoan}</Col>
          <Col span={12}>Full Name: {userInfo.hoTen}</Col>
          <Col span={12}>Password: {userInfo.matKhau}</Col>
          <Col span={12}>Phone: {userInfo.soDT}</Col>
          <Col span={12}>
            <Button type="primary">
              <EditFilled /> Edit
            </Button>
          </Col>
        </Row>
      </TabPane>
      <TabPane tab="Booking History" key="2">
        <Table
          pagination={{ position: ["bottomCenter"], pageSize: 5 }}
          columns={columns}
          dataSource={data}
        />
      </TabPane>
    </Tabs>
  );
};
