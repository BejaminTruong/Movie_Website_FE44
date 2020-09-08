import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { quanLyPhimService } from "../../../../services/QuanLyPhimService";
import {groupID_defaultTab,groupID_Tab2,groupID_Tab3,
} from "../../../../configs/setting";
import { ListCards } from "../../../../components/ListCards/ListCards";
import { TabCard } from "../../../../components/TabCard/TabCard";
import "./Tabs.scss"

export const Tab = (props) => {
  let [DSPhim, setDSPhim] = useState([]);
  
  useEffect(() => {
    quanLyPhimService.layDanhSachPhim(groupID_defaultTab).then((res) => {
      setDSPhim(res.data);
    });
  }, []);

  const handleLoadingTab1 = () => {
    quanLyPhimService.layDanhSachPhim(groupID_defaultTab).then((res) => {
      setDSPhim(res.data);
    });
  };

  const handleLoadingTab2 = () => {
    quanLyPhimService.layDanhSachPhim(groupID_Tab2).then((res) => {
      setDSPhim(res.data);
    });
  };

  const handleLoadingTab3 = () => {
    quanLyPhimService.layDanhSachPhim(groupID_Tab3).then((res) => {
      setDSPhim(res.data);
    });
  };

  const renderListCard = () => {
    return (
      <ListCards
        data={DSPhim}
        slidesPerView={4}
        speed={1000}
        spaceBetween={20}
        slidesPerColumn={2}
        slidesPerColumnFill="row"
        tag="div"
        navigation
        lazy
        slidesPerGroup={4}
      >
        {(phim) => <TabCard phim={phim} />}
      </ListCards>
    );
  };
  return (
    <div>
      <section className="tabs">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          tabPosition="top"
          tabBarStyle={{ fontWeight: 700, padding: "10px 0"}}
          tabBarGutter={10}
          onTabClick={(key,e) => {
            if (key === "1") {
              handleLoadingTab1();
            } else if (key === "2") {
              handleLoadingTab2();
            } else {
              handleLoadingTab3();
            }
          }}
        >
          <Tabs.TabPane tab="Phim Sắp Chiếu" key="1" animated>
            {renderListCard()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Phim Đang Chiếu" key="2" animated>
            {renderListCard()}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Phim Hot Nhất" key="3" animated>
            {renderListCard()}
          </Tabs.TabPane>
        </Tabs>
      </section>
    </div>
  );
};
