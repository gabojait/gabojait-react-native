

export type ResponseWrapper<T = any> = {
  responseCode?: string
  responseMessage?: string
  responseData:T
}
