export const teamKeys = {
  myTeam: ['myTeam'] as const,
  myTeamRefetchable: (refetchKey: unknown) => [...teamKeys.myTeam, { refetchKey }] as const,
};
