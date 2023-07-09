import { Position } from "../type/Position";
import Skill from "./Skill"

export default interface UpdateSkillPostionDto {
  createSkills: Skill[];
  deleteSkillIds: number[];
  updateSkills: Skill[];
  position: Position
}