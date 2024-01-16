import { postFavoriteTeam } from '@/data/api/favorite';
import { getTeam } from '@/data/api/team';
import TeamDetailDto from '@/data/model/Team/TeamDetailDto';
import { FilledButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useQueryErrorResetBoundary,
  UseQueryResult,
} from 'react-query';
import useGlobalStyles from '@/presentation/styles';
import { isFavorite, mapToInitial } from '@/presentation/utils/util';
import FavoriteUpdateDto from '@/data/model/Favorite/FavoriteUpdateDto';
import { Input } from '@rneui/base';
import useModal from '@/presentation/components/modal/useModal';
import { favoriteKeys } from '@/reactQuery/key/FavoriteKeys';
import { teamKeys } from '@/reactQuery/key/TeamKeys';
import Error404Boundary from '@/presentation/components/errorComponent/Error404Boundary';
import { Loading } from '@/presentation/screens/Loading';
import { ReportCompleteModal } from '@/presentation/components/ReportCompleteModal';
import BookMarkHeader from '@/presentation/screens/Headers/BookmarkHeader';
import {
  Position,
  PositionCurrentCntField,
  PositionFromIndex,
  PositionMaxCntField,
} from '@/data/model/type/Position';
import { BottomInputModalContent } from '@/presentation/components/modalContent/BottomInputModalContent';

const GroupDetail = ({ navigation, route }: MainStackScreenProps<'GroupDetail'>) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Suspense fallback={Loading()}>
      <Error404Boundary onReset={reset}>
        <GroupDetailComponent navigation={navigation} route={route} />
      </Error404Boundary>
    </Suspense>
  );
};

const GroupDetailComponent = ({ navigation, route }: MainStackScreenProps<'GroupDetail'>) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const modal = useModal();
  const { teamId } = route.params!;
  const queryClient = useQueryClient();
  const reportStateRef = useRef<Input>(null);
  const { data, isLoading, error }: UseQueryResult<TeamDetailDto> = useQuery(
    teamKeys.getTeamByTeamId(teamId),
    () => getTeam(teamId),
    {
      useErrorBoundary: true,
    },
  );
  const { mutate: mutateFavorite, data: favoriteResponse } = useMutation(
    favoriteKeys.favoriteTeam,
    (args: [string, FavoriteUpdateDto]) => postFavoriteTeam(...args),
    {
      useErrorBoundary: true,
      retry: 0,
      onSettled: (data, error, [_teamId], context) => {
        queryClient.invalidateQueries([
          teamKeys.getTeamByTeamId(_teamId),
          favoriteKeys.favoriteTeam,
        ]);
      },
      onMutate: async ([_teamId, { isAddFavorite }]) => {
        await queryClient.cancelQueries(teamKeys.getTeamByTeamId(_teamId));
        const oldData = queryClient.getQueryData(
          teamKeys.getTeamByTeamId(_teamId),
        ) as TeamDetailDto;
        const newData = { ...oldData, isFavorite: isAddFavorite };
        queryClient.setQueryData(teamKeys.getTeamByTeamId(_teamId), newData);
      },
    },
  );

  const [reportButtonState, setReportButtonState] = useState({
    text: '신고하기',
    isDisabled: true,
  });

  useEffect(() => {
    if ((reportStateRef.current?.props?.value?.length ?? 0) > 0) {
      setReportButtonState({ text: '완료', isDisabled: false });
    } else {
      setReportButtonState({ text: '신고하기', isDisabled: true });
    }
  }, [reportStateRef.current?.props.value]);

  const reportCompletedModal = () => {
    modal?.show({
      content: <ReportCompleteModal onPressYesButton={() => modal.hide()} />,
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  };

  const handleReportModal = () => {
    modal?.show({
      content: (
        <BottomInputModalContent
          header={<Text style={globalStyles.modalTitle}>팀을 신고하시겠습니까?</Text>}
          visible={modal?.modal}
          onBackgroundPress={modal?.hide}
          yesButton={{
            title: '신고하기',
            onPress: () => {
              console.log('신고하기', reportStateRef.current);
              modal.hide();
              reportCompletedModal();
            },
          }}
          noButton={{
            title: '취소',
            onPress: () => {
              console.log('신고하기');
              modal.hide();
            },
          }}
          onInputValueChange={(text: string) => {}}
        />
      ),
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  };

  const teamRecruits = useMemo(() => {
    const teamCnts = [];
    for (let i = 0; i < 5; i++) {
      if (data && data[PositionMaxCntField[PositionFromIndex[i]]] > 0) {
        teamCnts.push({
          currentCnt: data[PositionCurrentCntField[PositionFromIndex[i]]],
          recruitCnt: data[PositionMaxCntField[PositionFromIndex[i]]],
          position: PositionFromIndex[i],
        });
      }
    }
    return teamCnts;
  }, [data]);

  useEffect(() => {
    isFavorite(data?.isFavorite!);
  }, [data]);

  function handleFavoriteTeam() {
    mutateFavorite([teamId, { isAddFavorite: !data?.isFavorite }]);
  }

  if (!data) {
    return null;
  }

  return (
    <View style={{ backgroundColor: 'white' }}>
      <BookMarkHeader
        onPressBookMark={handleFavoriteTeam}
        onPressReport={handleReportModal}
        toChangeColor={isFavorite(data?.isFavorite!)}
      />
      <ScrollView style={[globalStyles.scrollView]}>
        <CardWrapper style={[styles.card, { minHeight: 243 }]}>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.teamname}>{data?.projectName}</Text>
            <View style={styles.partIcon}>
              {teamRecruits
                .filter(recruit => recruit.position != Position.None)
                .map(item => (
                  <PositionWaveIcon
                    currentCnt={item.currentCnt}
                    recruitNumber={item.recruitCnt}
                    textView={
                      <Text style={globalStyles.itnitialText}>{mapToInitial(item.position)}</Text>
                    }
                    key={item.position}
                    radious={theme.positionIconRadious.md}
                  />
                ))}
            </View>
            <FilledButton
              title={'함께 하기'}
              onPress={() => navigation.navigate('PositionSelector', { teamId: teamId })}
            />
          </View>
        </CardWrapper>
        <CardWrapper style={[styles.card, globalStyles.FlexStartCardWrapper, { minHeight: 243 }]}>
          <View>
            <Text style={styles.title}>프로젝트 설명</Text>
            <Text style={globalStyles.textLight13}>{data?.projectDescription}</Text>
          </View>
        </CardWrapper>
        <CardWrapper style={[styles.card, globalStyles.FlexStartCardWrapper, { minHeight: 243 }]}>
          <View>
            <Text style={styles.title}>바라는 점</Text>
            <Text style={globalStyles.textLight13}>{data?.expectation}</Text>
          </View>
        </CardWrapper>
      </ScrollView>
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  card: {
    paddingHorizontal: 13,
    paddingVertical: 17,
    marginTop: 20,
    marginHorizontal: 20,
  },
  teamname: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.bold,
    paddingLeft: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: theme.fontWeight.semibold,
    paddingBottom: 5,
    color: theme.colors.black,
  },
  buttonTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.black,
  },
  partIcon: {
    paddingTop: 30,
    paddingBottom: 25,
    flexDirection: 'row',
  },
}));
export default GroupDetail;
