import {
  FETCH_STORY_SUCCESS,
  FETCH_STORY_DETAILS,
  ADD_STORY,
  UPDATE_STORY,
} from "./actions";

const initialState = {
  allStories: [],
  storyDetails: {},
};

const story = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORY_SUCCESS:
      return {
        ...state,
        allStories: [...action.payload],
      };
    case FETCH_STORY_DETAILS:
      return {
        ...state,
        storyDetails: { ...state.storyDetails, ...action.payload },
      };

    case ADD_STORY:
      return {
        ...state,
        allStories: [...state.allStories, action.payload],
      };
    case UPDATE_STORY:
      const updatedAllStories = state.allStories.map((story) => {
        return story.id === action.payload.id ? action.payload : story;
      });

      return {
        ...state,
        allStories: updatedAllStories,
      };
    default:
      return state;
  }
};
export default story;
