import React, { useState, useEffect } from "react";
import { quanLyPhimService } from "services/QuanLyPhimService";
import { groupID_carousel, groupID_Cinema, CinemaID } from "configs/setting";
import { Carousel } from "components/Carousel/Carousel";
import { Tab } from "components/Tabs/Tab";
import Load from "images/Loading.gif";
import "swiper/swiper-bundle.css";
import "./Home.scss";
import { quanLyRapSerVice } from "services/QuanLyRapService";
import axios from "axios";
import { Cinema } from "components/Cinema/Cinema";

export default function Home(props) {

  let [DSPhim, setDSPhim] = useState([]);
  let [DSPhimTopRanking, setDSPhimTopRanking] = useState([]);
  let [DSHeThongRap, setDSHeThongRap] = useState([]);
  let [DSCumRap, setDSCumRap] = useState([]);
  let [DSLichChieu, setDSLichchieu] = useState([]);

  const { Loading, handleLoading } = props;

  useEffect(() => {
    const requestOne = quanLyPhimService.layDanhSachPhim(groupID_carousel);
    const requestTwo = quanLyRapSerVice.layThongTinHeThongRap();
    const requestThree = quanLyRapSerVice.layThongTinCumRap(CinemaID);
    const requestFour = quanLyRapSerVice.layThongTinLichChieuTheoCumRap(CinemaID,groupID_Cinema);

    axios.all([requestOne, requestTwo, requestThree,requestFour]).then(axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responeseThree = responses[2];
          const responseFour = responses[3];

          setDSPhim(responseOne.data);
          setDSHeThongRap(responseTwo.data);
          setDSCumRap(responeseThree.data);
          setDSLichchieu(responseFour.data[0].lstCumRap);
  
          return responseOne.data;          
        })
      ).then((list) => {
       
        let DSTopRanking = [];
        list.forEach((phim) => {
          if (phim.danhGia <= 10 && phim.danhGia >= 8) {
            DSTopRanking.push(phim);
          }
        });
        setDSPhimTopRanking(DSTopRanking);
        handleLoading();
      }).catch((errors) => {
        console.log(errors);
      });
      
  }, []);

  const handleSetDSCumRap = (maHeThongRap) => {

    const requestOne = quanLyRapSerVice.layThongTinCumRap(maHeThongRap);
    const requestTwo = quanLyRapSerVice.layThongTinLichChieuTheoCumRap(maHeThongRap,groupID_Cinema);

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];

      setDSCumRap(responseOne.data);
      setDSLichchieu(responseTwo.data[0].lstCumRap);

      console.log(responseTwo.data)
    })).catch(errors=>{
      console.log(errors)
    })
  };

  return (
    <section className="home">
      {Loading ? (
        <div style={{ width: "100%", height: "100%" }}>
          <img src={Load} alt="Loading..." width="100%" height="100%" />
        </div>
      ) : (
        <>
          <Carousel DSPhim={DSPhim} DSPhimTop={DSPhimTopRanking} />
          <Tab />
          <Cinema
            DSHeThongRap={DSHeThongRap}
            DSCumRap={DSCumRap}
            DSLichChieu={DSLichChieu}
            handleSetDSCumRap={handleSetDSCumRap}
          />
        </>
      )}
    </section>
  );
}
