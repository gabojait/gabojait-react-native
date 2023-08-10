import { FilledButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import { useQuery, useQueryClient, useQueryErrorResetBoundary, UseQueryResult } from 'react-query';
import TeamDetailDto from '@/data/model/Team/TeamDetailDto';
import { getTeam } from '@/data/api/team';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import BriefOfferDto from '@/data/model/Offer/BriefOfferDto';
import { Position } from '@/data/model/type/Position';
import { applyToTeam } from '@/data/api/offer';
import useModal from '@/presentation/components/modal/useModal';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import { useMutationDialog } from '@/reactQuery/util/useMutationDialog';
import { offerKeys } from '@/reactQuery/key/OfferKeys';
import { Fallback404 } from '@/presentation/components/errorComponent/Fallback';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';

interface ApplyPositionCardProps {
  data: PositionRecruiting;
  offers: BriefOfferDto[];
  onApplyButtonPressed: (position: Position) => void;
}

type RecruitStatusType = '함께하기' | '모집완료' | '지원완료';
type PositionTextNameType = '디자이너' | '기획자' | '프론트엔드' | '백엔드';

interface ApplyPositionCardState {
  title: PositionTextNameType;
  buttonState: RecruitStatusType;
  buttonDisabled: boolean;
}

const PositionSelector = ({ navigation, route }: MainStackScreenProps<'PositionSelector'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Error404Boundary onReset={reset}>
      <PositionSelectorComponent navigation={navigation} route={route} />
    </Error404Boundary>
  );
};

const PositionSelectorComponent = ({
  navigation,
  route,
}: MainStackScreenProps<'PositionSelector'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const modal = useModal();
  const { teamId } = route.params!;
  const { data, isLoading, error }: UseQueryResult<TeamDetailDto> = useQuery(
    [teamKeys.getTeam, teamId],
    () => getTeam(teamId),
  );
  const positions = data?.teamMemberCnts || [];
  const queryClient = useQueryClient();
  const { mutation: offerMutation } = useMutationDialog<[Position, string], unknown>(
    offerKeys.offerToTeam,
    (args: [Position, string]) => applyToTeam(...args),
    {
      resultToMessage: _ => '함께하기 요청이 전달되었습니다\n 결과를 기다려주세요',
      onSuccessClick() {
        queryClient.invalidateQueries(teamKeys.getTeam);
      },
    },
  );
  //TODO: 에러처리결과-> 버튼 상태분기, 모달 띄우기
  function applyCompletedModal() {
    modal?.show({
      content: (
        <SymbolModalContent
          title="지원 완료!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>👏</Text>}
          text={'함께하기 요청이 전달되었습니다\n 결과를 기다려주세요'}
          yesButton={{ title: '확인', onPress: () => modal.hide() }}
        />
      ),
    });
  }

  if (isLoading && !data) {
    return <Text>로딩 중</Text>;
  }

  if (error) {
    return <Text>에러 발생</Text>;
  }

  if (!data) {
    return null;
  }

  return (
    <ScrollView style={styles.scrollView}>
      {positions.map((item, index) => (
        <ApplyPositionCard
          data={item}
          offers={data.offers}
          onApplyButtonPressed={(position: Position) => {
            offerMutation.mutate([position, teamId]);
          }}
        />
      ))}
    </ScrollView>
  );
};

const ApplyPositionCard = ({ data, offers, onApplyButtonPressed }: ApplyPositionCardProps) => {
  const styles = useStyles();
  const [state, setState] = useState<ApplyPositionCardState>({
    title: handleTitle(),
    buttonState: handleButtonState(),
    buttonDisabled: true,
  });

  useEffect(() => {
    if (state.buttonState == '함께하기') {
      setState(prevState => ({ ...prevState, buttonDisabled: false }));
    } else {
      setState(prevState => ({ ...prevState, buttonDisabled: true }));
    }
  }, [state.buttonState]);

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

  function handleButtonState(): RecruitStatusType {
    const offerThisPosition = offers.some(item => item.position == data.position);

    if (data.currentCnt == data.recruitCnt) {
      return '모집완료';
    } else if (offerThisPosition) {
      return '지원완료';
    }
    return '함께하기';
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
          />
          <Text style={styles.text}>{data.position}</Text>
        </View>
        <FilledButton
          title={state.buttonState}
          size="sm"
          disabled={state.buttonDisabled}
          onPress={() => onApplyButtonPressed(data.position)}
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
    marginVertical: 5,
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
  },
  posiionText: {
    fontSize: 20,
    fontWeight: theme.fontWeight.bold,
  },
}));

export default PositionSelector;
