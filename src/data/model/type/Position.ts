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
    | 'managerMaxCnt'
    | 'backendMaxCnt'
    | 'frontendMaxCnt'
    | 'designerMaxCnt'
    | 'otherMaxCnt';
} = {
  [Position.Manager]: 'managerMaxCnt',
  [Position.Backend]: 'backendMaxCnt',
  [Position.Frontend]: 'frontendMaxCnt',
  [Position.Designer]: 'designerMaxCnt',
  [Position.None]: 'otherMaxCnt',
};
export const PositionCurrentCntField: {
  [key in Position]:
    | 'managerCurrentCnt'
    | 'backendCurrentCnt'
    | 'frontendCurrentCnt'
    | 'designerCurrentCnt'
    | 'otherCurrentCnt';
} = {
  [Position.Manager]: 'managerCurrentCnt',
  [Position.Backend]: 'backendCurrentCnt',
  [Position.Frontend]: 'frontendCurrentCnt',
  [Position.Designer]: 'designerCurrentCnt',
  [Position.None]: 'otherCurrentCnt',
};
