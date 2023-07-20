import { updateTeam } from '@/data/api/team';
import TeamRequestDto from '@/data/model/Team/TeamRequestDto';
import { useMutation } from 'react-query';

export const useUpdateTeam = () => {
  const mutation = useMutation({
    mutationKey: ['updateTeam'],
    mutationFn: (dto: TeamRequestDto) => updateTeam(dto),
    useErrorBoundary: true,
  });

  async function handleUpdateTeam(TeamRequestDto: TeamRequestDto) {
    try {
      mutation.mutate(TeamRequestDto);
    } catch (error) {
      //여기서 처리 안하고 에러바운더리에서 처리할 예정
    }
  }
  return {
    updateTeam: handleUpdateTeam,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    data: mutation.data,
    error: mutation.error,
  };
};
