import {LAY_CHI_TIET_PHIM,LAY_THONG_TIN_PHIM} from "redux/types/QuanLyPhimType";

const initialState = {
    chiTietPhim: {},
    lichChieuPhim: []
}

export default (state = initialState, action) => {
    switch (action.type) {
    case LAY_CHI_TIET_PHIM:
        return { ...state, chiTietPhim: action.data }
    case LAY_THONG_TIN_PHIM:
        return {... state,lichChieuPhim: action.data }
    default:
        return state
    }
}
