import { Position } from '@/data/model/type/Position';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';
import Education from '@/data/model/Profile/Education';
import Portfolio from '@/data/model/Profile/Portfolio';
import Skill from '@/data/model/Profile/Skill';
import { createSlice } from '@reduxjs/toolkit';
import { ActionType, createAction, createAsyncAction } from 'typesafe-actions';
import Work from '@/data/model/Profile/Work';

/*------------- Profile View/Edit related --------------*/

export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_ERROR = 'GET_PROFILE_ERROR';

export const SET_POSITION = 'SET_POSITION';
export type SetPositionAction = {
  type: typeof SET_POSITION;
  payload: Position;
};

export const setPosition = (position: Position): SetPositionAction => ({
  type: SET_POSITION,
  payload: position,
});

export const CREATE_WORK = 'CREATE_WORK';
export type CreateWorkAction = {
  type: typeof CREATE_WORK;
  payload: Work;
};

export const createWork = (work: Work): CreateWorkAction => ({
  type: CREATE_WORK,
  payload: work,
});

export type UpdatePayload<T> = { id: number; dataToUpdate: T };

export const UPDATE_WORK = 'UPDATE_WORK';
export type UpdateWorkAction = {
  type: typeof UPDATE_WORK;
  payload: UpdatePayload<Work>;
};

export const updateWork = (workId: number, workToUpdate: Work): UpdateWorkAction => ({
  type: UPDATE_WORK,
  payload: { id: workId, dataToUpdate: workToUpdate },
});

export const DELETE_WORK = 'DELETE_WORK';
export type DeleteWorkAction = {
  type: typeof DELETE_WORK;
  payload: number;
};

export const deleteWork = (workId: number): DeleteWorkAction => ({
  type: DELETE_WORK,
  payload: workId,
});

export const CREATE_EDUCATION = 'CREATE_EDUCATION';
export type CreateEducationAction = {
  type: typeof CREATE_EDUCATION;
  payload: Education;
};

export const createEducation = (education: Education): CreateEducationAction => ({
  type: CREATE_EDUCATION,
  payload: education,
});

export const UPDATE_EDUCATION = 'UPDATE_EDUCATION';
export type UpdateEducationAction = {
  type: typeof UPDATE_EDUCATION;
  payload: UpdatePayload<Education>;
};

export const updateEducation = (
  educationId: number,
  educationToUpdate: Education,
): UpdateEducationAction => ({
  type: UPDATE_EDUCATION,
  payload: { id: educationId, dataToUpdate: educationToUpdate },
});

export const DELETE_EDUCATION = 'DELETE_EDUCATION';
export type DeleteEducationAction = {
  type: typeof DELETE_EDUCATION;
  payload: number;
};

export const deleteEducation = (educationId: number): DeleteEducationAction => ({
  type: DELETE_EDUCATION,
  payload: educationId,
});

export const CREATE_SKILL = 'CREATE_SKILL';
export type CreateSkillAction = {
  type: typeof CREATE_SKILL;
  payload: Skill;
};

export const createSkill = (skill: Skill): CreateSkillAction => ({
  type: CREATE_SKILL,
  payload: skill,
});

export const UPDATE_SKILL = 'UPDATE_SKILL';
export type UpdateSkillAction = {
  type: typeof UPDATE_SKILL;
  payload: UpdatePayload<Skill>;
};

export const updateSkill = (skillId: number, skillToUpdate: Skill): UpdateSkillAction => ({
  type: UPDATE_SKILL,
  payload: { id: skillId, dataToUpdate: skillToUpdate },
});

export const DELETE_SKILL = 'DELETE_SKILL';
export type DeleteSkillAction = {
  type: typeof DELETE_SKILL;
  payload: number;
};

export const deleteSkill = (skillId: number): DeleteSkillAction => ({
  type: DELETE_SKILL,
  payload: skillId,
});

export const CREATE_PORTFOLIO = 'CREATE_PORTFOLIO';
export type CreatePortfolioAction = {
  type: typeof CREATE_PORTFOLIO;
  payload: Portfolio;
};

export const createPortfolio = (portfolio: Portfolio): CreatePortfolioAction => ({
  type: CREATE_PORTFOLIO,
  payload: portfolio,
});

export const UPDATE_PORTFOLIO = 'UPDATE_PORTFOLIO';
export type UpdatePortfolioAction = {
  type: typeof UPDATE_PORTFOLIO;
  payload: UpdatePayload<Portfolio>;
};

export const updatePortfolio = (
  portfolioId: number,
  portfolioToUpdate: Portfolio,
): UpdatePortfolioAction => ({
  type: UPDATE_PORTFOLIO,
  payload: { id: portfolioId, dataToUpdate: portfolioToUpdate },
});

export const DELETE_PORTFOLIO = 'DELETE_PORTFOLIO';
export type DeletePortfolioAction = {
  type: typeof DELETE_PORTFOLIO;
  payload: number;
};

export const deletePortfolio = (portfolioId: number): DeletePortfolioAction => ({
  type: DELETE_PORTFOLIO,
  payload: portfolioId,
});

export const SET_PROFILE_VISIBILITY = 'SET_PROFILE_VISIBILITY';
export const SET_PROFILE_VISIBILITY_SUCCESS = 'SET_PROFILE_VISIBILITY_SUCCESS';
export const SET_PROFILE_VISIBILITY_ERROR = 'SET_PROFILE_VISIBILITY_ERROR';

/*------------- ETC --------------*/

export const FETCH_USERS_PROFILE_VISIBLE = 'FETCH_USERS_PROFILE_VISIBLE';
export const FETCH_USERS_PROFILE_VISIBLE_SUCCESS = 'FETCH_USERS_PROFILE_VISIBLE_SUCCESS';
export const FETCH_USERS_PROFILE_VISIBLE_ERROR = 'FETCH_USERS_PROFILE_VISIBLE_ERROR';

export const getProfileAsyncAction = createAsyncAction(
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
)<null, ProfileViewDto, Error>();

export type GET_PROFILE_ACTION = ActionType<typeof getProfileAsyncAction>;

export const setProfileVisibilityAsyncAction = createAsyncAction(
  SET_PROFILE_VISIBILITY,
  SET_PROFILE_VISIBILITY_SUCCESS,
  SET_PROFILE_VISIBILITY_ERROR,
)<boolean, ProfileViewDto, Error>();
