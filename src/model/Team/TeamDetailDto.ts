import BriefProfileDto from '../Profile/BriefProfileDto'
import PositionCountDto from './PostionCountDto'

export default interface TeamDetailDto {
  createdAt: string
  expectation: string
  isFavorite: boolean
  openChatUrl?: string
  projectDescription?: string
  projectName: string
  teamId: string
  teamMemberRecruitCnts: Array<PositionCountDto>
  teamMembers: Array<BriefProfileDto>
  updatedAt: string
}
