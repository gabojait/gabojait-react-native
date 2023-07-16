import {Identifier} from './ProfileViewDto'

export default interface WorkResponse {
  corporationName: string
  createdAt: string
  ended: string
  isCurrent: boolean
  startedAt: string
  updatedAt: string
  workDescription: string
  workId: number
}
