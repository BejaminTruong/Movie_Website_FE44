import React, { useState, useEffect } from "react";
import { quanLyPhimService } from "services/QuanLyPhimService";
import {groupID_carousel,groupID_Cinema,CinemaID} from "configs/setting"
import {Carousel} from "components/Carousel/Carousel";
import {Tab} from "components/Tabs/Tab";
import Load from "images/Loading.gif";
import "swiper/swiper-bundle.css";
import "./Home.scss";
import { quanLyRapSerVice } from "../../services/QuanLyRapService";
import axios from "axios";

export default function Home(props) {

  let [DSPhim, setDSPhim] = useState([]);
  let [DSPhimTopRanking,setDSPhimTopRanking] = useState([]);
  let [DSHeThongRap,setDSHeThongRap] = useState([]);
  let [DSCumRap,setDSCumRap] = useState([]);
  let [DSLichChieu,setDSLichChieu] = useState([]);
  
  const {Loading,handleLoading} = props;

  useEffect(() => {

    const requestOne = quanLyPhimService.layDanhSachPhim(groupID_carousel);
    const requestTwo = quanLyRapSerVice.layThongTinHeThongRap();
    const requestThree = quanLyRapSerVice.layThongTinCumRap(CinemaID);
    const requestFour = quanLyRapSerVice.layThongTinLichChieuTheoCumRap(CinemaID,groupID_Cinema);

    axios.all([requestOne,requestTwo,requestThree,requestFour]).then(axios.spread((...responses)=>{
      const responseOne = responses[0];
      const responseTwo = responses[1];
      const responesThree = responses[2];
      const responseFour = responses[3];

      setDSPhim(responseOne.data);
      setDSHeThongRap(responseTwo.data);
      setDSCumRap(responesThree.data);
      setDSLichChieu(responseFour.data);

      return responseOne.data;
    })).then(DSTop =>{
      let DSTopRanking = []
      DSTop.forEach((phim)=>{
        if(phim.danhGia <= 10 && phim.danhGia >=8){
          DSTopRanking.push(phim);
        }
      })

      setDSPhimTopRanking(DSTopRanking);
      handleLoading();
    }).catch(errors=>{
      console.log(errors);
    })

  }, []);

  
  return (
    <section className="home"> 
      {Loading ? (
        <div style={{width:"100%",height:"100%"}}>
          <img
            src={Load}
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
