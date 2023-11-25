export const profileKeys = {
  myProfile: ['myProfile'] as const,
  profileUserId: (userId: string) => ['profile', userId],
  frontendSeekingTeam: 'frontend',
  backendSeekingTeam: 'backend',
  designerSeekingTeam: 'designer',
  managerSeekingTeam: 'manager',
};
