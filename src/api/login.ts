import {Contact} from '@/model/Contact'
import {User} from '@/model/User'
import {LoginRequestDTO} from '@/redux/action/login'

export const login = async (dto: LoginRequestDTO) => {
  console.log('s')
  await sleep(3000)
  console.log('e')
  return new User('birth', new Contact('id', 'email', true, true), 'f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7')
}

function sleep(ms: number) {
  return new Promise<boolean>(resolve => {
    setTimeout(() => resolve(true), ms)
  })
}
