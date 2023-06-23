import {Position} from '../type/Position'

export default interface BriefProfileDto {
  createdAt: string
  nickname: string
  position: Position
  rating: number
  reviewCnt: number
  updatedAt: string
  userId: number
}
