import {Position} from '../type/Position'

export default interface TeamListDto {
  createdAt: string
  projectName: string
  teamId: number
  teamMemberRecruitCnts: {totalRecruitCnt: number; positon: Position}
}
