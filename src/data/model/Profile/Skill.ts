export const Level = {
  LOW: 1,
  MID: 2,
  HIGH: 3,
}

export default interface Skill {
  isExperienced: boolean
  level: keyof typeof Level
  skillId?: string
  skillName: string
}
