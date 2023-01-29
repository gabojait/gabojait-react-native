import {Gender} from './Gender'
export default interface RegisterRequestDto {
  birthdate?: string
  email?: string
  gender?: Gender
  legalName?: string
  nickname?: string
  password?: string
  passwordReEntered?: string
  username?: string
}
