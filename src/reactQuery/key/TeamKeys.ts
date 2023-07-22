import TeamDto from '@/data/model/Team/TeamDto';

export const TeamRefetchKey = {
  INITIALIZE: 'INITIALIZE',
  TEAM_INCOMPLETE: 'TEAM_INCOMPLETE',
  TEAM_COMPLETE: 'TEAM_COMPLETE',
  TEAM_UPDATE: (dto: TeamDto) => dto,
} as const;
export type TeamRefetchKeyType = typeof TeamRefetchKey[keyof typeof TeamRefetchKey];

export const teamKeys = {
  myTeam: ['myTeam'] as const,
  myTeamRefetchable: (refetchKey: TeamRefetchKeyType) =>
    [...teamKeys.myTeam, { refetchKey }] as const,
  updateTeam: ['updateTeam'] as const,
  completeTeam: ['completeTeam'] as const,
  incompleteTeam: ['incompleteTeam'] as const,
};
