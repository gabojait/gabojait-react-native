import PositionCountDto from './PostionCountDto';

export default interface TeamRequestDto {
  expectation: string;
  openChatUrl: string;
  projectDescription: string;
  projectName: string;
  teamMemberRecruitCnts: PositionCountDto[];
  frontendMaxCnt: number;
  backendMaxCnt: number;
  managerMaxCnt: number;
  designerMaxCnt: number;
  otherMaxCnt: number;
}
