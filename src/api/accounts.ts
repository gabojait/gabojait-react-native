import client from '@/lib/axiosInstance'
import EmailVerifyDto from '@/model/EmailVerifyDto'
import LoginRequestDTO from '@/model/LoginRequestDto'
import RegisterRequestDto from '@/model/RegisterRequestDto'

export const login = async (dto: LoginRequestDTO) => {
  const result = await client.post('user/login', dto)
  console.log(result)
  return result
}

export const getUser = async () => {
  const result = await client.get('user')
  console.log('res: ', result)
  return result
}

export const checkUsernameDuplicate = async (username: string) => {
  const result = await client.get(`user/username?username=${username}`)
  console.log(result)
  return result
}

export const checkNicknameDuplicate = async (nickname: string) => {
  const result = await client.get(`user/nickname?nickname=${nickname}`)
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

export const findUserName = async (request: {email: string}) => {
  const result = await client.post('user/username', request)
  console.log(result)
  return result
}

export const findPassword = async (request: FindPasswordDto) => {
  const result = await client.post('user/password', request)
  console.log(result)
  return result
}
