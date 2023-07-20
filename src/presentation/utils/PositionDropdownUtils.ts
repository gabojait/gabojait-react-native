import { Position } from '@/data/model/type/Position';
import { PositionText, KoreanPosition } from '../model/type/Position';

export function mapKoreanToPosition(position: string) {
  if (position == KoreanPosition.backend) return Position.Backend;
  else if (position == KoreanPosition.frontend) return Position.Frontend;
  else if (position == KoreanPosition.designer) return Position.Designer;
  else if (position == KoreanPosition.manager) return Position.Manager;
}

export function mapPositionToTextName(position: Position) {
  return PositionText[position];
}
export function mapPositionToKorean(position: Position) {
  return KoreanPosition[position];
}
