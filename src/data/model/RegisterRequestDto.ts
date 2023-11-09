import { Gender } from './Gender';
export default interface RegisterRequestDto {
  birthdate?: string;
  email?: string;
  verificationCode?: string;
  gender?: Gender;
  nickname?: string;
  password?: string;
  passwordReEntered?: string;
  username?: string;
  fcmToken?: string;
}
