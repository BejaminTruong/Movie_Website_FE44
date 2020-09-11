import React from "react";
import { Row, Col, Space } from "antd";
import logo from "images/favicon_movie.ico";
import movie_name from "images/Logo_name.png";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import _ from "lodash";
export const Header = (props) => {
  const propNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  return (
    <section className="header">
      <nav className="navbar__wrapper">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="space-between"
          align="middle"
        >
          <Col span={6}>
            <NavLink to="/home">
              <img
                src={logo}
                width="20%"
                height="20%"
                style={{ borderRadius: "100%", display: "inline-block" }}
                alt="logo"
              />
              <img
                src={movie_name}
                width="80%"
                style={{ backgroundColor: "transparent" }}
                alt="brand"
              />
            </NavLink>
          </Col>
          <Col span={10}>
            <Row justify="center">
              <Space size={20}>
                <a className="nav__link" href="/home">
                  Trang Chủ
                </a>
                <a className="nav__link" href="#">
                  Liên Hệ
                </a>
                <a className="nav__link" href="#">
                  Tin Tức
                </a>
                <a className="nav__link" href="#">
                  Ứng Dụng
                </a>
              </Space>
            </Row>
          </Col>
          <Col span={8}>
            <Row justify="end">
              {!_.isEmpty(propNguoiDung) ? (
                <Space>
                  <Avatar
                    style={{ backgroundColor: "#f5c518" }}
                    icon={<UserOutlined />}
                  />
                  {propNguoiDung.taiKhoan}
                </Space>
              ) : (
                <Space>
                  <a href="/register" className="btn ant-btn-background-ghost">
                    Đăng Ký
                  </a>
                  <a href="/login" className="btn ant-btn-background-ghost">
                    Đăng Nhập
                  </a>
                </Space>
              )}
            </Row>
          </Col>
        </Row>
      </nav>
    </section>
  );
};
