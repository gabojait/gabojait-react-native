import { Position } from '../type/Position';
import TeamBriefDto from '../Team/TeamBriefDto'
import Education from './Education';
import Portfolio from './Portfolio';
import Review from './Review';
import Skill from './Skill';
import Work from './Work';

export default interface ProfileViewDto {
  completedTeams?: TeamBriefDto[];
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
