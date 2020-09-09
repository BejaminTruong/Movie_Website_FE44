import React from "react";
import { Row, Col, Space } from "antd";
import "./Header.scss";
import saitama from "../../images/icons8-saitama-48.png";
export const Header = () => {
  return (
    <section className="header">
      <nav className="navbar__wrapper">
        <Row
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="space-between"
          align="middle"
        >
          <Col span={6}>
            <div>
              <img src={saitama} alt="saitama" />
            </div>
          </Col>
          <Col span={10}>
            <Row justify="center">
              <Space size={20}>
                <a className="nav__link" href="#">
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
              <Space>
                <button className="btn ant-btn-background-ghost">
                  Đăng Ký
                </button>
                <button className="btn ant-btn-background-ghost">
                  Đăng Nhập
                </button>
              </Space>
            </Row>
          </Col>
        </Row>
      </nav>
    </section>
  );
};
