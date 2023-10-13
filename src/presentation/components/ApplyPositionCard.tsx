import { Position } from '@/data/model/type/Position';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { FilledButton } from './Button';
import CardWrapper from './CardWrapper';
import PositionWaveIcon from './PositionWaveIcon';
import BriefOfferDto from '@/data/model/Offer/BriefOfferDto';
import PositionRecruiting from '../model/PositionRecruitng';
import React, { useEffect, useState } from 'react';

export type RecruitStatusType = '함께하기' | '모집완료' | '지원완료' | '수락하기';
export type PositionTextNameType = '디자이너' | '기획자' | '프론트엔드' | '백엔드';
export interface ApplyPositionCardProps {
  data: PositionRecruiting;
  offers: BriefOfferDto[];
  buttonTitle: string;
  isButtonDisabled: boolean;
  onApplyButtonPressed: (position: Position) => void;
}
export interface ApplyPositionCardState {
  title: PositionTextNameType;
  buttonTitle: string;
  buttonDisabled: boolean;
  color: string;
}

export const ApplyPositionCard = ({
  data,
  offers,
  buttonTitle,
  isButtonDisabled,
  onApplyButtonPressed,
}: ApplyPositionCardProps) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const [state, setState] = useState<ApplyPositionCardState>({
    title: handleTitle(),
    buttonTitle: buttonTitle,
    buttonDisabled: isButtonDisabled,
    color: isButtonDisabled ? '#D9D9D9' : '#1CDF71',
  });

  useEffect(() => {
    setState(prevState => ({ ...prevState, buttonDisabled: isButtonDisabled }));
  }, [isButtonDisabled]);

  useEffect(() => {
    if (state.buttonDisabled) {
      setState(prevState => ({ ...prevState, color: theme.colors.disabled }));
    } else {
      setState(prevState => ({ ...prevState, color: theme.colors.primary }));
    }
  }, [state.buttonDisabled]);

  function handleTitle(): PositionTextNameType {
    if (data.position == Position.Backend) {
      return '백엔드';
    } else if (data.position == Position.Designer) {
      return '디자이너';
    } else if (data.position == Position.Frontend) {
      return '프론트엔드';
    } else {
      return '기획자';
    }
  }

  return (
    <CardWrapper style={[styles.card]}>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <PositionWaveIcon
            currentCnt={data.currentCnt}
            recruitNumber={data.recruitCnt}
            textView={
              <Text style={styles.posiionText}>
                {data.currentCnt}/{data.recruitCnt}
              </Text>
            }
            key={data.position}
            color={state.color}
          />
          <Text style={styles.text}>{state.title}</Text>
        </View>
        <FilledButton
          title={state.buttonTitle}
          size="sm"
          disabled={state.buttonDisabled}
          onPress={() => {
            onApplyButtonPressed(data.position);
            setState(prevState => ({ ...prevState, buttonDisabled: true }));
          }}
        />
      </View>
    </CardWrapper>
  );
};
const useStyles = makeStyles(theme => ({
  scrollView: {
    backgroundColor: theme.colors.white,
    paddingVertical: 18,
  },
  card: {
    padding: 30,
    marginHorizontal: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    minHeight: 100,
  },
  text: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.semibold,
    paddingTop: 10,
    width: 100,
    textAlignVertical: 'bottom',
    textAlign: 'center',
  },
  posiionText: {
    fontSize: 20,
    fontWeight: theme.fontWeight.bold,
  },
}));
