import React, { useState, useEffect } from "react";
import { Row, Col, Space, Button } from "antd";
import logo from "images/favicon_movie.ico";
import movie_name from "images/Logo_name.png";
import "./Header.scss";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  UserOutlined,
  MenuOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import _ from "lodash";

export const Header = () => {
  const history = useHistory();
  const propNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );
  let [innerWidth, setInnerWidth] = useState(0);
  let [innerHeight, setInnerHeight] = useState(0);
  let [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);

    const active = collapsed ? "menuToggle" : "menuToggle menuToggle-active";
    const hidden = collapsed ? "" : "hidden";
    document.getElementById("menuToggle").className = `${active}`;
    document.body.style.overflow = `${hidden}`;
  };

  const setBodyOverflow = () => {
    document.body.style.overflow = "";
  };

  let handleResize = () => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="header"
      style={{ padding: innerWidth <= 992 ? "20px" : "" }}
    >
      <nav className="navbar__wrapper">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="space-between"
          align="middle"
        >
          <Col span={6}>
            <NavLink to="/home">
              <img className="header__logo" src={logo} alt="logo" />
              <img className="header__img" src={movie_name} alt="brand" />
            </NavLink>
          </Col>
          <Col span={18} style={{ paddingLeft: "50px", position: "unset" }}>
            <div
              style={{
                display: innerWidth > 992 ? "none" : "",
                textAlign: "right",
              }}
            >
              <Button
                type="primary"
                className="btn-toggle"
                onClick={toggleCollapsed}
                size="middle"
                style={{
                  fontSize: "18px",
                  fontWeight: "bolder",
                  backgroundColor: "#121212",
                  borderColor: "#171c20",
                }}
              >
                <MenuOutlined />
              </Button>
            </div>
            <Row
              align="middle"
              justify="space-around"
              style={{ display: innerWidth <= 992 ? "none" : "" }}
            >
              <Col span={14}>
                <Space
                  size={10}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <NavLink to="/home" className="nav__link">
                    Trang Chủ
                  </NavLink>
                  <NavLink to="/contact" className="nav__link">
                    Liên Hệ
                  </NavLink>
                  <NavLink to="/news" className="nav__link">
                    Tin Tức
                  </NavLink>
                  <NavLink to="#" className="nav__link">
                    Ứng Dụng
                  </NavLink>
                </Space>
              </Col>
              <Col span={10}>
                <Row justify="end">
                  {!_.isEmpty(propNguoiDung) ? (
                    <div
                      style={{ color: "white", cursor: "pointer" }}
                      onClick={() => history.push("/account")}
                    >
                      <Space>
                        <Avatar
                          style={{ backgroundColor: "#f5c518" }}
                          icon={<UserOutlined />}
                        />
                        {propNguoiDung.taiKhoan}
                      </Space>
                    </div>
                  ) : (
                    <Space>
                      <NavLink
                        to="/register"
                        className="btn ant-btn-background-ghost"
                      >
                        Đăng Ký
                      </NavLink>
                      <NavLink
                        to="/login"
                        className="btn ant-btn-background-ghost"
                      >
                        Đăng Nhập
                      </NavLink>
                    </Space>
                  )}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </nav>
      <div
        className="menuToggle"
        id="menuToggle"
        style={{
          display: innerWidth > 992 ? "none" : "",
          height: `${innerHeight}px`,
          opacity: collapsed ? 1 : 0,
        }}
      >
        <Row justify="space-between">
          <Col
            span={12}
            offset={12}
            style={{ background: "#121212", height: `${innerHeight}px` }}
          >
            <div className="dataToggle__item item--1">
              {!_.isEmpty(propNguoiDung) ? (
                <div
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => history.push("/account")}
                >
                  <Space>
                    <Avatar
                      style={{ backgroundColor: "#f5c518" }}
                      icon={<UserOutlined />}
                    />
                    {propNguoiDung.taiKhoan}
                  </Space>
                </div>
              ) : (
                <Space>
                  <NavLink
                    to="/login"
                    className="btn ant-btn-background-ghost"
                    onClick={setBodyOverflow()}
                  >
                    <UserOutlined style={{ marginRight: "5px" }} /> Đăng Nhập
                  </NavLink>
                </Space>
              )}
              <Button
                type="primary"
                onClick={toggleCollapsed}
                size="middle"
                style={{
                  fontSize: "18px",
                  fontWeight: "bolder",
                  backgroundColor: "#121212",
                  borderColor: "#171c20",
                }}
              >
                <ArrowRightOutlined />
              </Button>
            </div>
            <NavLink
              className="dataToggle__item"
              to="/home"
              onClick={setBodyOverflow()}
            >
              Trang Chủ
            </NavLink>

            <NavLink
              className="dataToggle__item"
              to="/contact"
              onClick={setBodyOverflow()}
            >
              Liên Hệ
            </NavLink>

            <NavLink
              className="dataToggle__item"
              to="/news"
              onClick={setBodyOverflow()}
            >
              Tin Tức
            </NavLink>

            <NavLink
              className="dataToggle__item"
              to="#"
              onClick={setBodyOverflow()}
            >
              Ứng Dụng
            </NavLink>
          </Col>
        </Row>
      </div>
    </section>
  );
};
