import { Position } from '../type/Position';

export default interface BriefProfileDto {
  isLeader: string;
  username: string;
  position: Position;
  userId: string;
  nickname: string;
}
