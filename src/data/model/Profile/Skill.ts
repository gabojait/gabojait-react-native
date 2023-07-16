export const Level = {
  LOW: 1,
  MID: 2,
  HIGH: 3,
};

export default interface Skill {
  createdAt: string;
  isExperienced: boolean;
  level: keyof typeof Level;
  skillId?: string;
  skillName: string;
  updatedAt: string;
}
