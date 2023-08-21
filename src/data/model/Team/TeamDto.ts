import PositionRecruiting from '@/presentation/model/PositionRecruitng'
import BriefProfileDto from '../Profile/BriefProfileDto'

export default interface TeamDto {
  createdAt: string
  expectation: string
  openChatUrl?: string
  projectDescription?: string
  projectName: string
  teamId: string
  teamMemberCnts: Array<PositionRecruiting>
  teamMembers: Array<BriefProfileDto>
  updatedAt: string
}
