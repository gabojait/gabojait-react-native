import { ActionType } from "typesafe-actions";
import * as actions from '@/redux/action/teamGetAction'
import { AsyncState } from "@/lib/reducerUtils";
import Team from "@/model/Team/Team";

export type TeamGetActionType = ActionType<typeof actions>
export type TeamGetState = {
    teamGetResult: AsyncState<Array<Team>, Error>
}