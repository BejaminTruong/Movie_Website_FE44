import React, { useState } from "react";
import { Row, Col, Space } from "antd";
import {ListCards} from "components/ListCards/ListCards"
import SwiperCore,{Scrollbar,Lazy} from "swiper";
import "./Cinema.scss"

SwiperCore.use([Scrollbar,Lazy])

export const Cinema = (props) => {

const { DSHeThongRap, DSCumRap, DSLichChieu, handleSetDSCumRap, handleSetDSLichChieu } = props;
let [maHeThongRap,setMaHeThongRap] = useState(0);
let [maCumRap,setMaCumRap] = useState(0);

const renderHeThongRap = () =>{
    return DSHeThongRap?.map((rap,index)=>{
        
        const active = index === maHeThongRap ? "active" : "";

        return <div className={`cinema__logo ${active}`} key={index} style={{width:"80px",height:"100px"}} onClick={()=>{
            handleSetDSCumRap(rap.maHeThongRap);
            setMaHeThongRap(index);
            setMaCumRap(0);
        }}>
            <img src={rap.logo} alt={rap.tenHeThongRap} width="100%" height="100%" />
        </div>
    })
}

const renderCumRap = () =>{
    return <ListCards data={DSCumRap} scrollbar lazy slidesPerView={5} direction="vertical" slidesPerColumnFill="column" slidesPerGroup={1}
    tag="div" >
        {(cumrap,index) =>{

            const active = index === maCumRap ? "active" : "";

            return <div className={`cinema__branch ${active}`} onClick={()=>{
                    handleSetDSLichChieu(cumrap.maHeThongRap,cumrap.maCumRap);
                    setMaCumRap(index);
                }}>
                <div className="cinema__branch__img">
                    <img src="https://s3img.vcdn.vn/123phim/2018/09/bhd-star-bitexco-15379552241200.jpg" alt={cumrap.tenCumRap} width="100%" height="100%" />
                </div>
                <div className="cinema__branch__info">
                    <h3>{cumrap.tenCumRap}</h3>
                    <p>Địa Chỉ: {cumrap.diaChi}</p>
                    <p>[Chi Tiết]</p>
                </div>
            </div>
        }}
    </ListCards>
 } 

 const renderLichChieu = () =>{
    return <ListCards data={DSLichChieu} scrollbar lazy slidesPerView={4} direction="vertical" slidesPerGroup={1} freeMode="true"
    slidesPerColumnFill="column" 
    tag="div" >
        {(phim) =>{
            return <div className="cinema__schedule">
                <div className="cinema__branch__img">
                    <img src={phim.hinhAnh} alt={phim.tenPhim} width="20%" height="100%" />
                    <div className="cinema__branch__info">
                    <h3>{phim.tenPhim}</h3>
                </div>
                </div>
            </div>
        }}
    </ListCards>
 }

  return <section className="cinema">
      <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
          <Col span={3}>
              <Space direction="vertical" size="large" style={{width:"100%"}}>
                {renderHeThongRap()}
              </Space> 
          </Col>
          <Col span={9}>
              {renderCumRap()}
          </Col>
          <Col span={12}>
            {renderLichChieu()}
          </Col>
      </Row>
  </section>;
};
