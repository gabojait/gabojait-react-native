import { Position } from "../type/Position";
import SkillResponse from "./SkillResponse"

export default interface UpdateSkillPostionDto {
  createSkills: SkillResponse[];
  deleteSkillIds: number[];
  updateSkills: SkillResponse[];
  position: Position
}