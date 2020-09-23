import React, { useEffect, useState } from "react";
import "./Account.scss";
import { Tabs, Row, Col, Button, Table, Tag, Space } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { qlNguoiDungService } from "services/QuanLyNguoiDungService";
import _ from "lodash";
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
        console.log(err);
      });
  }, [propNguoiDung.taiKhoan]);
  let index = -1;
  if (!_.isEmpty(userInfo)) {
    userInfo.thongTinDatVe.forEach((ve) => {
      ve.danhSachGhe.forEach((g) => {
        index++;
        data.push({
          key: index,
          tenRap: g.tenRap,
          tenHeThongRap: g.tenHeThongRap,
          ghe: g.tenGhe,
          ngayDat: ve.ngayDat,
          tenPhim: ve.tenPhim,
        });
      });
    });
    console.log(data);
  }
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
          pagination={{ position: ["bottomCenter"], pageSize: 10 }}
          columns={columns}
          dataSource={data}
        />
      </TabPane>
    </Tabs>
  );
};
