export const Level = {
  low: 1,
  mid: 2,
  high: 3,
};

export default interface Skill {
  createdAt?: string;
  isExperienced: boolean;
  level: keyof typeof Level;
  skillId?: number;
  skillName: string;
  updatedAt?: string;
}
