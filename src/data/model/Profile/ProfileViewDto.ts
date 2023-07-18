import { Position } from '../type/Position';
import TeamBriefDto from '../Team/TeamBriefDto';
import Skill from './Skill';
import Work from './Work';
import Education from './Education';
import Portfolio from './Portfolio';
import ReviewResponse from './ReviewResponse';

export default interface ProfileViewDto {
  completedTeams?: TeamBriefDto[];
  currentTeamId?: string;
  profileDescription?: string;
  educations?: Education[];
  imageUrl?: string;
  isPublic?: boolean;
  nickname?: string;
  portfolios?: Portfolio[];
  reviews?: ReviewResponse[];
  position?: Position;
  rating?: number;
  skills?: Skill[];
  userId?: number;
  works?: Work[];
  teamMemberStatus?: string;
}
