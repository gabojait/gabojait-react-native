import { AnyAsyncActionCreator, asyncState, createAsyncReducer } from '@/lib/reducerUtils';
import { createAction, createReducer, getType } from 'typesafe-actions';
import { MutationType, ProfileAction, ProfileState } from '../action_types/profileActionTypes';
import * as profileApi from '@/data/api/profile';
import {
  getProfileAsyncAction,
  setProfileVisibilityAsyncAction,
  CREATE_SKILL,
  CREATE_EDUCATION,
  CREATE_PORTFOLIO,
  CREATE_WORK,
  DELETE_EDUCATION,
  DELETE_SKILL,
  DELETE_WORK,
  UPDATE_EDUCATION,
  UPDATE_SKILL,
  UPDATE_WORK,
  DELETE_PORTFOLIO,
  UPDATE_PORTFOLIO,
} from '../action/profileActions';
import createAsyncThunk from '@/lib/createAsyncThunk';
import Work from '@/data/model/Profile/Work';
import Education from '@/data/model/Profile/Education';
import Skill from '@/data/model/Profile/Skill';
import Portfolio from '@/data/model/Profile/Portfolio';

const initialState: ProfileState = {
  userProfile: asyncState.initial(),
  educations: [],
  works: [],
  portfolios: [],
  skills: [],
  description: 'DEFAULT_DESCRIPTION',
};

export const getProfile = createAsyncThunk(getProfileAsyncAction, profileApi.getProfile);
export const setProfileVisibility = createAsyncThunk(
  getProfileAsyncAction,
  profileApi.setProfileVisibility,
);

export const profileReducer = createReducer<ProfileState, ProfileAction>(initialState, {
  // [SET_EDUCATIONS]: (state, action) => {
  //   console.log(action);
  //   return { ...state, educations: action.payload as Education[] };
  // },
  [CREATE_WORK]: (state, action) => ({
    ...state,
    works: [...state.works, { data: action.payload, mutationType: 'create' }],
  }),
  [UPDATE_WORK]: (state, action) => ({
    ...state,
    works: [...state.works, { data: action.payload.dataToUpdate, mutationType: 'update' }],
  }),
  [DELETE_WORK]: (state, action) => ({
    ...state,
    works: [...state.works, { data: { workId: action.payload } as Work, mutationType: 'delete' }],
  }),
  [CREATE_EDUCATION]: (state, action) => ({
    ...state,
    educations: [...state.educations, { data: action.payload, mutationType: 'create' }],
  }),
  [UPDATE_EDUCATION]: (state, action) => ({
    ...state,
    educations: [
      ...state.educations,
      { data: action.payload.dataToUpdate, mutationType: 'update' },
    ],
  }),
  [DELETE_EDUCATION]: (state, action) => ({
    ...state,
    educations: [
      ...state.educations,
      { data: { educationId: action.payload } as Education, mutationType: 'delete' },
    ],
  }),
  [CREATE_SKILL]: (state, action) => ({
    ...state,
    skills: [...state.skills, { data: action.payload, mutationType: 'create' }],
  }),
  [UPDATE_SKILL]: (state, action) => ({
    ...state,
    skills: [...state.skills, { data: action.payload.dataToUpdate, mutationType: 'update' }],
  }),
  [DELETE_SKILL]: (state, action) => ({
    ...state,
    skills: [
      ...state.skills,
      { data: { skillId: action.payload } as Skill, mutationType: 'delete' },
    ],
  }),
  [CREATE_PORTFOLIO]: (state, action) => ({
    ...state,
    portfolios: [...state.portfolios, { data: action.payload, mutationType: 'create' }],
  }),
  [UPDATE_PORTFOLIO]: (state, action) => ({
    ...state,
    portfolios: [
      ...state.portfolios,
      { data: action.payload.dataToUpdate, mutationType: 'update' },
    ],
  }),
  [DELETE_PORTFOLIO]: (state, action) => ({
    ...state,
    portfolios: [
      ...state.portfolios,
      { data: { portfolioId: action.payload } as Portfolio, mutationType: 'delete' },
    ],
  }),
})
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
  );
