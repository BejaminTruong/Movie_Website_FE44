import {quanLyRapSerVice} from "services/QuanLyRapService";
import {LAY_THONG_TIN_Cinema,Update_Thong_Tin_Cum_Rap_Lich_Chieu} from "redux/types/QuanLyRapPhimType";
import {groupID_Cinema,CinemaID} from "configs/setting"

import axios from "axios";

export const LayThongTinCinema= () => {
    return (dispatch) => {
        const requestOne = quanLyRapSerVice.layThongTinHeThongRap();
        const requestTwo = quanLyRapSerVice.layThongTinCumRap(CinemaID);
        const requestThree = quanLyRapSerVice.layThongTinLichChieuTheoCumRap(CinemaID, groupID_Cinema);

        axios.all([requestOne, requestTwo,requestThree]).then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            const responseThree = responses[2];

            dispatch({
                type:LAY_THONG_TIN_Cinema,
                DSHeThongRap: responseOne.data,
                DSCumRap: responseTwo.data,
                DSLichChieu: responseThree.data[0].lstCumRap
            })

        })).catch(errors => {
            console.log(errors)
            dispatch({
                type: "ERROR",
            });
        })
    }
}

export const handleSetDSCumRap = (maHeThongRap) => {
    return (dispatch) => {
        const requestOne = quanLyRapSerVice.layThongTinCumRap(maHeThongRap);
        const requestTwo = quanLyRapSerVice.layThongTinLichChieuTheoCumRap(maHeThongRap, groupID_Cinema);

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];

            dispatch({
                type:Update_Thong_Tin_Cum_Rap_Lich_Chieu,
                DSCumRap: responseOne.data,
                DSLichChieu: responseTwo.data[0].lstCumRap,
            })
        })).catch(errors => {
            console.log(errors)
            dispatch({
                type: "ERROR",
            });
        })
    }
};
