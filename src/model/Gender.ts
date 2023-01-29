export const Gender = {
  Male: 0,
  Female: 1,
} as const
export type Gender = typeof Gender[keyof typeof Gender]
