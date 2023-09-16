import { BoardSwitchActionType } from '@/redux/action_types/boardSwitchTypes';

export interface FindGroupSwitchAction {
  type: BoardSwitchActionType.FIND_GROUP_SWITCH;
}

export interface FindTeamateSwitchAction {
  type: BoardSwitchActionType.FiND_TEAMATE_SWITCH;
}

export type BoardSwitchActions = FindGroupSwitchAction | FindTeamateSwitchAction;
