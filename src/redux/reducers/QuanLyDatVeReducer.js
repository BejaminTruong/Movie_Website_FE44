import { LAY_CHI_TIET_PHONG_VE,DAT_VE,TAO_LICH_CHIEU } from "redux/types/QuanLyDatVeType";

const initialState = {
    thongTinPhim: {},
    danhSachGhe:  [],
    danhSachGheDat: [],
}

export default (state = initialState, action) => {
    switch (action.type) {

    case LAY_CHI_TIET_PHONG_VE:
        return { ...state,thongTinPhim: action.thongTinPhim,danhSachGhe: action.danhSachGhe}
    case DAT_VE:
        return { ...state}
    default:
        return state
    }
}
