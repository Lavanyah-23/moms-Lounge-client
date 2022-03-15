import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  STORY_UPDATED,
  SHOW_MODAL,
  HIDE_MODAL,
  SET_CURRENT_STORY,
  RESET_CURRENT_STORY,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  isModalOpen: false,
  modalOp: "",
  currentStory: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case SHOW_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalOp: action.payload,
      };
    case HIDE_MODAL:
      return {
        ...state,
        isModalOpen: false,
        modalOp: "",
        currentStory: null,
      };
    case SET_CURRENT_STORY:
      return {
        ...state,
        currentStory: { ...action.payload },
      };

    default:
      return state;
  }
};
