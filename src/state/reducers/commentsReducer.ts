import { IComment } from "../../Types/ISightings";
import { ActionComments, ActionType } from "../action-types/actionTypes";
import { updateCommentAction } from "../actions/actions";

const initialState: IComment[] = [];

const commentReducer = (
  state: IComment[] = initialState,
  action: updateCommentAction
) => {
  switch (action.type) {
    case ActionComments.UPDATE_COMMENTS:
      return action.payload;
    default:
      return state;
  }
};

export default commentReducer;
