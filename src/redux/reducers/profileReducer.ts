import {AnyAsyncActionCreator, asyncState, createAsyncReducer} from '@/lib/reducerUtils'
import {createAction, createReducer, getType} from 'typesafe-actions'
import {ProfileAction, ProfileState} from '../action_types/profileActionTypes'
import * as profileApi from '@/api/profile'
import {
  addEducationAsync,
  addPortfolioFile,
  addPortfolioLink,
  addWorkAsync,
  deleteEducationAsync,
  deleteWorkAsync,
  getProfileAsyncAction,
  setProfileVisibilityAsyncAction,
  SET_EDUCATION_AND_WORK,
  SET_PROFILE_VISIBILITY_SUCCESS,
  updateEducationAsync,
  updatePortfolioFile,
  updatePortfolioLink,
  updateSkillAsync,
  updateWorkAsync,
  setEducations,
  SET_WORKS,
  SET_EDUCATIONS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_ERROR,
} from '../action/profileActions'
import createAsyncThunk from '@/lib/createAsyncThunk'
import {SEND_AUTH_CODE_ERROR} from '../action/register'
import Education from '@/model/Profile/Education'
import ProfileViewDto from '@/model/Profile/ProfileViewDto'
import {AnyAction} from 'redux'
import Work from '@/model/Profile/Work'

const initialState: ProfileState = {userProfile: asyncState.initial(), educations: [], works: []}

export const getProfile = createAsyncThunk(getProfileAsyncAction, profileApi.getProfile)
export const setProfileVisibility = createAsyncThunk(
  getProfileAsyncAction,
  profileApi.setProfileVisibility,
)

export const profileReducer = createReducer<ProfileState, ProfileAction>(initialState, {
  [SET_EDUCATION_AND_WORK]: (state, action) => ({...state}),
  [SET_EDUCATIONS]: (state, action) => {
    console.log(action)
    return {...state, educations: action.payload as Education[]}
  },
  [SET_WORKS]: (state, action) => ({...state, works: action.payload as Work[]}),
})
  .handleAction(
    [getProfileAsyncAction.request, getProfileAsyncAction.success, getProfileAsyncAction.failure],
    createAsyncReducer(getProfileAsyncAction, 'userProfile', (state, action) => ({
      ...state,
      userProfile: asyncState.success(action.payload),
      educations: action.payload.educations,
      works: action.payload.works,
    })),
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
    [updateSkillAsync.request, updateSkillAsync.success, updateSkillAsync.failure],
    createAsyncReducer(updateSkillAsync, 'userProfile'),
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
