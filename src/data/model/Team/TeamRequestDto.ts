import { Position } from '@/data/model/type/Position';

export default interface TeamRequestDto {
  expectation: string;
  openChatUrl: string;
  projectDescription: string;
  projectName: string;
  frontendMaxCnt: number;
  backendMaxCnt: number;
  managerMaxCnt: number;
  designerMaxCnt: number;
  leaderPosition: Position;
}
