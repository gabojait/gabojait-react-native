import { BoardSwitchActionType } from '@/redux/action_types/boardSwitchTypes';

export interface FindGroupSwitchAction {
  type: BoardSwitchActionType.FIND_GROUP_SWITCH;
}

export interface FindTeammateSwitchAction {
  type: BoardSwitchActionType.FIND_TEAMMATE_SWITCH;
}

export type BoardSwitchActions = FindGroupSwitchAction | FindTeammateSwitchAction;
