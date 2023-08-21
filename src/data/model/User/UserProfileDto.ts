import { Position } from '../type/Position';

export default interface UserProfileDto {
  createdAt: string;
  nickname: string;
  position: Position;
  rating: number;
  reviewCnt: number;
  updatedAt: string;
  userId: string;
}
