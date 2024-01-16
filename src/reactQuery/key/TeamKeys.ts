export const teamKeys = {
  myTeam: ['myTeam'] as const,
  updateTeam: ['updateTeam'] as const,
  completeTeam: ['completeTeam'] as const,
  incompleteTeam: ['incompleteTeam'] as const,
  fireTeammate: ['fireTeammate'] as const,
  recruiting: 'recruiting',
  createTeam: ['createTeam'] as const,
  getTeam: ['getTeam'] as const,
  getTeamByTeamId: (teamId: string) => ['team', teamId],
};
