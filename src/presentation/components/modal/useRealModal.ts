import React from 'react';
import { CustomModalProps } from './context';

export default () => {
  const [modal, setModal] = React.useState(false);
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const [modalProps, setModalProps] = React.useState<CustomModalProps>({
    dismissible: undefined,
    animationType: undefined,
    justifying: undefined,
  });

  const show: ({
    content,
    modalProps,
  }: {
    content: React.ReactNode;
    modalProps?: CustomModalProps;
  }) => void = ({ content, modalProps }) => {
    setModal(true);
    if (content) {
      setContent(content);
      setModalProps(prevState => ({
        ...prevState,
        dismissible: modalProps?.dismissible,
        animationType: modalProps?.animationType,
        justifying: modalProps?.justifying,
      }));
    }
  };
  const hide = () => {
    setModal(false);
    setContent(null);
  };

  return { modal, show, hide, content, modalProps, setContent };
};
