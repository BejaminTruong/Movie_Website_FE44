import { blue, red } from "@ant-design/colors";
import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { qlNguoiDungService } from "../../../services/QuanLyNguoiDungService";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const columns = [
  {
    title: "STT",
    dataIndex: "STT",
    key: "STT",
  },
  {
    title: "Tài Khoản",
    dataIndex: "taiKhoan",
    key: "taiKhoan",
  },
  {
    title: "Mật Khẩu",
    dataIndex: "matKhau",
    key: "matKhau",
  },
  {
    title: "Họ Tên",
    dataIndex: "hoTen",
    key: "hoTen",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số Điện Thoại",
    dataIndex: "soDt",
    key: "soDt",
  },
  {
    title: "Loại Người Dùng",
    dataIndex: "maLoaiNguoiDung",
    key: "maLoaiNguoiDung",
  },
  {
    title: "Thao Tác",
    dataIndex: "thaoTac",
    key: "thaoTac",
    render: () => (
      <Space>
        <Button style={{ backgroundColor: blue[6], color: "white" }}>
          <EditFilled />
          Edit
        </Button>
        <Button style={{ backgroundColor: red[5], color: "white" }}>
          <DeleteFilled />
          Delete
        </Button>
      </Space>
    ),
  },
];
export const UserAdmin = () => {
  const [dataTable, setDataTable] = useState([]);
  const [totalData, setTotalData] = useState(0);
  useEffect(() => {
    let fetchedData = [];
    let index = 0;
    qlNguoiDungService
      .layDanhSachNguoiDungPhanTrang(1, 10)
      .then((res) => {
        console.log(res.data);
        res.data.items.forEach(
          ({ taiKhoan, matKhau, hoTen, email, soDt, maLoaiNguoiDung }, i) => {
            index++;
            fetchedData = [
              ...fetchedData,
              {
                key: i + 1,
                STT: index,
                taiKhoan,
                matKhau,
                hoTen,
                email,
                soDt,
                maLoaiNguoiDung,
              },
            ];
          }
        );
        setDataTable(fetchedData);
        setTotalData(res.data.totalCount);
        console.log(fetchedData);
        console.log(totalData);
      })
      .catch((err) => console.log(err));
  }, [totalData]);
  const handlePage = (nextPage) => {
    let newData = [];
    let index = 0;
    qlNguoiDungService
      .layDanhSachNguoiDungPhanTrang(nextPage, 10)
      .then((res) => {
        console.log(res.data);
        res.data.items.forEach(
          ({ taiKhoan, matKhau, hoTen, email, soDt, maLoaiNguoiDung }, i) => {
            index++;
            newData = [
              ...newData,
              {
                key: index,
                STT: nextPage === 1 ? i + 1 : i + 1 + (nextPage - 1) * 10,
                taiKhoan,
                matKhau,
                hoTen,
                email,
                soDt,
                maLoaiNguoiDung,
              },
            ];
          }
        );
        setDataTable(newData);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <NavLink to="/admin/useradmin/adduser">Thêm Người Dùng</NavLink>
      <Table
        pagination={{
          position: ["bottomCenter"],
          total: totalData,
          onChange: handlePage,
          showSizeChanger: false,
        }}
        columns={columns}
        dataSource={dataTable}
      />
    </div>
  );
};
