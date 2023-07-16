import { Level } from './Skill';

export default interface Skill {
  createdAt: string;
  isExperienced: boolean;
  level: keyof typeof Level;
  skillId?: string;
  skillName: string;
  updatedAt: string;
}
