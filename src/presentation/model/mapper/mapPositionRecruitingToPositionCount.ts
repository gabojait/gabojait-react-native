import PositionCount from '../PositionCount'
import PositionRecruiting from '../PositionRecruitng'

export function mapPositionRecruitingToPositionCount(model: PositionRecruiting) {
  const result: PositionCount = {
    position: model.position,
    totalRecruitCnt: model.recruitCnt,
  }
  return result
}
