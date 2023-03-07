import { createAsyncAction } from "typesafe-actions"

export const APPLY_TO_TEAM = 'APPLY_TO_TEAM'
export const APPLY_TO_TEAM_SUCCESS = 'APPLY_TO_TEAM_SUCCESS'
export const APPLY_TO_TEAM_ERROR = 'APPLY_TO_TEAM_ERROR'
export const applyToTeamAsyncAction = createAsyncAction(
    APPLY_TO_TEAM,
    APPLY_TO_TEAM_SUCCESS,
    APPLY_TO_TEAM_ERROR
)<any, {}, Error>()