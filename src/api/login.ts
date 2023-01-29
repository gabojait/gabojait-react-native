import client from '@/lib/axiosInstance'
import {Contact} from '@/model/Contact'
import {User} from '@/model/User'
import {LoginRequestDTO} from '@/redux/action/login'

export const login = async (dto: LoginRequestDTO) => {
  const result = await client.post('login', dto)
  console.log(result)
  return result
  return new User(
    'birth',
    new Contact('id', 'email', true, true),
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
  )
}

function sleep(ms: number) {
  return new Promise<boolean>(resolve => {
    setTimeout(() => resolve(true), ms)
  })
}
