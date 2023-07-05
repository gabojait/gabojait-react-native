import {CombinedState} from '@reduxjs/toolkit'
import {TypedUseSelectorHook} from 'react-redux'
import {useAppSelector} from './redux/hooks'
import {RootState} from './redux/store'

export const usernameRegex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,15}$/ //5~15자 영문, 숫자 조합
export const passwordRegex =
  /^(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-z]{2,50}).{0,50}$/ //영문, 숫자 조합 10~30자
export const nicknameRegex = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,8}$/ //2~8자
export const emailRegex =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/
export const authCodeRegex = /[a-zA-z0-9]{6}/
export const realnameRegex = /^.{2,5}$/ //2~5자

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

export const changeFirstLetterToCapital = (text: string) => {
  const firstLetter = text.charAt(0).toUpperCase()
  const otherLetters = text.slice(1)
  return firstLetter + otherLetters
}

export const getFirstAlphabet = (text: string) => {
  return text.charAt(0).toUpperCase()
}
export const chagneToOfficialWord = (text: string | undefined) => {
  let word = ''

  if (text == 'BACKEND') word = '백엔드'
  else if (text == 'FRONTEND') word = '프론트엔드'
  else if (text == 'DESIGNER') word = 'UI/UX 디자이너'
  else if (text == 'PM') word = 'PM'
  else word = ''

  return word
}
export const isEmptyArray = (array: any[] | undefined) => {
  if (array == undefined) return false
  else if (array.length == 0) return true
  else return false
}

export const isLeader = (text: string | undefined) => {
  if (text == 'LEADER') return true
  else return false
}

export const initials = ['B', 'F', 'D', 'P']
