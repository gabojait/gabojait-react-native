import PositionRecruiting from '@/presentation/model/PositionRecruitng';

export default interface TeamBriefModel {
  backendCurrentCnt: number;
  backendTotalRecruitCnt: number;
  designerCurrentCnt: number;
  designerTotalRecruitCnt: number;
  frontendCurrentCnt: number;
  frontendTotalRecruitCnt: number;
  managerCurrentCnt: number;
  managerTotalRecruitCnt: number;
  projectName: string;
  schemaVersion: string;
  teamId: string;
  teamMembers: PositionRecruiting[];
}
