export const enum Position {
  Designer = 'designer',
  Backend = 'backend',
  Frontend = 'frontend',
  Manager = 'manager',
  None = 'none',
}

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
