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
  let [DSPhimTheoLichChieu, setDSPhimTheoLichChieu] = useState([]);

  const { Loading, handleLoading } = props;

  useEffect(() => {
    const requestOne = quanLyPhimService.layDanhSachPhim(groupID_carousel);
    const requestTwo = quanLyRapSerVice.layThongTinHeThongRap();
    const requestThree = quanLyRapSerVice.layThongTinCumRap(CinemaID);
    const requestFour = quanLyRapSerVice.layThongTinLichChieuTheoCumRap(groupID_Cinema);

    axios.all([requestOne, requestTwo, requestThree, requestFour]).then(axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responeseThree = responses[2];
          const responseFour = responses[3];

          setDSPhim(responseOne.data);
          setDSHeThongRap(responseTwo.data);
          setDSCumRap(responeseThree.data);
          setDSPhimTheoLichChieu(responseFour.data);
          
          return responseOne.data;          
        })
      ).then((DSTop) => {
        let DSTopRanking = [];
        DSTop.forEach((phim) => {
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
    quanLyRapSerVice.layThongTinCumRap(maHeThongRap).then(res=>{
      setDSCumRap(res.data);
    }).catch(error=>{
      console.log(error);
    })
  };

  const handleSetDSLichChieu = (maCumRap) =>{

    // quanLyRapSerVice.layThongTinLichChieuTheoCumRap(groupID_Cinema).then(res=>{

    //   let list = [];

    //   for(let item of res.data[0].lstCumRap){
    //     if(item.maCumRap === maCumRap){
    //       list.push(item.danhSachPhim);
    //     }
    //   }
    //   setDSLichChieu(list);
    // }).catch(error=>{
    //   console.log(error);
    // })
    
  }

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
            DSPhimTheoLichChieu={DSPhimTheoLichChieu}
            handleSetDSCumRap={handleSetDSCumRap}
            handleSetDSLichChieu={handleSetDSLichChieu}
          />
        </>
      )}
    </section>
  );
}
