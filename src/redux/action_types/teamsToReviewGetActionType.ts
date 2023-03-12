import { ActionType } from "typesafe-actions";
import * as actions from '@/redux/action/teamsToReviewGetAction'
import { AsyncState } from "@/lib/reducerUtils";
import TeamBriefDto from "@/model/Team/TeamBriefDto";

export type TeamsToReviewGetActionType = ActionType<typeof actions>
export type TeamsToReviewGetActionState = {
    teamsToReviewGetResult: AsyncState<Array<TeamBriefDto>, Error>
}