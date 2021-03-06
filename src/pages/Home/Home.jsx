import React, { useState, useEffect } from "react";
import { quanLyPhimService } from "services/QuanLyPhimService";
import { groupID_carousel } from "configs/setting";
import { Carousel } from "components/Carousel/Carousel";
import { Tab } from "components/Tabs/Tab";
import Load from "images/Loading.gif";
import "swiper/swiper-bundle.css";
import { Cinema } from "components/Cinema/Cinema";
import { useDispatch } from "react-redux";
import { LayThongTinCinema } from "redux/actions/QuanLyRapPhimAction";

import "./Home.scss";

export default function Home() {
  const dispatch = useDispatch();

  let [Data,setData] = useState({DSPhim: [],DSPhimTopRanking: [],Loading: true});

  const initial = () => {
    dispatch(LayThongTinCinema());  
    quanLyPhimService.layDanhSachPhim(groupID_carousel).then((res) => {
        let DSTopRanking = [];
        res.data.forEach((phim) => {
          if (phim.danhGia <= 10 && phim.danhGia >= 8) {
            DSTopRanking.push(phim);
          }
        });

        setData({DSPhim: res.data,DSPhimTopRanking: DSTopRanking,Loading: false})
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  useEffect(initial, []);

  return (
    <section className="home animate__animated animate__fadeIn">
      { Data.Loading ? (
        <div style={{ width: "100%", height: "100%" }}>
          <img src={Load} alt="Loading..." width="100%" height="100%" />
        </div>
      ) : (
        <>
          <Carousel DSPhim={Data.DSPhim} DSPhimTop={Data.DSPhimTopRanking} />
          <Tab />
          <Cinema />
        </>
      )}
    </section>
  );
}
