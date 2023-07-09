import {Position} from '../type/Position'
import PositionCountDto from './PostionCountDto'

export default interface TeamRequestDto {
  expectation: string
  openChatUrl: string
  projectDescription: string
  projectName: string
  teamMemberRecruitCnts: PositionCountDto[]
}
