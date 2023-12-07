export default interface TeamBriefDto {
  createdAt: string;
  projectName: string;
  teamId: string;
  frontendMaxCnt: number;
  backendMaxCnt: number;
  managerMaxCnt: number;
  designerMaxCnt: number;
  frontendCurrentCnt: number;
  backendCurrentCnt: number;
  managerCurrentCnt: number;
  designerCurrentCnt: number;
  updatedAt: string;
}
