import TeamBriefDto from '@/data/model/Team/TeamBriefDto'
import {createAsyncAction} from 'typesafe-actions'

export const TEAM_TO_REVIEW = 'TEAM_TO_REVIEW'
export const TEAM_TO_REVIEW_SUCCESS = 'TEAM_TO_REVIEW_SUCCESS'
export const TEAM_TO_REVIEW_ERROR = 'TEAM_TO_REVIEW_ERROR'
export const teamToReviewGetAsyncAction = createAsyncAction(
  TEAM_TO_REVIEW,
  TEAM_TO_REVIEW_SUCCESS,
  TEAM_TO_REVIEW_ERROR,
)<string, TeamBriefDto, Error>()
