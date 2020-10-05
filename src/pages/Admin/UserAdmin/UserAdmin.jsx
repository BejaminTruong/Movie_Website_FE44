import { blue, red } from "@ant-design/colors";
import {
  Button,
  Input,
  Space,
  Table,
  Form,
  Modal,
  Select,
  message,
} from "antd";
import React, { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import { qlNguoiDungService } from "../../../services/QuanLyNguoiDungService";
import {
  DeleteFilled,
  EditFilled,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Option } = Select;
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
let recordData = {};
let totalData = 0;
export const UserAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [dataTable, setDataTable] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [changePage, setChangePage] = useState(1);
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
      render: (text, record) => (
        <Space>
          <Button
            style={{ backgroundColor: blue[6], color: "white" }}
            onClick={() => {
              form.setFieldsValue({
                taiKhoan: record.taiKhoan,
                matKhau: record.matKhau,
                hoTen: record.hoTen,
                email: record.email,
                soDt: record.soDt,
                maLoaiNguoiDung: record.maLoaiNguoiDung,
              });
              setShowModal(true);
            }}
          >
            <EditFilled />
            Edit
          </Button>
          <Button
            style={{ backgroundColor: red[5], color: "white" }}
            onClick={() => {
              handleDelete(record.taiKhoan);
            }}
          >
            <DeleteFilled />
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    let fetchedData = [];
    let index = 0;
    qlNguoiDungService
      .layDanhSachNguoiDungPhanTrang(changePage, 10)
      .then((res) => {
        res.data.items.forEach(
          ({ taiKhoan, matKhau, hoTen, email, soDt, maLoaiNguoiDung }, i) => {
            index++;
            fetchedData = [
              ...fetchedData,
              {
                key: i + 1,
                STT: changePage === 1 ? i + 1 : i + 1 + (changePage - 1) * 10,
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
        totalData = res.data.totalCount;
        setDataTable(fetchedData);
      })
      .catch((err) => console.log(err));
  }, [ignored]);
  const handlePage = (nextPage) => {
    setChangePage(nextPage);
    let newData = [];
    let index = 0;
    qlNguoiDungService
      .layDanhSachNguoiDungPhanTrang(nextPage, 10)
      .then((res) => {
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
  const handleOk = () => {
    let formValues = form.getFieldsValue([
      "taiKhoan",
      "matKhau",
      "hoTen",
      "email",
      "soDt",
      "maLoaiNguoiDung",
    ]);
    let updatedValues = {
      ...formValues,
      maNhom: "GP01",
    };
    qlNguoiDungService
      .capNhatThongTinTaiKhoan(updatedValues)
      .then(() => {
        forceUpdate();
        setShowModal(false);
        message.success("Update Successfully!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Update Failed!");
      });
  };
  const handleDelete = (taiKhoan) => {
    console.log(taiKhoan);
    qlNguoiDungService
      .xoaTaiKhoanNguoiDung(taiKhoan)
      .then((res) => {
        console.log(res.data);
        forceUpdate();
        message.success("Delete Successfully!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Delete Failed!");
      });
  };
  return (
    <>
      <NavLink to="/admin/useradmin/adduser">Thêm Người Dùng</NavLink>
      <Table
        pagination={{
          position: ["bottomCenter"],
          total: totalData,
          onChange: handlePage,
          showSizeChanger: false,
          current: changePage,
        }}
        columns={columns}
        dataSource={dataTable}
      />
      <Modal
        className="customModal"
        title="Edit User Information"
        visible={showModal}
        onOk={handleOk}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <Form
          initialValues={recordData}
          form={form}
          labelAlign="left"
          {...formItemLayout}
        >
          <Form.Item name="taiKhoan" label="UserName">
            <Input
              disabled
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
          <Form.Item label="User Type" name="maLoaiNguoiDung">
            <Select placeholder="User Type">
              <Option value="KhachHang">KhachHang</Option>
              <Option value="QuanTri">QuanTri</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
