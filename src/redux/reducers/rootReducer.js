import { combineReducers } from "redux";
import QuanLyNguoiDungReducer from "./QuanLyNguoiDungReducer";
import QuanLyRapPhimReducer from "./QuanLyRapPhimReducer";
import QuanLyPhimReducer from "./QuanLyPhimReducer";
import QuanLyDatVeReducer from "./QuanLyDatVeReducer";

export const rootReducer = combineReducers({
  QuanLyNguoiDungReducer,
  QuanLyRapPhimReducer,
  QuanLyPhimReducer,
  QuanLyDatVeReducer
});
