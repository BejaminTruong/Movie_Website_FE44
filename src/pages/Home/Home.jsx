import React, { useState, useEffect } from "react";
import { quanLyPhimService } from "services/QuanLyPhimService";
import {groupID_carousel} from "configs/setting"
import {Carousel} from "pages/Home/components/Carousel/Carousel";
import {Tab} from "pages/Home/components/Tabs/Tab";
import loading from "Loading.gif";
import "swiper/swiper-bundle.css";
import "./Home.scss";

export default function Home() {
  let [DSPhim, setDSPhim] = useState([]);
  let [DSPhimTopRanking,setDSPhimTopRanking] = useState([]);
  let [Loading, setLoading] = useState(true);

  useEffect(() => {
    quanLyPhimService
      .layDanhSachPhim(groupID_carousel)
      .then((res) => {
        setDSPhim(res.data);
        setLoading(false);
        return res.data
      }).then(DSPhimTop => {
        let DSPhimTopRanking = [];
        DSPhimTop.forEach((phim) => {
          const rate = +phim.danhGia;
          if (rate >= 8 && rate <= 10) {
            DSPhimTopRanking.push(phim);
          }
        })

        setDSPhimTopRanking(DSPhimTopRanking);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
  return (
    <section className="home"> 
      {Loading ? (
        <div style={{width:"50%",height:"100%",margin:"0 auto "}}>
          <img
            src={loading}
            alt="Loading..."
            width="100%"
            height="100%"
          />
        </div>
      ) : (
        <>
          <Carousel DSPhim={DSPhim} DSPhimTop = {DSPhimTopRanking} />
          <Tab />
        </>
      )}
    </section>
  );
}
