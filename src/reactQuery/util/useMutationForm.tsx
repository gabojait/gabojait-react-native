import { MutationFunction, useMutation, UseMutationResult } from 'react-query';
import { MutationState } from 'react-query/types/core/mutation';

type PartialMuationForm<TVariables, TData> = {
  mutationKey: readonly [unknown];
  mutationFn: MutationFunction<TData, TVariables>;
  useErrorBoundary: boolean;
};

interface MutationFormResult<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
> extends MutationState<TData, TError, TVariables, TContext> {
  isError: boolean;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  mutation: (dto?: TVariables) => Promise<void>;
}

//TODO: 파라미터 여러개일 경우도 추가필요
export function useMutationForm<TVariables = undefined, TData = undefined>({
  mutationKey,
  mutationFn,
  useErrorBoundary,
}: TVariables extends undefined
  ? PartialMuationForm<Partial<TVariables>, TData | undefined>
  : PartialMuationForm<TVariables, TData | undefined>): MutationFormResult<
  TData,
  Error,
  TVariables,
  unknown
> {
  const mutation = useMutation({ mutationKey, mutationFn, useErrorBoundary: useErrorBoundary });

  async function handleMutation(dto?: TVariables) {
    if (dto) {
      mutation.mutate(dto);
    } else {
      mutation.mutate;
    }
  }

  return {
    mutation: handleMutation,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    data: mutation.data,
    error: mutation.error as Error | null,
    isIdle: mutation.isIdle,
    isSuccess: mutation.isSuccess,
    context: mutation.context,
    failureCount: mutation.failureCount,
    status: mutation.status,
    variables: mutation.variables,
    isPaused: mutation.isPaused,
    onSuccess: mutation,
  };
}
