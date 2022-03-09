import { apiUrl } from "../../config/constants";
import axios from "axios";
export const FETCH_STORY_SUCCESS = "FETCH_STORY_SUCCESS";
export const FETCH_STORY_DETAILS = "FETCH_STORY_DETAILS";
export const fetch_Story_Success = (stories) => ({
  type: FETCH_STORY_SUCCESS,
  payload: stories,
});

export const fetch_Story_Details = (stories) => ({
  type: FETCH_STORY_DETAILS,
  payload: stories,
});

export const fetchAllStories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/stories`);

      console.log(response.data);
      dispatch(fetch_Story_Success(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const fetchStoryById = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/stories/${id}`);
      console.log(response.data);
      dispatch(fetch_Story_Details(response.data));
    } catch (e) {
      console.log(e.message);
    }
  };
};
