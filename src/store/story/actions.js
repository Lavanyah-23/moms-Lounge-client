import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectUser } from "../user/selectors";
import {
  appDoneLoading,
  appLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { showModal, hideModal } from "../user/actions";
export const FETCH_STORY_SUCCESS = "FETCH_STORY_SUCCESS";
export const FETCH_STORY_DETAILS = "FETCH_STORY_DETAILS";
export const UPDATE_STORY = "UPDATE_STORY";
export const ADD_STORY = "ADD_STORY";

export const fetch_Story_Success = (stories) => ({
  type: FETCH_STORY_SUCCESS,
  payload: stories,
});

export const updatedStory = (story) => {
  return {
    type: UPDATE_STORY,
    payload: story,
  };
};
export const addedStory = (story) => {
  return {
    type: ADD_STORY,
    payload: story,
  };
};

export const fetch_Story_Details = (stories) => ({
  type: FETCH_STORY_DETAILS,
  payload: stories,
});

export const fetchAllStories = () => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${apiUrl}/stories`);

      // console.log(response.data);
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
      // console.log("API call", response.data);
      dispatch(fetch_Story_Details(response.data));
    } catch (e) {
      //console.log(e.message);
    }
  };
};

export const addMyStory = (title, description, imageUrl) => {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(
        `${apiUrl}/stories`,
        {
          title,
          imageUrl,
          description,
        },
        {
          headers: {
            authorization: "Bearer " + getState().user.token,
          },
        }
      );
      //console.log("response", response);
      dispatch(addedStory(response.data.data));
      dispatch(hideModal());
      dispatch(
        showMessageWithTimeout("success", true, "Created New Story", 3000)
      );
    } catch (e) {
      console.log(e);
      dispatch(setMessage("error", false, e.message));
    }
  };
};

export const updateMyStory = (title, description, imageUrl, id) => {
  return async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());

      const response = await axios.put(
        `${apiUrl}/stories/${id}`,
        {
          title,
          description,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);

      dispatch(
        showMessageWithTimeout("success", false, "update successfull", 3000)
      );
      //console.log("responseupdated", response);
      dispatch(updatedStory(response.data));
      dispatch(hideModal());
      dispatch(appDoneLoading());
    } catch (e) {
      console.log(e.message);
    }
  };
};

// export const deleteStory = (storyId) => {
//   return async (dispatch, getState) => {
//     dispatch(appLoading());
//     const { space, token } = selectUser(getState());
//     const spaceId = space.id;
//     // make an axios request to delete
//     // and console.log the response if success
//     try {
//       const response = await myAxios.delete(
//         `/spaces/${spaceId}/stories/${storyId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Story deleted?", response.data);
//       dispatch(storyDeleteSuccess(storyId));
//       dispatch(appDoneLoading());
//     } catch (e) {
//       console.error(e);
//     }
//   };
// };

// export const postStory = (name, content, imageUrl) => {
//   return async (dispatch, getState) => {
//     try {
//       const { space, token } = selectUser(getState());
//       // console.log(name, content, imageUrl);
//       dispatch(appLoading());

//       const response = await axios.post(
//         `${apiUrl}/spaces/${space.id}/stories`,
//         {
//           name,
//           content,
//           imageUrl,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // console.log("Yep!", response);
//       dispatch(
//         showMessageWithTimeout("success", false, response.data.message, 3000)
//       );
//       dispatch(storyPostSuccess(response.data.story));
//       dispatch(appDoneLoading());
//     } catch (e) {
//       console.log(e.message);
//     }
//   };
// };
