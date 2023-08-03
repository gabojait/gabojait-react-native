import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import BriefProfileDto from '../Profile/BriefProfileDto';
import BriefOfferDto from '../Offer/BriefOfferDto';

export default interface TeamBriefDto {
  createdAt: string;
  projectName: string;
  teamId: string;
  teamMemberCnts: PositionRecruiting[];
  teamMembers: BriefProfileDto[];
  updatedAt: string;
}
