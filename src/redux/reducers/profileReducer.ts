import {asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import {createAction, createReducer, getType} from 'typesafe-actions'
import {ProfileAction, ProfileState} from '../action_types/profileActionTypes'
import * as profileApi from '@/api/profile'
import {
  addEducationAsync,
  addPortfolioFile,
  addPortfolioLink,
  addSkillAsyncAction,
  addWorkAsync,
  deleteEducationAsync,
  deleteSkillAsync,
  deleteWorkAsync,
  getProfileAsyncAction,
  setEducationAndCareerAction,
  setProfileVisibilityAsyncAction,
  SET_EDUCATION_AND_CAREER,
  SET_PROFILE_VISIBILITY_SUCCESS,
  updateEducationAsync,
  updatePortfolioFile,
  updatePortfolioLink,
  updateSkillAsync,
  updateWorkAsync,
} from '../action/profileActions'
import createAsyncThunk from '@/lib/createAsyncThunk'
import {SEND_AUTH_CODE_ERROR} from '../action/register'
import ProfileViewDto from '@/model/Profile/CompletedTeamDto'
import Education from '@/model/Profile/Education'
import Work from '@/model/Profile/Work'

const initialState: ProfileState = {userProfile: asyncState.initial(), educations: [], careers: []}

export const getProfile = createAsyncThunk(getProfileAsyncAction, profileApi.getProfile)
export const setProfileVisibility = createAsyncThunk(
  getProfileAsyncAction,
  profileApi.setProfileVisibility,
)

export const profileReducer = createReducer<ProfileState, ProfileAction>(initialState)
  // .handleAction(setEducationAndCareerAction, (state, action) => ({...state}))
  .handleAction(
    [getProfileAsyncAction.request, getProfileAsyncAction.success, getProfileAsyncAction.failure],
    createAsyncReducer(getProfileAsyncAction, 'userProfile'),
  )
  .handleAction(
    [
      setProfileVisibilityAsyncAction.request,
      setProfileVisibilityAsyncAction.success,
      setProfileVisibilityAsyncAction.failure,
    ],
    createAsyncReducer(setProfileVisibilityAsyncAction, 'userProfile'),
  )

  .handleAction(
    [addEducationAsync.request, addEducationAsync.success, addEducationAsync.failure],
    createAsyncReducer(addEducationAsync, 'userProfile'),
  )
  .handleAction(
    [updateEducationAsync.request, updateEducationAsync.success, updateEducationAsync.failure],
    createAsyncReducer(updateEducationAsync, 'userProfile'),
  )
  .handleAction(
    [deleteEducationAsync.request, deleteEducationAsync.success, deleteEducationAsync.failure],
    createAsyncReducer(deleteEducationAsync, 'userProfile'),
  )
  .handleAction(
    [addSkillAsyncAction.request, addSkillAsyncAction.success, addSkillAsyncAction.failure],
    createAsyncReducer(updateEducationAsync, 'userProfile'),
  )
  .handleAction(
    [updateSkillAsync.request, updateSkillAsync.success, updateSkillAsync.failure],
    createAsyncReducer(updateSkillAsync, 'userProfile'),
  )
  .handleAction(
    [deleteSkillAsync.request, deleteSkillAsync.success, deleteSkillAsync.failure],
    createAsyncReducer(deleteSkillAsync, 'userProfile'),
  )
  .handleAction(
    [addWorkAsync.request, addWorkAsync.success, addWorkAsync.failure],
    createAsyncReducer(addWorkAsync, 'userProfile'),
  )
  .handleAction(
    [updateWorkAsync.request, updateWorkAsync.success, updateWorkAsync.failure],
    createAsyncReducer(updateWorkAsync, 'userProfile'),
  )
  .handleAction(
    [deleteWorkAsync.request, deleteWorkAsync.success, deleteWorkAsync.failure],
    createAsyncReducer(deleteWorkAsync, 'userProfile'),
  )
  .handleAction(
    [addPortfolioFile.request, addPortfolioFile.success, addPortfolioFile.failure],
    createAsyncReducer(addPortfolioFile, 'userProfile'),
  )
  .handleAction(
    [updatePortfolioFile.request, updatePortfolioFile.success, updatePortfolioFile.failure],
    createAsyncReducer(updatePortfolioFile, 'userProfile'),
  )
  .handleAction(
    [addPortfolioLink.request, addPortfolioLink.success, addPortfolioLink.failure],
    createAsyncReducer(addPortfolioLink, 'userProfile'),
  )
  .handleAction(
    [updatePortfolioLink.request, updatePortfolioLink.success, updatePortfolioLink.failure],
    createAsyncReducer(updatePortfolioLink, 'userProfile'),
  )
