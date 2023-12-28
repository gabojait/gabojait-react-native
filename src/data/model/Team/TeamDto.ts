import BriefProfileDto from '@/data/model/Profile/BriefProfileDto';

export default interface TeamDto {
  createdAt: string;
  expectation: string;
  openChatUrl?: string;
  projectDescription?: string;
  projectName: string;
  teamId: string;
  backendCurrentCnt: number;
  backendMaxCnt: number;
  designerCurrentCnt: number;
  designerMaxCnt: number;
  frontendCurrentCnt: number;
  frontendMaxCnt: number;
  managerCurrentCnt: number;
  managerMaxCnt: number;
  otherCurrentCnt: number;
  otherMaxCnt: number;
  teamMembers: Array<BriefProfileDto>;
  updatedAt: string;
}
