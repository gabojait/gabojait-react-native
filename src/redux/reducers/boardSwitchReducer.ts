import { BoardSwitchActions } from '@/redux/action/boardSwitchActions';
import React from 'react';
import { BoardSwitchActionType } from '../action_types/boardSwitchTypes';

export interface BoardSwitchState {
  switchTitle: BoardSwitchActionType.FiND_TEAMATE_SWITCH;
}

const initialStates = {
  switchTitle: BoardSwitchActionType.FiND_TEAMATE_SWITCH,
} as BoardSwitchState;

const boardSwitchReducer = (
  state: BoardSwitchState = initialStates,
  action: BoardSwitchActions,
) => {
  switch (action.type) {
    case BoardSwitchActionType.FIND_GROUP_SWITCH: {
      return {
        ...state,
        switchTitle: BoardSwitchActionType.FiND_TEAMATE_SWITCH,
      };
    }
    case BoardSwitchActionType.FiND_TEAMATE_SWITCH: {
      return {
        ...state,
        switchTitle: BoardSwitchActionType.FIND_GROUP_SWITCH,
      };
    }
    default:
      return state;
  }
};
export default boardSwitchReducer;
