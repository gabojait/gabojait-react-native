import {Position} from '@/data/model/type/Position'
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto'
import Education from '@/data/model/Profile/Education'
import Portfolio from '@/data/model/Profile/Portfolio'
import Skill from '@/data/model/Profile/Skill'
import {createSlice} from '@reduxjs/toolkit'
import {createAction, createAsyncAction} from 'typesafe-actions'
import UpdateSkillPostionDto from '@/data/model/Profile/UpdateSkillPositionDto'
import Work from '@/data/model/Profile/Work'

/*------------- Profile View/Edit related --------------*/

export const GET_PROFILE = 'GET_PROFILE'
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS'
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR'

export const SET_PROFILE_VISIBILITY = 'SET_PROFILE_VISIBILITY'
export const SET_PROFILE_VISIBILITY_SUCCESS = 'SET_PROFILE_VISIBILITY_SUCCESS'
export const SET_PROFILE_VISIBILITY_ERROR = 'SET_PROFILE_VISIBILITY_ERROR'

// Skill actions
export const ADD_SKILL = 'ADD_SKILL'
export const ADD_SKILL_SUCCESS = 'ADD_SKILL_SUCCESS'
export const ADD_SKILL_ERROR = 'ADD_SKILL_ERROR'

export const DELETE_SKILL = 'DELETE_SKILL'
export const DELETE_SKILL_SUCCESS = 'DELETE_SKILL_SUCCESS'
export const DELETE_SKILL_ERROR = 'DELETE_SKILL_ERROR'

export const UPDATE_SKILL = 'UPDATE_SKILL'
export const UPDATE_SKILL_SUCCESS = 'UPDATE_SKILL_SUCCESS'
export const UPDATE_SKILL_ERROR = 'UPDATE_SKILL_ERROR'

// Work actions
export const ADD_WORK = 'ADD_WORK'
export const ADD_WORK_SUCCESS = 'ADD_WORK_SUCCESS'
export const ADD_WORK_ERROR = 'ADD_WORK_ERROR'

export const DELETE_WORK = 'DELETE_WORK'
export const DELETE_WORK_SUCCESS = 'DELETE_WORK_SUCCESS'
export const DELETE_WORK_ERROR = 'DELETE_WORK_ERROR'

export const UPDATE_WORK = 'UPDATE_WORK'
export const UPDATE_WORK_SUCCESS = 'UPDATE_WORK_SUCCESS'
export const UPDATE_WORK_ERROR = 'UPDATE_WORK_ERROR'

// Education actions
export const ADD_EDUCATION = 'ADD_EDUCATION'
export const ADD_EDUCATION_SUCCESS = 'ADD_EDUCATION_SUCCESS'
export const ADD_EDUCATION_ERROR = 'ADD_EDUCATION_ERROR'

export const DELETE_EDUCATION = 'DELETE_EDUCATION'
export const DELETE_EDUCATION_SUCCESS = 'DELETE_EDUCATION_SUCCESS'
export const DELETE_EDUCATION_ERROR = 'DELETE_EDUCATION_ERROR'

export const UPDATE_EDUCATION = 'UPDATE_EDUCATION'
export const UPDATE_EDUCATION_SUCCESS = 'UPDATE_EDUCATION_SUCCESS'
export const UPDATE_EDUCATION_ERROR = 'UPDATE_EDUCATION_ERROR'

// Todo: Change Request/Result Types!!!!!!
export const UPDATE_POSITION = 'UPDATE_POSITION'
export const UPDATE_POSITION_SUCCESS = 'UPDATE_POSITION_SUCCESS'
export const UPDATE_POSITION_ERROR = 'UPDATE_POSITION_ERROR'

export const DELETE_PROFILE_IMAGE = 'DELETE_PROFILE_IMAGE'
export const DELETE_PROFILE_IMAGE_SUCCESS = 'DELETE_PROFILE_IMAGE_SUCCESS'
export const DELETE_PROFILE_IMAGE_ERROR = 'DELETE_PROFILE_IMAGE_ERROR'

export const UPLOAD_PROFILE_IMAGE = 'UPLOAD_PROFILE_IMAGE'
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'UPLOAD_PROFILE_IMAGE_SUCCESS'
export const UPLOAD_PROFILE_IMAGE_ERROR = 'UPLOAD_PROFILE_IMAGE_ERROR'

// Portfolio Actions
export const DELETE_PORTFOLIO = 'DELETE_PORTFOLIO'
export const DELETE_PORTFOLIO_SUCCESS = 'DELETE_PORTFOLIO_SUCCESS'
export const DELETE_PORTFOLIO_ERROR = 'DELETE_PORTFOLIO_ERROR'

// PORTFOLIO_FILE actions
export const ADD_PORTFOLIO_FILE = 'ADD_PORTFOLIO_FILE'
export const ADD_PORTFOLIO_FILE_SUCCESS = 'ADD_PORTFOLIO_FILE_SUCCESS'
export const ADD_PORTFOLIO_FILE_ERROR = 'ADD_PORTFOLIO_FILE_ERROR'

export const UPDATE_PORTFOLIO_FILE = 'UPDATE_PORTFOLIO_FILE'
export const UPDATE_PORTFOLIO_FILE_SUCCESS = 'UPDATE_PORTFOLIO_FILE_SUCCESS'
export const UPDATE_PORTFOLIO_FILE_ERROR = 'UPDATE_PORTFOLIO_FILE_ERROR'

// PORTFOLIO_LINK actions
export const ADD_PORTFOLIO_LINK = 'ADD_PORTFOLIO_LINK'
export const ADD_PORTFOLIO_LINK_SUCCESS = 'ADD_PORTFOLIO_LINK_SUCCESS'
export const ADD_PORTFOLIO_LINK_ERROR = 'ADD_PORTFOLIO_LINK_ERROR'

export const UPDATE_PORTFOLIO_LINK = 'UPDATE_PORTFOLIO_LINK'
export const UPDATE_PORTFOLIO_LINK_SUCCESS = 'UPDATE_PORTFOLIO_LINK_SUCCESS'
export const UPDATE_PORTFOLIO_LINK_ERROR = 'UPDATE_PORTFOLIO_LINK_ERROR'

export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
export const UPDATE_DESCRIPTION_SUCCESS = 'UPDATE_DESCRIPTION_SUCCESS'
export const UPDATE_DESCRIPTION_ERROR = 'UPDATE_DESCRIPTION_ERROR'

export const SET_EDUCATION_AND_WORK = 'SET_EDUCATION_AND_WORK'
export const SET_EDUCATIONS = 'SET_EDUCATIONS'
export const SET_WORKS = 'SET_WORKS'
export const SET_PORTFOLIO = 'SET_PORTFOLIO'
export const SET_SKILL_AND_POSITION = 'SET_SKILL_AND_POSITION'

export const setEducationAndWorkAction = ({
  educations,
  works,
}: {
  educations: Education[]
  works: Work[]
}) => ({
  type: SET_EDUCATION_AND_WORK,
  payload: {educations, works},
})
export const setEducations = (educations: Education[]) => ({
  type: SET_EDUCATIONS,
  payload: educations,
})
export const setWorks = (works: Work[]) => ({
  type: SET_WORKS,
  payload: works,
})

export const setPortfolio = (portfolios: Portfolio[]) => ({
  type: SET_PORTFOLIO,
  payload: portfolios,
})
export const setSkillAndPosition = ({skills, position}: {skills: Skill[]; position: Position}) => ({
  type: SET_SKILL_AND_POSITION,
  payload: {skills, position},
})

/*------------- ETC --------------*/

export const FETCH_USERS_PROFILE_VISIBLE = 'FETCH_USERS_PROFILE_VISIBLE'
export const FETCH_USERS_PROFILE_VISIBLE_SUCCESS = 'FETCH_USERS_PROFILE_VISIBLE_SUCCESS'
export const FETCH_USERS_PROFILE_VISIBLE_ERROR = 'FETCH_USERS_PROFILE_VISIBLE_ERROR'

export const getProfileAsyncAction = createAsyncAction(
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
)<null, ProfileViewDto, Error>()

export const setProfileVisibilityAsyncAction = createAsyncAction(
  SET_PROFILE_VISIBILITY,
  SET_PROFILE_VISIBILITY_SUCCESS,
  SET_PROFILE_VISIBILITY_ERROR,
)<boolean, ProfileViewDto, Error>()

export const updateSkillAsync = createAsyncAction(
  UPDATE_SKILL,
  UPDATE_SKILL_SUCCESS,
  UPDATE_SKILL_ERROR,
)<void, UpdateSkillPostionDto, Error>()

export const addWorkAsync = createAsyncAction(ADD_WORK, ADD_WORK_SUCCESS, ADD_WORK_ERROR)<
  void,
  void,
  Error
>()

interface UpdateDto<T> {
  id: number
  body: T
}

export const deleteWorkAsync = createAsyncAction(
  DELETE_WORK,
  DELETE_WORK_SUCCESS,
  DELETE_WORK_ERROR,
)<number, ProfileViewDto, Error>()

export const updateWorkAsync = createAsyncAction(
  UPDATE_WORK,
  UPDATE_WORK_SUCCESS,
  UPDATE_WORK_ERROR,
)<UpdateDto<Work>, ProfileViewDto, Error>()

export const addEducationAsync = createAsyncAction(
  ADD_EDUCATION,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_ERROR,
)<Education, ProfileViewDto, Error>()

export const deleteEducationAsync = createAsyncAction(
  DELETE_EDUCATION,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_ERROR,
)<number, ProfileViewDto, Error>()

export const updateEducationAsync = createAsyncAction(
  UPDATE_EDUCATION,
  UPDATE_EDUCATION_SUCCESS,
  UPDATE_EDUCATION_ERROR,
)<UpdateDto<Education>, ProfileViewDto, Error>()

export const updatePositionAsyncAction = createAsyncAction(
  UPDATE_POSITION,
  UPDATE_POSITION_SUCCESS,
  UPDATE_POSITION_ERROR,
)<Position, ProfileViewDto, Error>()
export const deletePortfolioAsyncAction = createAsyncAction(
  DELETE_PORTFOLIO,
  DELETE_PORTFOLIO_SUCCESS,
  DELETE_PORTFOLIO_ERROR,
)<number, ProfileViewDto, Error>()
export const uploadProfileImageAsyncAction = createAsyncAction(
  UPLOAD_PROFILE_IMAGE,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_ERROR,
)<FormData, ProfileViewDto, Error>()
export const deleteProfileImageAsyncAction = createAsyncAction(
  DELETE_PROFILE_IMAGE,
  DELETE_PROFILE_IMAGE_SUCCESS,
  DELETE_PROFILE_IMAGE_ERROR,
)<number, ProfileViewDto, Error>()

export const addPortfolioFile = createAsyncAction(
  ADD_PORTFOLIO_FILE,
  ADD_PORTFOLIO_FILE_SUCCESS,
  ADD_PORTFOLIO_FILE_ERROR,
)<Portfolio, ProfileViewDto, Error>()
export const updatePortfolioFile = createAsyncAction(
  UPDATE_PORTFOLIO_FILE,
  UPDATE_PORTFOLIO_FILE_SUCCESS,
  UPDATE_PORTFOLIO_FILE_ERROR,
)<UpdateDto<Portfolio>, ProfileViewDto, Error>()
export const addPortfolioLink = createAsyncAction(
  ADD_PORTFOLIO_LINK,
  ADD_PORTFOLIO_LINK_SUCCESS,
  ADD_PORTFOLIO_LINK_ERROR,
)<Portfolio, ProfileViewDto, Error>()
export const updatePortfolioLink = createAsyncAction(
  UPDATE_PORTFOLIO_LINK,
  UPDATE_PORTFOLIO_LINK_SUCCESS,
  UPDATE_PORTFOLIO_LINK_ERROR,
)<UpdateDto<Portfolio>, ProfileViewDto, Error>()
