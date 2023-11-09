import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import BriefProfileDto from '../Profile/BriefProfileDto';
import BriefOfferDto from '../Offer/BriefOfferDto';

export default interface TeamBriefDto {
  createdAt: string;
  projectName: string;
  teamId: string;
  teamMemberCnts: PositionRecruiting[];
  frontendMaxCnt: number;
  backendMaxCnt: number;
  managerMaxCnt: number;
  designerMaxCnt: number;
  otherMaxCnt: number;
  frontendCurrentCnt: number;
  backendCurrentCnt: number;
  managerCurrentCnt: number;
  designerCurrentCnt: number;
  otherCurrentCnt: number;
  teamMembers: BriefProfileDto[];
  updatedAt: string;
}
