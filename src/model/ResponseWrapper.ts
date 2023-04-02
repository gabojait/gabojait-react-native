export type ResponseWrapper<T = any> = {
  responseCode?: string
  responseMessage?: string
  responseData:{
    data?: T,
    size?: number
  }
}
