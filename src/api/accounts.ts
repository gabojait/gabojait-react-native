import client from '@/lib/axiosInstance'
import EmailVerifyDto from '@/model/EmailVerifyDto'
import RegisterRequestDto from '@/model/RegisterRequestDto'
import {LoginRequestDTO} from '@/redux/action/login'

export const login = async (dto: LoginRequestDTO) => {
  const result = await client.post('login', dto)
  console.log(result)
  return result
}
export const checkUsernameDuplicate = async (username: string) => {
  const result = await client.get(`user/username/duplicate/${username}`, )
  console.log(result)
  return result
}

export const checkNicknameDuplicate = async (nickname: string) => {
  const result = await client.get(`user/nickname/duplicate/${nickname}`, )
  console.log(result)
  return result
}


export const register = async (dto: RegisterRequestDto) => {
  const result = await client.post('user', dto)
  console.log(result)
  return result
}

export const sendAuthCode = async (email: string) => {
  const result = await client.post('contact', {email})
  console.log(result)
  return result
}

export const verifyAuthCode = async (request: EmailVerifyDto) => {
  const result = await client.patch('contact', request)
  console.log(result)
  return result
}
