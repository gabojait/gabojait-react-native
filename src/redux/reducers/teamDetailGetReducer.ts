import createAsyncThunk from '@/lib/createAsyncThunk'
import {asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import {createReducer} from 'typesafe-actions'
import {teamDetailGetAsyncAction} from '../action/teamDetailGetAction'
import {TeamDetailGetActionType, TeamDetailGetState} from '../action_types/teamDetailGetActionType'
import * as teamApi from '@/data/api/team'

const initialState: TeamDetailGetState = {
  teamDetailGetResult: asyncState.initial(),
}

export const getTeamDetail = createAsyncThunk(teamDetailGetAsyncAction, teamApi.getTeamDetail)

export const teamDetailGetReducer = createReducer<TeamDetailGetState, TeamDetailGetActionType>(
  initialState,
).handleAction(
  [
    teamDetailGetAsyncAction.request,
    teamDetailGetAsyncAction.success,
    teamDetailGetAsyncAction.failure,
  ],
  createAsyncReducer(teamDetailGetAsyncAction, 'teamDetailGetResult'),
)
