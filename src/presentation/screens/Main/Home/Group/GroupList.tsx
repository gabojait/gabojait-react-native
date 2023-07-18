import FloatingButton from '@/presentation/components/FloatingButton';
import { makeStyles, useTheme } from '@rneui/themed';
import React, { useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import TeamBanner from '@/presentation/components/TeamBanner';
import { ModalContext } from '@/presentation/components/modal/context';
import { BoardStackParamListProps } from '@/presentation/navigation/types';
import { getRecruiting, GetRecruitingProps } from '@/data/api/team';
import BottomModalContent from '@/presentation/components/modalContent/BottomModalContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useModelList } from '../../../../../reactQuery/useModelList';
import RecruitingTeamDto from '@/data/model/Team/TeamBriefDto';
import useModal from '@/presentation/components/modal/useModal';
import { Position } from '@/data/model/type/Position';

const GroupList = ({ navigation }: BoardStackParamListProps<'GroupList'>) => {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const modal = useModal();
  const GUIDE_MODE_MODAL_KEY = 'guideModeModalKey';
  const GUIDE_MODE_MODAL_VALUE = 'guideModeModalValue';
  const { data, isLoading, error, fetchNextPage, refetch, param, isRefreshing } = useModelList<
    GetRecruitingProps,
    RecruitingTeamDto
  >({
    initialParam: { pageFrom: 0, pageSize: 20, position: Position.None, teamOrder: 'created' },
    key: 'recruiting',
    fetcher: async ({ pageParam }) => {
      console.log('fetch!!');
      console.log('pageParam:', pageParam);
      return await getRecruiting(pageParam!);
    },
  });

  async function getGuideModeModalKey() {
    try {
      const value = await AsyncStorage.getItem(GUIDE_MODE_MODAL_KEY);
      return value;
    } catch (error) {
      console.log(`GUIDE_MODE_MODAL_KEY 저장실패`);
    }
  }
  async function saveGuideModeModalKey() {
    try {
      await AsyncStorage.setItem(GUIDE_MODE_MODAL_KEY, JSON.stringify(GUIDE_MODE_MODAL_VALUE));
      console.log(`저장한 데이터:${JSON.stringify(GUIDE_MODE_MODAL_VALUE)}`);
    } catch (error) {
      console.log(`GUIDE_MODE_MODAL_KEY 저장실패`);
    }
    const value = getGuideModeModalKey();
    console.log(`GUIDE_MODE_MODAL_KEY 값 확인: ${value}`);
  }

  function handleNeverSeeAgain() {
    saveGuideModeModalKey();
    modal?.hide();
  }

  const handleBottomSlideModal = () => {
    getGuideModeModalKey().then(result => {
      console.log(`result 값 확인: ${result}`);
      if (!result) {
        modal?.show({
          title: '',
          content: (
            <BottomModalContent
              title="팀 찾기 모드로 변경하시겠어요?"
              children={
                <View>
                  <Text style={styles.text}>팀 찾기 모드로 변경하면</Text>
                  <Text style={styles.text}> 원하는 팀을 찾아서 함께할 수 있습니다!</Text>
                </View>
              }
              yesButton={{
                title: '변경하기',
                onPress: () => {
                  navigation.navigate('TeamMate');
                  modal.hide();
                },
              }}
              noButton={{
                title: '나중에 하기',
                onPress: () => {
                  modal.hide();
                },
              }}
              neverSeeAgainShow={true}
              onNeverSeeAgainPress={() => {
                return handleNeverSeeAgain();
              }}
            />
          ),
          modalProps: { animationType: 'slide', justifying: 'bottom' },
        });
      }
    });
  };

  useEffect(() => {
    handleBottomSlideModal();
  }, []);

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
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      {data && (
        <FlatList
          keyExtractor={item => item.teamId.toString()}
          data={data?.pages.flat()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MainNavigation', {
                  screen: 'GroupDetail',
                  params: { teamId: item.teamId },
                })
              }
            >
              <TeamBanner teamMembersCnt={item.teamMemberCnts} teamName={item.projectName} />
            </TouchableOpacity>
          )}
          refreshing={isRefreshing}
          onRefresh={refetch}
          onEndReached={() => {
            fetchNextPage();
          }}
          onEndReachedThreshold={0.6}
        />
      )}

      <View
        style={{
          position: 'absolute',
          flex: 1,
          flexDirection: 'column-reverse',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          width: '95%',
          backgroundColor: theme.colors.disabled,
        }}
      >
        <FloatingButton
          title="팀 생성"
          onPress={() => navigation.navigate('MainNavigation', { screen: 'GroupCreator' })}
        />
      </View>
    </View>
  );
};
const useStyles = makeStyles(theme => ({
  text: {
    textAlign: 'center',
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: 'black',
  },
}));
export default GroupList;
