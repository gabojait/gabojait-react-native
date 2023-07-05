import PositionRecruiting from '@/presentation/model/PositionRecruitng'
import BriefProfileDto from '../Profile/BriefProfileDto'
import BriefOfferDto from '../Offer/BriefOfferDto'

export default interface TeamDetailDto {
  createdAt: string
  expectation: string
  isFavorite: boolean
  offers: BriefOfferDto[]
  openChatUrl?: string
  projectDescription?: string
  projectName: string
  teamId: string
  teamMemberCnts: Array<PositionRecruiting>
  teamMembers: Array<BriefProfileDto>
  updatedAt: string
}
