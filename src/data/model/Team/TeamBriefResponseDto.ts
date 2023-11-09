export default interface TeamBriefResponseDto {
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
}
