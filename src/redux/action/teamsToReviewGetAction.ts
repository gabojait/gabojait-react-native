import TeamBriefDto from "@/model/Team/TeamBriefDto"
import { createAsyncAction } from "typesafe-actions"

export const TEAMS_TO_REVIEW = 'TEAMS_TO_REVIEW'
export const TEAMS_TO_REVIEW_SUCCESS = 'TEAMS_TO_REVIEW_SUCCESS'
export const TEAMS_TO_REVIEW_ERROR = 'TEAMS_TO_REVIEW_ERROR'
export const teamsToReviewGetAsyncAction = createAsyncAction(
    TEAMS_TO_REVIEW,
    TEAMS_TO_REVIEW_SUCCESS,
    TEAMS_TO_REVIEW_ERROR
)<null, Array<TeamBriefDto>, Error>()