import {Position} from '../type/Position'

export default interface BriefOfferDto {
  createdAt: string
  isAccepted: boolean
  offerId: number
  offeredBy: string
  position: Position
  updatedAt: string
}
