import CardWrapper from '@/presentation/components/CardWrapper';
import Gabojait from '@/presentation/components/icon/Gabojait';
import { RatingBar } from '@/presentation/components/RatingBar';
import { makeStyles, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import UserProfileBriefDto from '@/data/model/User/UserProfileBriefDto';
import { useModelList } from '@/reactQuery/util/useModelList';
import { GetProfileProps, getUserSeekingTeam } from '@/data/api/profile';
import { Position } from '@/data/model/type/Position';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';
import { PositionTabParamListProps } from '@/presentation/navigation/types';

const FrontendList = ({ navigation, route }: PositionTabParamListProps<'Frontend'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList<
    GetProfileProps,
    UserProfileBriefDto
  >({
    initialParam: {
      pageFrom: 0,
      pageSize: 20,
      position: Position.Frontend,
      profileOrder: 'ACTIVE',
    },
    key: profileKeys.frontendSeekingTeam,
    fetcher: async ({ pageParam, queryKey: [_, params] }) => {
      return await getUserSeekingTeam({ ...(params as GetProfileProps), pageFrom: pageParam });
    },
  });

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
        paddingVertical: 15,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.nickname}
        data={data?.pages.map(page => page.data).flat()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfilePreview', { userId: item.userId });
            }}
          >
            <CardWrapper
              style={{
                marginVertical: 5,
                marginHorizontal: 20,
                borderWidth: 1,
                borderColor: theme.colors.disabled,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingVertical: 32,
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                  alignContent: 'center',
                }}
              >
                <View>
                  <Text style={styles.name}>{item.nickname}</Text>
                  <Text style={styles.position}>프론트 개발자</Text>
                  <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
                    <RatingBar ratingScore={item.rating} />
                    <Text style={styles.score}>{item.rating}</Text>
                  </View>
                </View>
                <TouchableOpacity style={{ justifyContent: 'center' }}>
                  <Gabojait name="arrow-next" size={28} color={theme.colors.disabled} />
                </TouchableOpacity>
              </View>
            </CardWrapper>
          </TouchableOpacity>
        )}
        refreshing={isRefreshing}
        onRefresh={refetch}
        onEndReached={() => {
          fetchNextPage();
        }}
        onEndReachedThreshold={0.6}
      />
    </View>
  );
};

const useStyles = makeStyles(theme => ({
  name: {
    fontSize: 18,
    fontWeight: theme.fontWeight?.semibold,
    color: 'black',
  },
  position: {
    fontSize: 12,
    fontWeight: theme.fontWeight?.light,
    color: 'black',
    paddingBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: theme.fontWeight?.bold,
    color: 'black',
    paddingLeft: 10,
  },
}));

export default FrontendList;
