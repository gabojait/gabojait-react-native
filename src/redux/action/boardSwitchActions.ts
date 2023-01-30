import {BoardSwitchActionType} from '@/redux/action_types/boardSwitchTypes'
interface GroupSwitchAction {
    type: BoardSwitchActionType.GROUP_SWITCH
}

interface TeamateSwitchAction {
    type: BoardSwitchActionType.TEAMATE_SWITCH
}

export type BoardSwitchActions = GroupSwitchAction | TeamateSwitchAction