import { BoardSwitchActions } from '@/redux/action/boardSwitchActions';
import React from 'react';
import { BoardSwitchActionType } from '../action_types/boardSwitchTypes';

export interface BoardSwitchState {
  switchTitle: BoardSwitchActionType.FIND_TEAMMATE_SWITCH;
}

const initialStates = {
  switchTitle: BoardSwitchActionType.FIND_TEAMMATE_SWITCH,
} as BoardSwitchState;

const boardSwitchReducer = (
  state: BoardSwitchState = initialStates,
  action: BoardSwitchActions,
) => {
  switch (action.type) {
    case BoardSwitchActionType.FIND_GROUP_SWITCH: {
      return {
        ...state,
        switchTitle: BoardSwitchActionType.FIND_TEAMMATE_SWITCH,
      };
    }
    case BoardSwitchActionType.FIND_TEAMMATE_SWITCH: {
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
