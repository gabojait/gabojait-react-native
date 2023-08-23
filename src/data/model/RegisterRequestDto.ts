import { Gender } from './Gender';
export default interface RegisterRequestDto {
  birthdate?: string;
  email?: string;
  authCode?: string;
  gender?: Gender;
  nickname?: string;
  password?: string;
  passwordReEntered?: string;
  username?: string;
  fcmToken?: string;
}
