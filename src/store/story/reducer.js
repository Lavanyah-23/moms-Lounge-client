import { FETCH_STORY_SUCCESS, FETCH_STORY_DETAILS } from "./actions";

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
      
       
    default:
      return state;
  }
};
export default story;
