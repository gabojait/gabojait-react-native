import {Position} from '@/data/model/type/Position'
import {PositionTextName} from '../model/PositionTextName'

export function mapTextNameToPosition(position: string) {
  if (position == PositionTextName.backend) return Position.backend
  else if (position == PositionTextName.frontend) return Position.frontend
  else if (position == PositionTextName.designer) return Position.designer
  else if (position == PositionTextName.manager) return Position.manager
}

export function mapPositionToTextName(position: Position) {
  if (position == Position.backend) return PositionTextName.backend
  else if (position == Position.frontend) return PositionTextName.frontend
  else if (position == Position.designer) return PositionTextName.designer
  else if (position == Position.manager) return PositionTextName.manager
}
