import { Position } from '../type/Position';
import CompletedTeamDto from './CompletedTeamDto';
import Education from './Education';
import Portfolio from './Portfolio';
import Review from './Review';
import Skill from './Skill';
import Work from './Work';

export default interface ProfileViewDto {
  completedTeams?: CompletedTeamDto[];
  currentTeamId?: string;
  profileDescription?: string;
  educations?: Education[];
  imageUrl?: string;
  isPublic?: boolean;
  nickname?: string;
  portfolios?: Portfolio[];
  reviews?: Review[];
  position?: Position;
  rating?: number;
  skills?: Skill[];
  userId?: number;
  works?: Work[];
  teamMemberStatus?: string;
}

export type Identifier = number;
