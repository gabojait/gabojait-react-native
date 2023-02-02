import { CountActionType } from "../action_types/countTypes";

export interface CountIncreaseAction {
    type: CountActionType.INCREMENT
}

export interface CountDecreaseAction {
    type: CountActionType.DECREMENT
}

export type CountActions = CountIncreaseAction | CountDecreaseAction