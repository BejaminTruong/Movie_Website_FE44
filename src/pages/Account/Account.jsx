import React, { useEffect, useState } from "react";
import "./Account.scss";
import { Tabs, Row, Col, Button, Table, Tag, Space } from "antd";
import { EditFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { qlNguoiDungService } from "services/QuanLyNguoiDungService";
import _ from "lodash";
import moment from "moment";
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
          ngayDat: moment(ve.ngayDat).format("MM-DD-YYYY"),
          tenPhim: ve.tenPhim,
        });
      });
    });
    console.log(data);
  }
  return (
    <Tabs className="accountTab" defaultActiveKey="1" type="card" size="large">
      <TabPane className="accountTab_Tab1" tab="Personal Information" key="1">
        <Row  gutter={[24, 24]}>
          <Col xl={{ span: 4, offset: 7 }} sm={{ span: 8, offset: 4 }} xs={{span:12, offset:2}}>Email: {userInfo.email}</Col>
          <Col xl={{span:4}} sm={{ span: 8, offset: 4 }}>
            UserName: {userInfo.taiKhoan}
          </Col>
          <Col xl={{ span: 4, offset: 7 }} sm={{ span: 8, offset: 4 }} xs={{span:12, offset:2}}>Full Name: {userInfo.hoTen}</Col>
          <Col xl={{span:4}} sm={{ span: 8, offset: 4 }}>
            Password: {userInfo.matKhau}
          </Col>
          <Col xl={{ offset: 7 }} sm={{ span: 4, offset: 4 }} xs={{span:10,offset:2}}>Phone: {userInfo.soDT}</Col>
          <Col xl={{ offset: 4 }} sm={{ span: 4, offset: 8 }} xs={{span:4,offset:2}}>
            <Button type="primary">
              <EditFilled /> Edit
            </Button>
          </Col>
        </Row>
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
