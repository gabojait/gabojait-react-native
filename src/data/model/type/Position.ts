export const enum Position {
  Designer = 'DESIGNER',
  Backend = 'BACKEND',
  Frontend = 'FRONTEND',
  Manager = 'MANAGER',
  None = 'NONE',
}

export const PositionFromIndex = [
  Position.Designer,
  Position.Backend,
  Position.Frontend,
  Position.Manager,
  Position.None,
];
export const PositionMaxCntField: {
  [key in Position]:
    | 'backendMaxCnt'
    | 'frontendMaxCnt'
    | 'designerMaxCnt'
    | 'managerMaxCnt'
    | 'otherMaxCnt';
} = {
  [Position.Backend]: 'backendMaxCnt',
  [Position.Frontend]: 'frontendMaxCnt',
  [Position.Designer]: 'designerMaxCnt',
  [Position.Manager]: 'managerMaxCnt',
  [Position.None]: 'otherMaxCnt',
};
export const PositionCurrentCntField: {
  [key in Position]:
    | 'backendCurrentCnt'
    | 'frontendCurrentCnt'
    | 'designerCurrentCnt'
    | 'managerCurrentCnt'
    | 'otherCurrentCnt';
} = {
  [Position.Backend]: 'backendCurrentCnt',
  [Position.Frontend]: 'frontendCurrentCnt',
  [Position.Designer]: 'designerCurrentCnt',
  [Position.Manager]: 'managerCurrentCnt',
  [Position.None]: 'otherCurrentCnt',
};
