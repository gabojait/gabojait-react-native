export const usernameRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,15}$/ //5~15자 영문, 숫자 조합
export const passwordRegex =
  /^(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-z]{2,50}).{0,50}$/ //영문, 숫자 조합 10~30자
export const nicknameRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,8}$/ //2~8자
export const emailRegex =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
export const authCodeRegex = /[a-zA-z0-9]{6}/
export const realnameRegex = /^.{2,5}$/ //2~5자

export const positionWord = ['backend', 'frontend', 'designer', 'pm']
export const BACKEND = 'backend'
export const FRONTED = 'frontend'
export const DESIGNER = 'designer'
export const PM = 'pm'

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
export const isInitializable = (loading: any, data: any) => {
  if (!loading && data != null) return true
  else return false
}
export const isDataAvailable = (loading: any, data: any, contentData: any) => {
  if (!loading && contentData != null && data != null) return true
  else return false
}

/**
 * endDate 부터 startDate 까지의 시간차를 월 단위로 반환합니다.
 * @param endDate 끝 시간
 * @param startDate 시작 시간
 * @returns
 */
export const calcMonth = (endDate: Date, startDate: Date) =>
  Math.floor((endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24 / 31)
