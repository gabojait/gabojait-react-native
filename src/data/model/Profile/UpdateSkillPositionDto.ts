import { Position } from '@/data/model/type/Position';
import Skill from '@/data/model/Profile/Skill';

export default interface UpdateSkillPostionDto {
  createSkills?: Skill[];
  deleteSkillIds?: number[];
  updateSkills?: Skill[];
  position?: Position;
}
