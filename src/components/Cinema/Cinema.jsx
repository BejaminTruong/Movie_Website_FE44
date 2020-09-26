import React, { useState } from "react";
import { Row, Col, Space } from "antd";
import {ListCards} from "components/ListCards/ListCards"
import moment from "moment"
import SwiperCore,{Scrollbar,Lazy,Mousewheel} from "swiper";
import "swiper/swiper.scss"
import "./Cinema.scss"

SwiperCore.use([Scrollbar,Lazy,Mousewheel])

export const Cinema = (props) => {

const { DSHeThongRap, DSCumRap, DSLichChieu, handleSetDSCumRap } = props;
let [maHeThongRap,setMaHeThongRap] = useState(0);
let [maCumRap,setMaCumRap] = useState(0);

const renderHeThongRap = () =>{
    return DSHeThongRap?.map((rap,index)=>{
        
        const active = index === maHeThongRap ? "active" : "";

        return <div className={`cinema__logo ${active}`} key={index} onClick={()=>{
            handleSetDSCumRap(rap.maHeThongRap);
            setMaHeThongRap(index);
            setMaCumRap(0);
        }}>
            <img src={rap.logo} alt={rap.tenHeThongRap} width="100%" height="100%" />
        </div>
    })
}

const renderCumRap = () =>{
    return <ListCards data={DSCumRap} scrollbar={{draggable:true,dragSize:"auto"}} lazy direction="vertical" freeMode tag="div" mousewheel >
        {(cumrap,index) =>{

            const active = index === maCumRap ? "active" : "";

            return <div className={`cinema__branch ${active}`} key={index} onClick={()=>{
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

    const LichChieu = DSLichChieu?.find(item => item.maCumRap === DSCumRap[maCumRap].maCumRap);

    if(LichChieu){
        return <ListCards data={LichChieu.danhSachPhim} scrollbar freeMode lazy direction="vertical" tag="div" mousewheel>
            {(phim,index) =>{
                return <div className="cinema__schedule" key={index}>
                    <div className="cinema__schedule__img">
                        <img src={phim.hinhAnh} alt={phim.tenPhim} />
                        <div className="cinema__schedule__content">
                            <h3>{phim.tenPhim}</h3>
                            <div className="cinema__schedule_info">
                                {phim.lstLichChieuTheoPhim.map((item,index)=>{
                                    return <div key={index} className="schedule__second">
                                        <span>{moment(item.ngayChieuGioChieu).format('hh:mm A')}</span>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }}
        </ListCards>
    }
    return <></>
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
