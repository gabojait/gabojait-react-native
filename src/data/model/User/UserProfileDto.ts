import { Position } from '../type/Position';
import Skill from '@/data/model/Profile/Skill';

export default interface UserProfileDto {
  createdAt: string;
  nickname: string;
  position: Position;
  rating: number;
  reviewCnt: number;
  updatedAt: string;
  userId: string;
  skills: Skill[];
}
