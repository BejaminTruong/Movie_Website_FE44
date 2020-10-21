import React from 'react'
import { DetailSchedule } from '../DetailSchedule/DetailSchedule';
import { DetailInformation } from '../DetailInformation/DetailInformation';

export const DetailCinema = (props) => {

    const { handleActive, setHandleActive } = props;
    return (<>
        <div className="detail__cinema__title" id="booking__info">
            <span className={handleActive === 0 || handleActive === 1 ? "active" : ""} onClick={()=>setHandleActive(1)}>Lịch Chiếu</span>
            <span className={handleActive === 2 ? "active" : ""} onClick={()=>setHandleActive(2)}>Thông Tin</span>
        </div>
        {
            handleActive === 1 || handleActive === 0 ? <DetailSchedule /> :  <DetailInformation />
        }           
    </>)
}
