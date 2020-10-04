import {LAY_CHI_TIET_PHIM} from "redux/types/QuanLyPhimType";

const initialState = {
    chiTietPhim: {}
}

export default (state = initialState, action) => {
    switch (action.type) {

    case LAY_CHI_TIET_PHIM:
        return { ...state, chiTietPhim: action.data }
    default:
        return state
    }
}
