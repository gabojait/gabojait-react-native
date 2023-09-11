import useModal from '@/presentation/components/modal/useModal';
import { MutationKey, MutationFunction, useMutation, UseMutationOptions } from 'react-query';
import React, { useEffect } from 'react';
import { DialogLoading } from '@rneui/base/dist/Dialog/Dialog.Loading';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import { Text } from 'react-native';
import { View } from 'react-native';
import useGlobalStyles from '@/presentation/styles';
import LoadingSpinner from '@/presentation/screens/Loading';
import OkDialogModalContent from '@/presentation/components/modalContent/OkDialogModalContent';

/**
 * 회원가입에서와 같이 Mutation의 결과로 다이얼로그를 띄우는 커스텀 훅입니다.
 * 혹시나 노파심에 하는 말이지만 꼭!! ModalContext가 내려오는 곳에서만 사용하세요!!
 * @param mutationKey
 * @param mutationFn
 * @param message
 * @param options
 * @returns
 */

interface modalContentProp {
  icon?: string;
  title?: string;
  content?: string;
}

export const ModalType = {
  CENTER: 'CENTER',
  BOTTOM: 'BOTTOM',
};
export type ModalType = keyof typeof ModalType;

export function useMutationDialog<TVariables, TData>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  modalType: ModalType,
  message?: {
    onSuccessClick?: (result: unknown) => void;
    onFailureClick?: (error: unknown) => void;
    resultModalContent?: modalContentProp;
  },
  options?: Omit<
    UseMutationOptions<TData, unknown, TVariables, unknown>,
    'mutationKey' | 'mutationFn'
  >,
) {
  const modal = useModal();
  const { onSuccessClick, onFailureClick, resultModalContent } = message ?? {};
  const mutation = useMutation(mutationKey, mutationFn, options);
  const globalStyles = useGlobalStyles();
  let { icon = '', title = '성공', content = '성공했습니다' } = resultModalContent ?? {};
  const error = mutation.error as Error;

  useEffect(() => {
    modal?.hide();
    if (mutation.isLoading) {
      modal?.show({
        content: <LoadingSpinner />,
      });
      return;
    }

    if (mutation.isSuccess) {
      modal?.show({
        content:
          modalType == ModalType.CENTER ? (
            <OkDialogModalContent
              title={title}
              text={content}
              onOkClick={() => {
                modal.hide();
                onSuccessClick?.(mutation.data);
              }}
            />
          ) : (
            <BottomModalContent
              header={<Text style={globalStyles.modalEmoji}>{icon}</Text>}
              children={
                <View>
                  {<Text style={[globalStyles.modalTitle, { paddingBottom: 12 }]}>{title}</Text>}
                  {<Text style={globalStyles.modalContent}>{content}</Text>}
                </View>
              }
              yesButton={{
                title: '완료',
                onPress: () => {
                  modal.hide();
                  onSuccessClick?.(mutation.data);
                },
              }}
            />
          ),
      });
    } else if (mutation.isError) {
      modal?.show({
        content:
          modalType == ModalType.CENTER ? (
            <OkDialogModalContent
              title={title}
              text={title}
              onOkClick={() => {
                modal.hide();
                onFailureClick?.(mutation.error);
              }}
            />
          ) : (
            <BottomModalContent
              header={<Text style={globalStyles.modalEmoji}>😔</Text>}
              children={
                <View style={{ justifyContent: 'center' }}>
                  <Text style={globalStyles.modalTitle}>에러가 발생했습니다</Text>
                  <Text style={globalStyles.modalContent}>{error.message}</Text>
                </View>
              }
              yesButton={{
                title: '완료',
                onPress: () => {
                  modal.hide();
                  onFailureClick?.(mutation.error);
                },
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
