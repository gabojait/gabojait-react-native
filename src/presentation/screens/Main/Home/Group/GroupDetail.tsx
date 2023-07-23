import { postFavoriteTeam } from '@/data/api/favorite';
import { getTeam } from '@/data/api/team';
import TeamDetailDto from '@/data/model/Team/TeamDetailDto';
import { FilledButton } from '@/presentation/components/Button';
import CardWrapper from '@/presentation/components/CardWrapper';
import CustomHeader from '@/presentation/components/CustomHeader';
import PositionWaveIcon from '@/presentation/components/PositionWaveIcon';
import CustomIcon from '@/presentation/components/icon/Gabojait';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useMutation, useQuery, UseQueryResult } from 'react-query';
import useGlobalStyles from '@/presentation/styles';
import { mapToInitial } from '@/presentation/utils/util';
import FavoriteUpdateDto from '@/data/model/Favorite/FavoriteUpdateDto';
import { Icon } from '@rneui/base';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import SymbolModalContent from '@/presentation/components/modalContent/SymbolModalContent';
import GetTeamErrorBoundary from '@/presentation/components/errorComponent/GetTeamErrorBoundary';
import useModal from '@/presentation/components/modal/useModal';

const GroupDetail = ({ navigation, route }: MainStackScreenProps<'GroupDetail'>) => {
  return (
    <GetTeamErrorBoundary
      fallback={
        <>
          <Text>수고</Text>
        </>
      }
    >
      <GroupDetailComponent navigation={navigation} route={route} />
    </GetTeamErrorBoundary>
  );
};

const GroupDetailComponent = ({ navigation, route }: MainStackScreenProps<'GroupDetail'>) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const globalStyles = useGlobalStyles();
  const modal = useModal();
  const { teamId } = route.params!;

  const { data, isLoading, error }: UseQueryResult<TeamDetailDto> = useQuery(
    ['GroupDetail', teamId],
    () => getTeam(teamId),
    {
      useErrorBoundary: true,
      retry: 0,
    },
  );
  const { mutate: mutateFavorite, data: favoriteResponse } = useMutation(
    'postFavorite',
    (args: [number, FavoriteUpdateDto]) => postFavoriteTeam(...args),
    {
      useErrorBoundary: true,
      retry: 0,
      onSuccess: () => {
        console.log(favoriteResponse);
      },
    },
  );
  const [favoriteState, setFavoriteState] = useState<FavoriteUpdateDto>({
    isAddFavorite: data?.isFavorite || false,
  });
  const positions: Array<PositionRecruiting> = data?.teamMemberCnts || [];
  const [reportState, setReportState] = useState('');
  const [reportButtonState, setReportButtonState] = useState({
    text: '신고하기',
    isDisabled: true,
  });

  useEffect(() => {
    if (reportState.length > 0) {
      setReportButtonState({ text: '완료', isDisabled: false });
    } else {
      setReportButtonState({ text: '신고하기', isDisabled: true });
    }
  }, [reportState]);

  const reportCompeletedModal = () => {
    modal?.show({
      content: (
        <SymbolModalContent
          title="신고완료!"
          symbol={<Text style={{ fontSize: theme.emojiSize.md, textAlign: 'center' }}>✅</Text>}
          text={'신고가 완료되었습니다.'}
          yesButton={{ title: '확인', onPress: () => modal.hide() }}
        />
      ),
      modalProps: { animationType: 'none', justifying: 'center' },
    });
  };

  const handleReportModal = () => {
    modal?.show({
      content: (
        <BottomModalContent
          title="팀을 신고하시겠습니까?"
          children={
            <View>
              <Text style={globalStyles.textLight11}>신고 사유를 적어주세요</Text>
              <CardWrapper style={[globalStyles.card, { minHeight: 160 }]}>
                <TextInput
                  value={reportState}
                  onChangeText={(text: string) => {
                    setReportState(text);
                  }}
                  multiline={true}
                  maxLength={500}
                />
              </CardWrapper>
            </View>
          }
          yesButton={{
            title: reportButtonState.text,
            onPress: () => {
              modal.hide();
              reportCompeletedModal();
            },
            disabled: reportButtonState.isDisabled,
          }}
          noButton={{
            title: '나가기',
            onPress: () => {
              modal.hide();
            },
          }}
          neverSeeAgainShow={false}
        />
      ),
      modalProps: { animationType: 'slide', justifying: 'bottom' },
    });
  };

  function isFavorite() {
    if (data?.isFavorite) {
      return theme.colors.primary;
    }
    return 'black';
  }
  //TODO: 200,201 결과로 찜 아이콘 색 분기하기
  function handleFavoriteTeam() {
    if (data?.isFavorite) {
      mutateFavorite([teamId, { isAddFavorite: !favoriteState.isAddFavorite }]);
    } else {
      mutateFavorite([teamId, { isAddFavorite: !favoriteState.isAddFavorite }]);
    }
  }

  // if (isLoading && !data) {
  //   return <Text>로딩 중</Text>
  // }

  // if (error) {
  //   return <Text>에러 발생</Text>
  // }

  // if (!data) {
  //   return null
  // }

  //TODO: BookMarkHeader로 묶어서 팀원찾기/프로필미리보기 에서 사용하기
  return (
    <>
      <CustomHeader
        title={''}
        canGoBack={true}
        rightChildren={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleFavoriteTeam} style={{ paddingRight: 25 }}>
              <CustomIcon name="heart" size={30} color={isFavorite()} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleReportModal}>
              <Icon type="entypo" name="dots-three-vertical" size={20} />
            </TouchableOpacity>
          </View>
        }
      />
      <ScrollView style={styles.scrollView}>
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
              {positions.map((item, index) => (
                <PositionWaveIcon
                  currentCnt={item.currentCnt}
                  recruitNumber={item.recruitCnt}
                  textView={
                    <Text style={globalStyles.itnitialText}>{mapToInitial(item.position)}</Text>
                  }
                  key={item.position}
                />
              ))}
            </View>
            <FilledButton
              title={'함께 하기'}
              onPress={() => navigation.navigate('PositionSelector', { teamId })}
            />
          </View>
        </CardWrapper>
        <View style={[styles.card, globalStyles.FlexStartCardWrapper, { minHeight: 243 }]}>
          <View>
            <Text style={styles.title}>프로젝트 설명</Text>
            <Text style={globalStyles.textLight11}>{data?.projectDescription}</Text>
          </View>
        </View>
        <View style={[styles.card, globalStyles.FlexStartCardWrapper, { minHeight: 243 }]}>
          <View>
            <Text style={styles.title}>바라는 점</Text>
            <Text style={globalStyles.textLight11}>{data?.expectation}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  scrollView: {
    backgroundColor: theme.colors.white,
    paddingVertical: 18,
    flex: 1,
  },
  card: {
    paddingHorizontal: 13,
    paddingVertical: 17,
    marginVertical: 5,
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
  partIcon: {
    paddingTop: 30,
    paddingBottom: 25,
    flexDirection: 'row',
  },
}));
export default GroupDetail;
