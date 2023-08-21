import PositionCount from '../PositionCount'
import PositionRecruiting from '../PositionRecruitng'

export function mapPositionCountToPositionRecruiting(model: PositionCount) {
  const result: PositionRecruiting = {
    position: model.position,
    recruitCnt: model.totalRecruitCnt,
    currentCnt: 0,
  }
  return result
}
