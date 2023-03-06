export const usernameRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,15}$/ //5~15자 영문, 숫자 조합
export const passwordRegex = /^(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-z]{2,50}).{0,50}$/ //영문, 숫자 조합 10~30자
export const nicknameRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,8}$/ //2~8자
export const emailRegex =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
export const authCodeRegex = /[a-zA-z0-9]{6}/
export const realnameRegex = /^.{2,5}$/ //2~5자