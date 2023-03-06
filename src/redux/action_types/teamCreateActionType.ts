import { Action, ActionType } from "typesafe-actions";
import * as actions from '@/redux/action/teamCreateAction'
import { AsyncState } from "@/lib/reducerUtils";
import Team from "@/model/Team/Team";

export type TeamCreateActionType = ActionType<typeof actions>
export type TeamCreateState = {
    teamCreateResult: AsyncState<Team, Error>
}