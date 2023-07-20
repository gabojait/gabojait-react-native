import React from 'react';
import useRealModal from './useRealModal';
import CustomModal from './Modal';
import { ModalBaseProps } from 'react-native';

export interface CustomModalProps extends ModalBaseProps {
  animationType: 'none' | 'slide' | 'fade' | undefined;
  justifying: 'center' | 'bottom' | undefined;
}

type ModalContextType = {
  content: React.ReactNode;
  show: ({
    content,
    ...modalProps
  }: {
    content: React.ReactNode;
    modalProps?: CustomModalProps;
  }) => void;
  hide: () => void;
  modal: boolean;
  modalProps: CustomModalProps;
};

let ModalContext: React.Context<ModalContextType | undefined>;
const { Provider } = (ModalContext = React.createContext<ModalContextType | undefined>({
  content: <></>,
  show: () => {},
  hide: () => {},
  modal: false,
  modalProps: { animationType: undefined, justifying: undefined },
}));

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { modal, show, hide, content, modalProps } = useRealModal();
  return (
    <Provider
      value={{
        modal,
        show,
        hide,
        content,
        modalProps,
      }}
    >
      <CustomModal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };
