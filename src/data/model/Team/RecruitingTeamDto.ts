import PositionRecruiting from '@/presentation/model/PositionRecruitng'
import BriefProfileDto from '../Profile/BriefProfileDto'
import BriefOfferDto from '../Offer/BriefOfferDto'

export default interface RecruitingTeamDto {
  createdAt: string
  projectName: string
  teamId: number
  teamMemberCnts: PositionRecruiting[]
  teamMembers: BriefProfileDto[]
  updatedAt: string
}
