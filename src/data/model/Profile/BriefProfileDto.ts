import { Position } from '../type/Position';

export default interface BriefProfileDto {
  isLeader: boolean;
  username: string;
  position: Position;
  userId: string;
  nickname: string;
}
