import { ActionType } from "typesafe-actions";
import * as actions from '@/redux/action/applyToTeamAction'
import { AsyncState } from "@/lib/reducerUtils";

export type ApplyToTeamActionType = ActionType<typeof actions>
export type ApplyToTeamState = {
    applyToTeamResult: AsyncState<{},Error>
}