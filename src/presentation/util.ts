import {Position} from '@/data/model/type/Position'

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

//TODO: positionSelector페이지에 적용 + text 바꾸기
export const chagneToOfficialWord = (text: string | undefined) => {
  let word = ''

  if (text == 'BACKEND') word = '백엔드'
  else if (text == 'FRONTEND') word = '프론트엔드'
  else if (text == 'DESIGNER') word = 'UI/UX 디자이너'
  else if (text == 'PM') word = 'PM'
  else word = ''

  return word
}

export function mapToInitial(position: Position) {
  if (position == Position.backend) return 'B'
  else if (position == Position.designer) return 'D'
  else if (position == Position.frontend) return 'F'
  else if (position == Position.manager) return 'P'
}

export const isEmptyArray = (array: any[] | undefined) => {
  if (array == undefined) return false
  else if (array.length == 0) return true
  else return false
}

export const isLeader = (isLeader: boolean) => {
  if (isLeader) return true
  else return false
}

export const DiffType = {
  VALUE_CREATED: 'created',
  VALUE_UPDATED: 'updated',
  VALUE_DELETED: 'deleted',
  VALUE_UNCHANGED: 'unchanged',
} as const
export type DiffType = typeof DiffType[keyof typeof DiffType]

type Diff<T> = {
  [key in keyof T]: {type: DiffType; data: any} | {type: DiffType; data: any}[] | Diff<any>
}
type SingleDiff = {type: DiffType; data: any}

export var DiffUtil = (function <T extends {}>() {
  return {
    /**
     * Detect differences over two objects recursiveley.
     */
    map: function (obj1: any, obj2: any) {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        throw 'Invalid argument. Function given, object expected.'
      }
      if (this.isValue(obj1) || this.isValue(obj2)) {
        return {
          type: this.compareValues(obj1, obj2),
          data: obj2,
        }
      }

      var diff: Diff<typeof obj1 & typeof obj2> = {} as Diff<typeof obj1 & typeof obj2>
      for (const k of Object.keys(obj1)) {
        const key = k as keyof typeof obj1

        if (this.isFunction(obj1[key])) {
          continue
        }

        console.debug(obj1[key], obj2[key], this.isArray(obj1[key]))
        if (this.isArray(obj1[key])) {
          console.debug('array: ', this.mapArray(obj1[key], obj2[key]))
          diff[key as keyof T] = this.mapArray(obj1[key], obj2[key])
        } else if (this.isObject(obj1[key])) {
          console.debug('object: ', this.map(obj1[key], obj2[key]))

          diff[key as keyof T] = this.map(obj1[key], obj2[key])
        } else {
          var value: any = undefined
          if (obj2[key] !== undefined) {
            value = obj2[key]
          }

          diff[key as keyof T] = {
            type: this.compareValues(obj1[key], value),
            data: value,
          }
        }
      }
      for (const k of Object.keys(obj2)) {
        const key = k as keyof typeof obj2
        if (this.isFunction(obj2[key]) || diff[key as keyof T] !== undefined) {
          continue
        }

        diff[key as keyof T] = this.map({} as any, obj2[key])
      }

      return diff
    },
    compareValues: function (value1: any, value2: any) {
      if (value1 === value2) {
        return DiffType.VALUE_UNCHANGED
      }
      if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
        return DiffType.VALUE_UNCHANGED
      }
      if (value1 === undefined) {
        return DiffType.VALUE_CREATED
      }
      if (value2 === undefined) {
        return DiffType.VALUE_DELETED
      }
      return DiffType.VALUE_UPDATED
    },
    isFunction: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Function]'
    },
    isArray: function (x: any) {
      return Boolean(Object.prototype.toString.call(x) === '[object Array]')
    },
    isDate: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Date]'
    },
    isObject: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Object]'
    },
    isValue: function (x: any) {
      return !this.isObject(x) && !this.isArray(x)
    },
    mapArray: function (arr1: any[], arr2: any[]) {
      var diff: SingleDiff[] = []
      const maxLength = Math.max(arr1.length, arr2.length)
      console.debug(arr1, arr2)
      for (let i = 0; i < maxLength; i++) {
        if (i < arr1.length && i < arr2.length) {
          if (this.isObject(arr1[i]) && this.isObject(arr2[i])) {
            const el = arr1[i]
            const df = this.map(arr1[i], arr2[i]) as Diff<typeof el>
            let diffType: DiffType = DiffType.VALUE_UNCHANGED
            for (let key of Object.keys(df)) {
              if ((df[key] as SingleDiff).type != DiffType.VALUE_UNCHANGED)
                diffType = DiffType.VALUE_UPDATED
            }
            diff.push({type: diffType, data: df} as SingleDiff)
          } else if (this.isArray(arr1[i]) && this.isArray(arr2[i])) {
            diff.push(...this.mapArray(arr1[i], arr2[i]))
          } else {
            diff.push({
              type: this.compareValues(arr1[i], arr2[i]) as DiffType,
              data: arr2[i],
            })
          }
        } else if (i < arr1.length) {
          diff.push({
            type: DiffType.VALUE_DELETED,
            data: arr1[i],
          })
        } else if (i < arr2.length) {
          diff.push({
            type: DiffType.VALUE_CREATED,
            data: arr2[i],
          })
        }
      }
      console.debug('ArrayDiff: ', diff)
      return diff
    },
  }
})()
