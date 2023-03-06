import Team from "@/model/Team/Team"
import TeamRequestDto from "@/model/Team/TeamRequestDto"
import { createAsyncAction } from "typesafe-actions"

export const TEAM_CREATE = 'TEAM_CREATE'
export const  TEAM_CREATE_SUCCESS = 'TEAM_CREATE_SUCCESS'
export const  TEAM_CREATE_ERROR = 'TEAM_CREATE_ERROR'
export const teamCreateAsyncAction = createAsyncAction(
    TEAM_CREATE,
    TEAM_CREATE_SUCCESS,
    TEAM_CREATE_ERROR
)<TeamRequestDto, Team, Error>()