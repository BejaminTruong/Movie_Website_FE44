import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { quanLyPhimService } from "../../../../services/QuanLyPhimService";
import { groupID_defaultTab, groupID_Tab2, groupID_Tab3 } from "../../../../configs/setting";
import ListCards from "./ListCards/ListCards";

const Tab = (props) => {
  let [DSPhimSapChieu, setDSPhimSapChieu] = useState([]);
  let [DSPhimDangChieu, setDSPhimDangChieu] = useState([]);
  let [DSPhimHot, setDSPhimHot] = useState([]);

  useEffect(() => {
    quanLyPhimService.layDanhSachPhim(groupID_defaultTab).then((res) => {
      setDSPhimSapChieu(res.data);
    });
  }, []);

  const handleLoadingTab2 = () => {
    quanLyPhimService.layDanhSachPhim(groupID_Tab2).then((res) => {
      setDSPhimDangChieu(res.data);
    });
  };

  const handleLoadingTab3 = () => {
    quanLyPhimService.layDanhSachPhim(groupID_Tab3).then((res) => {
      setDSPhimHot(res.data);
    });
  };

  return (
    <div>
      <section className="tabs">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          tabPosition="top"
          tabBarStyle={{ fontWeight: 700, padding: "10px 0" }}
          tabBarGutter={10}
          onTabClick={(key) => {
            if (key === "2") {
              handleLoadingTab2();
            }else{
              handleLoadingTab3();
            }
          }}
        >
          <Tabs.TabPane tab="Phim Sắp Chiếu" key="1" animated>
            <ListCards DSPhim={DSPhimSapChieu} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Phim Đang Chiếu" key="2" animated>
            <ListCards DSPhim={DSPhimDangChieu} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Phim Hot Nhất" key="3" animated>
            <ListCards DSPhim={DSPhimHot} />
          </Tabs.TabPane>
        </Tabs>
      </section>
    </div>
  );
};

export default Tab;
