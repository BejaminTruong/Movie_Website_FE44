import { combineReducers } from "redux";
import QuanLyNguoiDungReducer from "./QuanLyNguoiDungReducer";
import QuanLyRapPhimReducer from "./QuanLyRapPhimReducer";
import QuanLyPhimReducer from "./QuanLyPhimReducer";

export const rootReducer = combineReducers({
  QuanLyNguoiDungReducer,
  QuanLyRapPhimReducer,
  QuanLyPhimReducer
});
