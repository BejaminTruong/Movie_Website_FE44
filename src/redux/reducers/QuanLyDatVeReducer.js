import { LAY_CHI_TIET_PHONG_VE,DAT_VE,TAO_LICH_CHIEU,THANH_TOAN,RESET_DATA} from "redux/types/QuanLyDatVeType";

const initialState = {
    thongTinPhim: {},
    danhSachGhe:  [],
    DatVe: {
        hangGhe: [],
        danhSachVe: [],
        tongTien: 0
    },
}

export default (state = initialState, action) => {
    switch (action.type) {

    case LAY_CHI_TIET_PHONG_VE:
        
        return { ...state,thongTinPhim: action.thongTinPhim,danhSachGhe: action.danhSachGhe}
    case DAT_VE:
        let updatedDatVe = {...state.DatVe};

        const index = updatedDatVe.danhSachVe.findIndex(ghe => ghe.maGhe === action.ghe.maGhe);

        if(index !== -1){
            updatedDatVe.danhSachVe.splice(index,1);
            updatedDatVe.hangGhe.splice(index,1);
            updatedDatVe.tongTien = updatedDatVe.danhSachVe.reduce((sum,curGhe) =>{
                return sum + (+curGhe.giaVe);
            },0);
        }
        else{
            updatedDatVe.danhSachVe.push(action.ghe);
            updatedDatVe.hangGhe.push(action.hangGhe);
            updatedDatVe.tongTien = updatedDatVe.danhSachVe.reduce((sum,curGhe) =>{
                return sum + (+curGhe.giaVe);
            },0);
        }
        return { ...state, DatVe: updatedDatVe}  
    case THANH_TOAN:
        const resetDatVe = {
            hangGhe: [],
            danhSachVe: [],
            tongTien: 0
        }
        return {...state, DatVe: resetDatVe}
    case TAO_LICH_CHIEU:
        return {...state}
    case RESET_DATA:
        const initialDatVe = {
            hangGhe: [],
            danhSachVe: [],
            tongTien: 0
        } 
        return {...state,DatVe: initialDatVe}
    default:
        return state
    }
}
