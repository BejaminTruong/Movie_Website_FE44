import React from "react";
import {
  FacebookFilled,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeFilled,
  CopyrightOutlined,
  SwapLeftOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";
import "./Footer.scss";
import { Space } from "antd";
import Toan from "images/icons8-minion-100.png";
import Binh from "images/icons8-minion-2-100.png";
export const Footer = () => {

  return (
    <div className="footer" id="footer">
      <div className="iconRow">
        <Space align="center" size="large">
          <div className="iconBorder">
            <FacebookFilled style={{ color: "white", fontSize: "25px" }} />
          </div>
          <div className="iconBorder">
            <InstagramOutlined style={{ color: "white", fontSize: "25px" }} />
          </div>
          <div className="iconBorder">
            <TwitterOutlined style={{ color: "white", fontSize: "25px" }} />
          </div>
          <div className="iconBorder">
            <YoutubeFilled style={{ color: "white", fontSize: "25px" }} />
          </div>
        </Space>
      </div>
      <div className="devRow">
        <img src={Binh} alt="Bình" style={{ display: "block" }} />
        <div>
          <p>
            <SwapLeftOutlined style={{ fontSize: "20px", color: "yellow" }} />
            Trương Thái Bình
          </p>
          <p>
            Khổng Hữu Toàn
            <SwapRightOutlined style={{ fontSize: "20px", color: "yellow" }} />
          </p>
        </div>
        <img src={Toan} alt="Toàn" style={{ display: "block" }} />
      </div>
      <p>
        A Final Project of{" "}
        <a style={{ color: "orange" }} href="https://cybersoft.edu.vn/">
          CyberSoft.edu.vn
        </a>
      </p>
      <p>
        <CopyrightOutlined /> 2020 by Trương Thái Bình - Khổng Hữu Toàn. All
        right reserved
      </p>
    </div>
  );
};
