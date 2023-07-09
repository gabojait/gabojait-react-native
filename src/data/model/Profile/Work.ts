import { Identifier } from "./ProfileViewDto"

export default interface Work {
  corporationName: string
  description: string
  endedDate?: string | null
  isCurrent: boolean
  schemaVersion: string
  startedDate: string
  workId: Identifier
}
