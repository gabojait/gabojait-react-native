import {createTeam} from '@/data/api/team'
import TeamRequestDto from '@/data/model/Team/TeamRequestDto'
import {useMutation} from 'react-query'

//TODO: teamEditor이랑 같이 쓸 수 있는 거 만들기
export const useCreateTeam = () => {
  return useMutation({
    mutationKey: ['createTeam'],
    mutationFn: (dto: TeamRequestDto) => createTeam(dto),
  })
}
