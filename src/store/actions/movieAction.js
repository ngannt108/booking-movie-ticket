import axios from "axios";
import {
  GET_GIO_CHIEU,
  GET_MOVIE_DETAIL,
  GET_MOVIE_DETAIL_CLUSTER,
  GET_MOVIE_LIST_NOW_SHOWING,
  GET_NGAY_XEM,
  GET_RAP,
  LAY_CHI_TIET,
  REMOVE_CURRENT_MOVIE_DETAIL,
} from "../const/movieConst";

export const getMovieListNowShowingAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://api-booking-movie-ticket.herokuapp.com/movie`,
        method: "GET",
      });
      //   console.log(res.data);
      dispatch({
        type: GET_MOVIE_LIST_NOW_SHOWING,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMovieDetailAction = (biDanh, setMovie) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://api-booking-movie-ticket.herokuapp.com/movie/${biDanh}`,
        method: "GET",
      });
      setMovie(res.data[0]);
      console.log("data", res.data[0]);
      dispatch({
        type: GET_MOVIE_DETAIL,
        payload: res.data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
}; //XONG

export const getMovieDetailClusterAction = (rap) => {
  return {
    type: GET_MOVIE_DETAIL_CLUSTER,
    payload: rap,
  };
};

export const removeCurrentMovieDetailAction = () => {
  return {
    type: REMOVE_CURRENT_MOVIE_DETAIL,
  };
};
// --------------- BOOKING_TOOL ---------------------
export const getRapAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
        method: "GET",
      });
      dispatch({
        type: GET_RAP,
        payload: res.data,
      });
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getNgayXemAction = (maCumRap) => {
  return {
    type: GET_NGAY_XEM,
    payload: maCumRap,
  };
};

export const getGioChieuAction = (ngayXem) => {
  return {
    type: GET_GIO_CHIEU,
    payload: ngayXem,
  };
};

export const layChiTietAction = (ngayXem, gioChieu) => {
  return {
    type: LAY_CHI_TIET,
    payload: [ngayXem, gioChieu],
  };
};
