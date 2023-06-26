import {Position} from '../type/Position'
import {TeamMemberStatus} from '../type/TeamMemberStatus'

export default interface TeamListDto {
  createdAt: string
  projectName: string
  teamId: number
  teamMemberRecruitCnts: {totalRecruitCnt: number; position: Position}[]
  teamMembers: {nickname: string; position: Position; teamMemberStatus: TeamMemberStatus}[]
  updatedAt: string
}
