import { SIGN_OUT } from "../const/authConst";
import {
  GET_BOOK_TICKET_CHAIR,
  GET_PROFILE,
  UPDATE_PROFILE,
  CHANGE_PASSWORD,
} from "../const/profileConst";

const initialState = {
  profileUser: [],
  chairBookTicket: [],
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PROFILE: {
      state.profileUser = payload;
      return { ...state };
    }
    case SIGN_OUT: {
      state.profileUser = [];
      state.chairBookTicket = [];
      return { ...state };
    }
    case GET_BOOK_TICKET_CHAIR: {
      state.chairBookTicket = payload;
      //   console.log(state.chairBookTicket);
      return { ...state };
    }
    case UPDATE_PROFILE: {
      state.profileUser = payload;
      return { ...state };
    }
    case CHANGE_PASSWORD: {
      //state.profileUser = payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
