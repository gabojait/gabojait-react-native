export const teamKeys = {
  myTeam: ['myTeam'] as const,
  // myTeamRefetchable: (refetchKey: TeamRefetchKeyType) =>
  //   [...teamKeys.myTeam, { refetchKey }] as const,
  updateTeam: ['updateTeam'] as const,
  completeTeam: ['completeTeam'] as const,
  incompleteTeam: ['incompleteTeam'] as const,
  fireTeammate: ['fireTeammate'] as const,
};
