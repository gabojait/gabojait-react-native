import Team from '@/data/model/Team/Team'
import {createAsyncAction} from 'typesafe-actions'

export const TEAM_GET = 'TEAM_GET'
export const TEAM_GET_SUCCESS = 'TEAM_GET_SUCCESS'
export const TEAM_GET_ERROR = 'TEAM_GET_ERROR'
export const teamGetAsyncAction = createAsyncAction(TEAM_GET, TEAM_GET_SUCCESS, TEAM_GET_ERROR)<
  any,
  Array<Team>,
  Error
>()
