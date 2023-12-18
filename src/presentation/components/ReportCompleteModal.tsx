import { Text } from 'react-native';
import useModal from './modal/useModal';
import BottomModalContent from './modalContent/BottomModalContent';
import useGlobalStyles from '../styles';

interface ModalProps {
  onPressYesButton: () => void;
  onPressNoButton?: () => void;
}

export const ReportCompleteModal = ({ onPressYesButton, onPressNoButton }: ModalProps) => {
  const globalStyles = useGlobalStyles();
  const modal = useModal();

  return (
    <BottomModalContent
      header={<Text style={globalStyles.modalEmoji}>✅</Text>}
      inputContent={<Text style={globalStyles.modalTitle}>신고완료</Text>}
      yesButton={{ title: '완료', onPress: () => onPressYesButton() }}
    />
  );
};
