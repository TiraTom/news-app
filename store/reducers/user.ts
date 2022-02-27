import { Article } from "../../types/article";
import { AddClipAction, DeleteClipAction } from "../actions/user";

const initialState: AppState = {
  clips: []
}

type AppState = {
  clips: Article[]
}

type Actions = (AddClipAction | DeleteClipAction)

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case 'ADD_CLIP':
      return {
        ...state,
        clips: [...state.clips, action.clip]
      }
    case 'DELETE_CLIP':
      return {
        ...state,
        clips: state.clips.filter(clip => clip.url !== action.clip.url)
      }
    default:
      return state;
  }
}

export default reducer;