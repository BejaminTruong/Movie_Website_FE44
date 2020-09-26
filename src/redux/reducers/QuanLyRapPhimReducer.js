import {LAY_THONG_TIN_Cinema,Update_Thong_Tin_Cum_Rap_Lich_Chieu} from "redux/types/QuanLyRapPhimType";
const initialState = {
    DSHeThongRap:[],
    DSCumRap: [],
    DSLichChieu: [],
}

export default (state = initialState,action) => {
    switch (action.type) {

    case LAY_THONG_TIN_Cinema:
        return { ...state, DSHeThongRap: action.DSHeThongRap, DSCumRap: action.DSCumRap, DSLichChieu: action.DSLichChieu }
    case Update_Thong_Tin_Cum_Rap_Lich_Chieu:
        return {...state, DSCumRap: action.DSCumRap, DSLichChieu: action.DSLichChieu}
    case "ERROR":
        return;
    default:
        return state
    }
}
