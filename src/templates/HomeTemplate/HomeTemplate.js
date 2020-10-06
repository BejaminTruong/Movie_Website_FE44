import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { BackTop } from "antd";
import { Header } from "components/Header/Header";
import { Footer } from "components/Footer/Footer";
import { ArrowUpOutlined } from "@ant-design/icons";
const backTop = {
  height: 40,
  width: 40,
  lineHeight: "40px",
  borderRadius: 4,
  backgroundColor: "#f5c518",
  color: "#000",
  textAlign: "center",
  fontSize: 14,
};
const HomeComponent = (props) => {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Header />
      {props.children}
      <BackTop>
        <div style={backTop}>
          <ArrowUpOutlined />
        </div>
      </BackTop>
      <Footer />
    </div>
  );
};

export const HomeTemplate = ({ Component, ...rest }) => {
  let [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <HomeComponent>
            <Component
              {...props}
              Loading={isLoading}
              handleLoading={handleLoading}
            />
          </HomeComponent>
        );
      }}
    />
  );
};
