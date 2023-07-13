import { AsyncState } from '@/lib/reducerUtils';
import { ActionType } from 'typesafe-actions';
import ProfileViewDto from '@/data/model/Profile/ProfileViewDto';
import * as actions from '@/redux/action/profileActions';
import Education from '@/data/model/Profile/Education';
import Work from '@/data/model/Profile/Work';
import Portfolio from '@/data/model/Profile/Portfolio';
import Skill from '@/data/model/Profile/Skill';
import { Position } from '@/data/model/type/Position';

export const MutationType = {
  update: 'update',
  delete: 'delete',
  create: 'create',
};
export type MutationType = keyof typeof MutationType;

export type ProfileAction = ActionType<typeof actions>;
export type ProfileState = {
  userProfile: AsyncState<ProfileViewDto, Error>;
  educations: Education[];
  works: Work[];
  portfolios: Portfolio[];
  skills: Skill[];
  description: string;
  position: Position;
};
