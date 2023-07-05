import BriefOfferDto from '../Offer/BriefOfferDto'
import {Position} from '../type/Position'

export default interface UserProfileBriefDto {
  createdAt: string
  nickname: string
  offers: BriefOfferDto[]
  position: Position
  rating: number
  reviewCnt: number
  schemaVersion: string
  userId: number
}
