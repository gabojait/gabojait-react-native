import { Position } from '../type/Position';
import TeamBriefDto from '../Team/TeamBriefDto';
import Skill from './Skill';
import Work from './Work';
import Education from './Education';
import Portfolio from './Portfolio';
import ReviewResponse from './ReviewResponse';

export default interface ProfileViewDto {
  createdAt?: string;
  completedTeams?: TeamBriefDto[];
  currentTeam?: TeamBriefDto;
  educations?: Education[];
  profileDescription?: string;
  imageUrl?: string;
  isLeader?: boolean;
  nickname?: string;
  portfolios?: Portfolio[];
  reviews?: ReviewResponse[];
  position?: Position;
  rating?: number;
  skills?: Skill[];
  userId?: number;
  works?: Work[];
  teamMemberStatus?: string;
  isSeekingTeam?: boolean;
  updatedAt?: string;
}
