import Team from '@/data/model/Team/Team'
import {createAsyncAction} from 'typesafe-actions'

export const TEAM_DETAIL_GET = 'TEAM_DETAIL_GET'
export const TEAM_DETAIL_GET_SUCCESS = 'TEAM_DETAIL_GET_SUCCESS'
export const TEAM_DETAIL_GET_ERROR = 'TEAM_DETAIL_GET_ERROR'
export const teamDetailGetAsyncAction = createAsyncAction(
  TEAM_DETAIL_GET,
  TEAM_DETAIL_GET_SUCCESS,
  TEAM_DETAIL_GET_ERROR,
)<string, Team, Error>()
