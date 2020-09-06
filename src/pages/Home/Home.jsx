import React, { useState, useEffect } from "react";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
import {groupID_carousel} from "../../configs/setting"
import {Carousel} from "./components/Carousel/Carousel";
import {Tab} from "./components/Tabs/Tab";
import loading from "../../Loading.gif";
import "swiper/swiper-bundle.css";
import "./Home.scss";

export default function Home() {
  let [DSPhim, setDSPhim] = useState([]);
  let [Loading, setLoading] = useState(true);

  useEffect(() => {
    quanLyPhimService
      .layDanhSachPhim(groupID_carousel)
      .then((res) => {
        setDSPhim(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section>  
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
          <Carousel DSPhim={DSPhim} />
          <Tab />
        </>
      )}
    </section>
  );
}
