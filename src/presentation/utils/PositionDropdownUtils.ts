import {Position, PositionText} from '@/data/model/type/Position'
import {PositionTextName} from '../model/PositionTextName'

export function mapTextNameToPosition(position: keyof typeof Position) {
  if (position == PositionTextName.backend) return Position.Backend
  else if (position == PositionTextName.frontend) return Position.Frontend
  else if (position == PositionTextName.designer) return Position.Designer
  else if (position == PositionTextName.manager) return Position.Manager
}

export function mapPositionToTextName(position: Position) {
  return PositionText[position];
  // if (position == Position.Backend) return PositionTextName.backend
  // else if (position == Position.Frontend) return PositionTextName.frontend
  // else if (position == Position.designer) return PositionTextName.designer
  // else if (position == Position.manager) return PositionTextName.manager
}
