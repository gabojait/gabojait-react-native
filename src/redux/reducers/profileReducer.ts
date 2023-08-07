import {
  AnyAsyncActionCreator,
  AsyncStateModifiable,
  asyncState,
  createAsyncReducer,
} from '@/lib/reducerUtils';
import { createReducer } from 'typesafe-actions';
import { ProfileAction, ProfileState } from '../action_types/profileActionTypes';
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
  SET_POSITION,
  SET_DESCRIPTION,
  SET_PROFILE_VISIBILITY_SUCCESS,
  SET_PROFILE_VISIBILITY,
  setProfileImageAsyncAction,
  SET_PROFILE_IMAGE_SUCCESS,
} from '../action/profileActions';
import createAsyncThunk from '@/lib/createAsyncThunk';
import Work from '@/data/model/Profile/Work';
import Education from '@/data/model/Profile/Education';
import Skill from '@/data/model/Profile/Skill';
import Portfolio from '@/data/model/Profile/Portfolio';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';

const initialState: ProfileState = {
  userProfile: { ...asyncState.initial(), modified: false },
  // description: 'DEFAULT_DESCRIPTION',
  // position: 'none',
};

export const getProfile = createAsyncThunk(getProfileAsyncAction, profileApi.getMyProfile);
export const setProfileVisibility = createAsyncThunk(
  setProfileVisibilityAsyncAction,
  profileApi.setUserSeekingTeam,
);

export const profileReducer = createReducer<ProfileState, ProfileAction>(initialState, {
  [SET_DESCRIPTION]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        profileDescription: action.payload,
      },
    },
  }),
  [SET_POSITION]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        position: action.payload,
      },
    },
  }),
  [CREATE_WORK]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        works: [...(state.userProfile.data?.works ?? []), { ...action.payload, new: true }],
      },
    },
  }),
  [UPDATE_WORK]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        works: state.userProfile.data?.works?.map(work =>
          work.workId === action.payload.id ? action.payload.dataToUpdate : work,
        ),
      },
      modified: true,
    },
  }),
  [DELETE_WORK]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        works: state.userProfile.data?.works?.filter(work => work.workId !== action.payload),
      },
      modified: true,
    },
  }),
  [CREATE_EDUCATION]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        educations: [
          ...(state.userProfile.data?.educations ?? []),
          { ...action.payload, new: true },
        ],
      },
      modified: true,
    },
  }),
  [UPDATE_EDUCATION]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        educations: state.userProfile.data?.educations?.map(education =>
          education.educationId === action.payload.id ? action.payload.dataToUpdate : education,
        ),
      },
    },
  }),
  [DELETE_EDUCATION]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        educations: state.userProfile.data?.educations?.filter(
          education => education.educationId !== action.payload,
        ),
      },
    },
  }),
  [CREATE_SKILL]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        skills: [...(state.userProfile.data?.skills ?? []), { ...action.payload, new: true }],
      },
    },
  }),
  [UPDATE_SKILL]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        skills: state.userProfile.data?.skills?.map(skill =>
          skill.skillId === action.payload.id ? action.payload.dataToUpdate : skill,
        ),
      },
    },
  }),
  [DELETE_SKILL]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        skills: state.userProfile.data?.skills?.filter(skill => skill.skillId !== action.payload),
      },
    },
  }),
  [CREATE_PORTFOLIO]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        portfolios: [
          ...(state.userProfile.data?.portfolios ?? []),
          { ...action.payload, new: true },
        ],
      },
    },
  }),
  [UPDATE_PORTFOLIO]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        portfolios: state.userProfile.data?.portfolios?.map(portfolio =>
          portfolio.portfolioId === action.payload.id ? action.payload.dataToUpdate : portfolio,
        ),
      },
    },
  }),
  [DELETE_PORTFOLIO]: (state, action) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      data: {
        ...state.userProfile.data,
        portfolios: state.userProfile.data?.portfolios?.filter(
          portfolio => portfolio.portfolioId !== action.payload,
        ),
      },
    },
  }),
  [SET_PROFILE_VISIBILITY_SUCCESS]: (state, action) => ({
    ...state,
    userProfile: asyncState.success({
      ...state.userProfile.data,
      isSeekingTeam: !state.userProfile.data?.isSeekingTeam,
    }),
  }),
})
  .handleAction(
    [getProfileAsyncAction.request, getProfileAsyncAction.success, getProfileAsyncAction.failure],
    createAsyncReducer(getProfileAsyncAction, 'userProfile'),
  )
  .handleAction(
    [
      setProfileImageAsyncAction.request,
      setProfileImageAsyncAction.success,
      setProfileImageAsyncAction.failure,
    ],
    createAsyncReducer(setProfileImageAsyncAction, 'userProfile'),
  );
