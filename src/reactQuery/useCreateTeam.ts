import { createTeam, updateTeam } from '@/data/api/team';
import TeamRequestDto from '@/data/model/Team/TeamRequestDto';
import { QueryFunctionContext, UseMutationOptions, useMutation } from 'react-query';

export const useCreateTeam = () => {
  return useMutation({
    mutationKey: ['createTeam'],
    mutationFn: (dto: TeamRequestDto) => createTeam(dto),
  });
};
