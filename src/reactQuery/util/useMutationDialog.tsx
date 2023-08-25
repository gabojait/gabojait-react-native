import useModal from '@/presentation/components/modal/useModal';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import { MutationKey, MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import React, { useEffect } from 'react';
import { ApiErrorCode, ApiErrorCodeType } from '@/data/api/ApiErrorCode';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';

/**
 * 회원가입에서와 같이 Mutation의 결과로 다이얼로그를 띄우는 커스텀 훅입니다.
 * 혹시나 노파심에 하는 말이지만 꼭!! ModalContext가 내려오는 곳에서만 사용하세요!!
 * @param mutationKey
 * @param mutationFn
 * @param message
 * @param options
 * @returns
 */
export function useMutationDialog<TVariables, TData>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  message?: {
    resultToMessage?: (result: unknown) => string;
    errorToMessage?: (error: unknown) => string;
    onSuccessClick?: (result: unknown) => void;
    onFailureClick?: (error: unknown) => void;
  },
  options?: Omit<
    UseMutationOptions<TData, unknown, TVariables, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) {
  const modal = useModal();
  const { resultToMessage, errorToMessage, onSuccessClick, onFailureClick } = message ?? {};
  const mutation = useMutation(mutationKey, mutationFn, options);
  useEffect(() => {
    modal?.hide();
    if (mutation.isLoading) {
      modal?.show({
        content: <DialogLoading />,
      });
      return;
    }

    const title = mutation.isSuccess ? '성공' : '오류';
    const defaultMessage = mutation.isSuccess ? '성공했습니다.' : '실패했습니다.';
    const msg =
      (mutation.isSuccess ? resultToMessage?.(mutation.data) : errorToMessage?.(mutation.error)) ??
      defaultMessage;
    if (mutation.isSuccess || mutation.isError) {
      modal?.show({
        content: (
          <OkDialogModalContent
            title={title}
            text={msg}
            onOkClick={() => {
              modal?.hide();
              if (mutation.isSuccess) {
                onSuccessClick?.(mutation.data);
              } else if (mutation.isError) {
                onFailureClick?.(mutation.error);
              }
            }}
          />
        ),
      });
    }
  }, [mutation.status]);
  return {
    mutation: {
      ...mutation,
      mutate: (...params: [TVariables]) => {
        console.log(mutation);
        if (!mutation.isLoading) {
          mutation.mutate(...params);
        }
      },
    },
    modal,
  };
}
