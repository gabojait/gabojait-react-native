import { useContext } from 'react';
import { ModalContext } from './context';

export default function useModal() {
  const modal = useContext(ModalContext);
  return modal;
}
