import {createTeam, updateTeam} from '@/data/api/team'
import TeamRequestDto from '@/data/model/Team/TeamRequestDto'
import {QueryFunctionContext, UseMutationOptions, useMutation} from 'react-query'

//TODO: teamUpdate이랑 같이 쓸 수 있는 거 만들기
export const useCreateTeam = () => {
  return useMutation({
    mutationKey: ['createTeam'],
    mutationFn: (dto: TeamRequestDto) => createTeam(dto),
  })
}

export const useUpdateTeam = () => {
  return useMutation({
    mutationKey: ['updateTeam'],
    mutationFn: (dto: TeamRequestDto) => updateTeam(dto),
  })
}
