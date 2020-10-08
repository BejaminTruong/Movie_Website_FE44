import React, { useState } from "react";
import { NavLink, Redirect, Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Col, Layout, Menu, Row, Space } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./AdminTemplate.scss";
const { Header, Sider, Content } = Layout;
const AdminComponent = (props) => {
  const history = useHistory();
  const propNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  const [sideCollapsed, setSideCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={sideCollapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <NavLink to="/admin/movieadmin">Quản Lý Phim</NavLink>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <NavLink to="/admin/useradmin">Quản Lý Người Dùng</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Row justify="space-between">
            <Col span={2}>
              {React.createElement(
                sideCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: () => setSideCollapsed(!sideCollapsed),
                }
              )}
            </Col>
            <Col
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              span={2}
              onClick={() => history.push("/account")}
            >
              <Space style={{marginRight:"10px"}}>
                <Avatar
                  style={{ backgroundColor: "#f5c518" }}
                  icon={<UserOutlined />}
                />
                {propNguoiDung.taiKhoan}
              </Space>
            </Col>
          </Row>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export const AdminTemplate = ({ Component, ...rest }) => {
  const propsNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  return (
    <Route
      {...rest}
      render={(props) => {
        return propsNguoiDung.maLoaiNguoiDung === "QuanTri" ? (
          <AdminComponent>
            <Component {...props} />
          </AdminComponent>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};
