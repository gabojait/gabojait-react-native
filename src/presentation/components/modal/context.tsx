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
    title,
    content,
    ...modalProps
  }: {
    title: React.ReactNode;
    content: React.ReactNode;
    modalProps?: CustomModalProps;
  }) => void;
  hide: () => void;
  title: React.ReactNode;
  modal: boolean;
  modalProps: CustomModalProps;
};

let ModalContext: React.Context<ModalContextType | undefined>;
const { Provider } = (ModalContext = React.createContext<ModalContextType | undefined>({
  content: <></>,
  show: () => {},
  hide: () => {},
  title: <></>,
  modal: false,
  modalProps: { animationType: undefined, justifying: undefined },
}));

const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { modal, show, hide, title, content, modalProps } = useRealModal();
  return (
    <Provider
      value={{
        modal,
        show,
        hide,
        title,
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
