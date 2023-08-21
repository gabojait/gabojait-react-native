import useModal from '@/presentation/components/modal/useModal';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';
import { MutationKey, MutationFunction, useMutation } from 'react-query';
import React from 'react';
import { ApiErrorCode, ApiErrorCodeType } from '@/data/api/ApiErrorCode';

/**
 * 회원가입에서와 같이 Mutation의 결과로 다이얼로그를 띄우는 커스텀 훅입니다.
 * 혹시나 노파심에 하는 말이지만 꼭!! ModalContext가 내려오는 곳에서만 사용하세요!!
 * @param mutationKey
 * @param mutationFn
 * @param resultToMessage
 * @param errorToMessage
 * @param onSuccessClick
 * @param onFailureClick
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
) {
  const modal = useModal();
  const { resultToMessage, errorToMessage, onSuccessClick, onFailureClick } = message ?? {};
  const mutation = useMutation(mutationKey, mutationFn, {
    onSuccess(data, variables, context) {
      const message = resultToMessage?.(data) ?? '성공했습니다.';
      modal?.show({
        content: (
          <OkDialogModalContent
            title="완료"
            text={message}
            onOkClick={() => {
              modal?.hide();
              onSuccessClick?.(data);
            }}
          />
        ),
      });
    },
    onError(error: Error, variables, context) {
      modal?.show({
        content: (
          <OkDialogModalContent
            title="오류"
            text={error.message ?? '요청에 실패했습니다'}
            onOkClick={() => {
              modal?.hide();
              onFailureClick?.(error);
            }}
          />
        ),
      });
    },
  });
  return { mutation, modal };
}
