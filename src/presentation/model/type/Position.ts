import { Position } from '@/data/model/type/Position';

export const KoreanPosition: Record<Position, string> = {
  [Position.Designer]: '디자이너',
  [Position.Backend]: '벡엔드',
  [Position.Frontend]: '프론트엔드',
  [Position.Manager]: '기획자',
  [Position.None]: '',
};
export type PositionTextName = keyof typeof KoreanPosition;

export const PositionText: Record<Position, string> = {
  [Position.Designer]: 'Designer',
  [Position.Backend]: 'Backend',
  [Position.Frontend]: 'Frontend',
  [Position.Manager]: 'Manager',
  [Position.None]: '선택안함',
};

export const PositionSymbol: Record<Position, string> = {
  [Position.Designer]: 'D',
  [Position.Backend]: 'B',
  [Position.Frontend]: 'F',
  [Position.Manager]: 'M',
  [Position.None]: 'X',
};
