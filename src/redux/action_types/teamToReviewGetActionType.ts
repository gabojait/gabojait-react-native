import { ActionType } from "typesafe-actions";
import * as actions from '@/redux/action/teamToReviewGetAction'
import { AsyncState } from "@/lib/reducerUtils";
import TeamBriefDto from "@/model/Team/TeamBriefDto";

export type TeamToReviewGetActionType = ActionType<typeof actions>
export type TeamToReviewGetActionState = {
    teamToReviewGetResult: AsyncState<Array<TeamBriefDto>, Error>
}