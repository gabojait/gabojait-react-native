export type ResponseWrapper<T = any> = {
  responseCode?: string
  responseMessage?: string
  data?: T
}
