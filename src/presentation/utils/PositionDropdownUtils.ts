import { Position } from '@/data/model/type/Position';
import { PositionText, KoreanPosition } from '../model/type/Position';

export function mapKoreanToPosition(position: string) {
  if (position == KoreanPosition.BACKEND) return Position.Backend;
  else if (position == KoreanPosition.FRONTEND) return Position.Frontend;
  else if (position == KoreanPosition.DESIGNER) return Position.Designer;
  else if (position == KoreanPosition.MANAGER) return Position.Manager;
}

export function mapPositionToTextName(position: Position) {
  return PositionText[position];
}
export function mapPositionToKorean(position: Position) {
  return KoreanPosition[position];
}
