export const Level = {
  LOW: 1,
  MID: 2,
  HIGH: 3,
}

export default interface SkillResponse {
  createdAt: string
  isExperienced: boolean
  level: keyof typeof Level
  skillId?: string
  skillName: string
  updatedAt: string
}
