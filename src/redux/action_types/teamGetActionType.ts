import { ActionType } from "typesafe-actions";
import * as actions from '@/redux/action/teamGetAction'
import { AsyncState } from "@/lib/reducerUtils";
import TeamListResponseDto from "@/model/Team/TeamListResponseDto";

export type TeamGetActionType = ActionType<typeof actions>
export type TeamGetState = {
    teamGetResult: AsyncState<TeamListResponseDto, Error>
}