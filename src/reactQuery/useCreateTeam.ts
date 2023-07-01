import {createTeam} from '@/api/team'
import TeamRequestDto from '@/model/Team/TeamRequestDto'
import {useMutation} from 'react-query'

interface useCreateTeamProps {
  onSuccess: () => void
}

export const useCreateTeam = ({onSuccess}: useCreateTeamProps) => {
  return useMutation({
    mutationKey: ['createTeam'],
    mutationFn: (dto: TeamRequestDto) => createTeam(dto),
    onSuccess: () => {
      onSuccess()
    },
  })
}
