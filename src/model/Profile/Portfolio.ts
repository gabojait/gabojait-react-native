export const FieldType = {
  Url: {
    name: 'Url',
    placeholder: 'URL 주소를 입력해주세요!',
  },
  File: {
    name: 'File',
    placeholder: '.jpg, .jpeg, .png, .pdf 포맷만 가능합니다!',
  },
}
export type FieldType = typeof FieldType[keyof typeof FieldType]

export default interface Portfolio {
  name: string,
  portfolioId: string,
  portfolioType: FieldType,
  schemaVersion?: string,
  url: string,
}