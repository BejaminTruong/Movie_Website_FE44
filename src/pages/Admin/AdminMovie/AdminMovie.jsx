import { blue, red, green } from "@ant-design/colors";
import {
  Button,
  Input,
  Space,
  Table,
  Form,
  Modal,
  Select,
  message,
  DatePicker,
  notification,
} from "antd";
import Loader from "react-loader-spinner";
import React, { useEffect, useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import {DeleteFilled,EditFilled,DiffOutlined} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LayThongTinPhim} from "../../../redux/actions/QuanLyPhimAction";
import { quanLyPhimService } from "../../../services/QuanLyPhimService";
import { handleSetDSCumRap, LayThongTinCinema } from "../../../redux/actions/QuanLyRapPhimAction";

import "./AdminMovie.scss";

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
let called = false;
export const AdminMovie = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [dataTable, setDataTable] = useState([]);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [changePage, setChangePage] = useState(1);
  const [groupID, setGroupID] = useState("GP01");
  const [totalData, setTotalData] = useState(0);
  const [loading,setLoading] = useState(false);
  const [maPhim,setmaPhim] = useState("");

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      key: "moTa",
    },
    {
      title: "Mã Nhóm",
      dataIndex: "maNhom",
      key: "maNhom",
    },
    {
      title: "Ngày Khởi Chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
    },
    {
      title: "Thao Tác",
      dataIndex: "thaoTac",
      key: "thaoTac",
      render: (text, record) => (
        <Space>
          <Button style={{ backgroundColor: green[7], color: "white" }} onClick={() => {
              setmaPhim(record.maPhim);
              dispatch(LayThongTinPhim(record.maPhim,setLoading,setShowModal));
            }}
          >
            <DiffOutlined />
            Create showtimes
          </Button>
          <Button style={{ backgroundColor: blue[6], color: "white" }} onClick={() => {
              form.setFieldsValue({
                maPhim: record.maPhim,
                ngayChieuGioChieu: record.ngayChieuGioChieu,
                maRap: record.maRap,
                giaVe: record.giaVe,
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
              handleDelete(record.maPhim);
            }}
          >
            <DeleteFilled />
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const columnsLichChieu = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Mã lịch chiếu",
      dataIndex: "maLichChieu",
      key: "maLichChieu",
    },
    {
      title: "Hệ thống rạp",
      dataIndex: "tenHeThongRap",
      key: "tenHeThongRap",
    },
    {
      title: "Cụm rạp",
      dataIndex: "tenCumRap",
      key: "tenCumRap",
    },
    {
      title: "Ngày giờ chiếu",
      dataIndex: "ngayChieuGioChieu",
      key: "ngayChieuGioChieu",
    },
    {
      title: "Giá Vé",
      dataIndex: "giaVe",
      key: "giaVe",
    },
    {
      title: "Thời lượng phim",
      dataIndex: "thoiLuong",
      key: "thoiLuong",
    },
  ];

  let DSHeThongRap = useSelector(state => state.QuanLyRapPhimReducer.DSHeThongRap);
  let DSCumRap = useSelector(state => state.QuanLyRapPhimReducer.DSCumRap);
  let lichChieuPhim = useSelector(state => state.QuanLyPhimReducer.lichChieuPhim);
  let [DSRap,setDSRap] = useState([]);
  
  const initial = () => {
    let fetchedData = [];
    quanLyPhimService.layDanhSachPhimPhantrang(changePage, 10, groupID).then((res) =>{
      res.data.items.forEach(({ ...rest }, i) => {
        fetchedData = [
          ...fetchedData,
          {
            key: i + 1,
            STT: changePage === 1 ? i + 1 : i + 1 + (changePage - 1) * 10,
            ...rest,
            hinhAnh: (
              <img
                src={{ ...rest }.hinhAnh}
                width="50px"
                height="50px"
                alt={{ ...rest }.tenPhim}
              />
            ),
          },
        ];
      });
      setTotalData(res.data.totalCount);
      setDataTable(fetchedData);
      called = false;
    }).catch(error=>{
      console.log(error)
      setDataTable([]);
    })

    dispatch(LayThongTinCinema());
    setDSRap(DSCumRap[0]?.danhSachRap);
  };

  useEffect(initial, [ignored, groupID]);

  const handlePage = (nextPage) => {
    if (called) {
      setChangePage(nextPage);
      return;
    }
    setChangePage(nextPage);
    let newData = [];
    let index = 0;

    quanLyPhimService.layDanhSachPhimPhantrang(nextPage, 10, groupID).then((res) =>{
      res.data.items.forEach(({ ...rest }, i) => {
        index++;
        newData = [
          ...newData,
          {
            key: index,
            STT: nextPage === 1 ? i + 1 : i + 1 + (nextPage - 1) * 10,
            ...rest,
            hinhAnh: (
              <img
                src={{ ...rest }.hinhAnh}
                width="50px"
                height="50px"
                alt={{ ...rest }.tenPhim}
              />
            ),
          },
        ];
      });
      setDataTable(newData);
    }).catch(err=>{
      console.log(err);
    })
  };

  const openNotificationWithIcon = (type,des) => {
    notification[type]({
      message: 'Thông Báo',
      description:
        des,
    });
  };

  const handleOk = () => {
   
    let formValues = form.getFieldValue();
    let createdValues = {
      ...formValues,
      ngayChieuGioChieu: formValues['ngayChieuGioChieu'].format('DD-MM-YYYY HH:mm:ss'),
      maPhim: maPhim
    };

    quanLyPhimService.TaoLichChieu(createdValues).then(res =>{
      openNotificationWithIcon('success',res.data);
    }).catch(errors=>{
      openNotificationWithIcon('error',`Error: ${errors.response.status}. ${errors.response.data}`);
    })
  };

  const handleDelete = (maPhim) => {
    quanLyPhimService.XoaPhim(maPhim).then((res) => {
      forceUpdate();
      message.success("Delete Successfully!");
    })
    .catch((err) => {
      message.error("Delete Failed!");
    });
  };

  return (
    <>
      <NavLink to="/admin/useradmin/formmovie">Add Movie</NavLink>
      <Input onPressEnter={(e) => setGroupID("GP" + e.target.value)} addonBefore="GP" defaultValue="01" />
      <Table pagination={{position: ["bottomCenter"], total: totalData, onChange: handlePage, showSizeChanger: false,current: changePage}} columns={columns} dataSource={dataTable}/>
      {
        loading ? <Loader type="Circles" color="#2BAD60" className="loading" height="50%" width="50%" /> : <></> 
      } 
      <Modal width="auto" style={{padding:"0 5%",top: 20}} className="customModal" title="Tạo lịch chiếu" visible={showModal} onOk={handleOk} onCancel={() => {setShowModal(false);}}>
        <Form form={form} labelAlign="left" {...formItemLayout} >
          <Select defaultValue={DSHeThongRap[0]?.tenHeThongRap} style={{marginRight:"10px",width:"20%"}} placeholder="Chọn hệ thống rạp..." onChange={(value) =>{
            dispatch(handleSetDSCumRap(value));
          }}>
            {DSHeThongRap?.map((item,index) =>{
              return <Option key={index} value={item.maHeThongRap}>{item.tenHeThongRap}</Option>
            })}
          </Select>
          <Select defaultValue={DSCumRap[0]?.tenCumRap} style={{marginRight:"10px",width:"35%"}} placeholder="Chọn cụm rạp..." onChange={(value) => {
            const DSTemp = DSCumRap.find(item => item.maCumRap === value);
            setDSRap(DSTemp.danhSachRap);
          }} >
            {DSCumRap?.map((item,index) =>{
              return <Option key={index} value={item.maCumRap}>{item.tenCumRap}</Option>
            })}
          </Select>
          <Form.Item name="maRap" style={{display:"inline-block",width:"15%"}}  >
            <Select placeholder="Chọn rạp...">
              {DSRap?.map((item,index) =>{
                return <Option key={index} value={item.maRap}>{item.tenRap}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Ngày Chiếu" name="ngayChieuGioChieu">
            <DatePicker showTime format="DD-MM-YYYY HH:mm:ss" />
          </Form.Item>
          <Form.Item label="Giá vé" initialValue="75000" name="giaVe">
            <Input type="number" allowClear/>
          </Form.Item>
        </Form>
        <Table columns={columnsLichChieu} rowKey="STT" pagination={false} scroll={{ y: 240 }} dataSource={ lichChieuPhim } />  
      </Modal>
    </>
  );
};
