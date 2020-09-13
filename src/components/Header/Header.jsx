import React, { useLayoutEffect, useState } from "react";
import { Row, Col, Space, Button } from "antd";
import logo from "images/favicon_movie.ico";
import movie_name from "images/Logo_name.png";
import "./Header.scss";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {UserOutlined,MenuOutlined,ArrowRightOutlined} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import _ from "lodash";

export const Header = () => {
  const propNguoiDung = useSelector(
    (state) => state.QuanLyNguoiDungReducer.nguoiDung
  );

  let [innerWidth, setInnerWidth] = useState(0);
  let [innerHeight,setInnerHeight] = useState(0);
  let [collapsed,setCollapsed] = useState(false);

  const toggleCollapsed = () =>{
    
    setCollapsed(!collapsed);

    const active = collapsed ? "menuToggle" : "menuToggle menuToggle-active";
    const hidden = collapsed ? "hidden" : "hidden";
    document.getElementById("menuToggle").className = `${active}`;
    document.body.style.overflowX = `${hidden}`;
    
  }

  let handleResize = () => {
    setInnerWidth(window.innerWidth);
    setInnerHeight(window.innerHeight);
  };

  useLayoutEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <section className="header" style={{ padding: innerWidth <= 916 ? "20px" : "" }}>
      <nav className="navbar__wrapper">
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between" align="middle">
          <Col span={6}>
            <NavLink to="/home">
              <img src={logo} width="20%" height="20%" style={{ borderRadius: "100%", display: "inline-block" }} alt="logo"/>
              <img src={movie_name} width="80%" style={{ backgroundColor: "transparent" }} alt="brand"/>
            </NavLink>
          </Col>
          <Col span={18} style={{ paddingLeft: "50px", position: "unset" }}>
            <div style={{display: innerWidth >=  916 ? "none" : "",textAlign:"right"}} >
              <Button type="primary" className="btn-toggle" onClick={toggleCollapsed} size="middle" style={{fontSize:"18px",fontWeight:"bolder",backgroundColor:"#121212",borderColor:"#171c20"}}>
                <MenuOutlined />
              </Button>
            </div>               
            <Row align="middle" justify="space-around" style={{ display: innerWidth <= 912 ? "none" : "" }}>
              <Col span={14}>
                <Space size={10} style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                  <NavLink to="/home" className="nav__link">Trang Chủ</NavLink>
                  <NavLink to="/contact" className="nav__link">Liên Hệ</NavLink>
                  <NavLink to="/news" className="nav__link">Tin Tức</NavLink>
                  <NavLink to="#" className="nav__link">Ứng Dụng</NavLink>
                </Space>             
              </Col>
              <Col span={10}>
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
                      <a
                        href="/register"
                        className="btn ant-btn-background-ghost"
                      >
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
          </Col>
        </Row>
      </nav>
      <div className="menuToggle" id="menuToggle" style={{height:`${innerHeight}px`,opacity: collapsed ? 1 : 0}}>
        <Row justify="space-between">
          <Col span={12} offset={12} style={{background:"#121212",height: `${innerHeight}px`}}>
            <Button type="primary" onClick={toggleCollapsed} size="middle" style={{fontSize:"18px",fontWeight:"bolder",backgroundColor:"#121212",borderColor:"#171c20"}}>
              <ArrowRightOutlined />
            </Button>
            <div>
              <NavLink to="/home">Trang Chủ</NavLink>
            </div>
            <div>
              <NavLink to="/contact">Liên Hệ</NavLink>
            </div>
            <div>
              <NavLink to="/news">Tin Tức</NavLink>
            </div>
            <div>
              <NavLink to="#">Ứng Dụng</NavLink>
            </div>                          
          </Col>
        </Row>  
      </div>                       
    </section>
  );
};
