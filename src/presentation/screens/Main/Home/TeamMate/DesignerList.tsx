import { GetProfileProps, getUserSeekingTeam } from '@/data/api/profile';
import UserProfileBriefDto from '@/data/model/User/UserProfileBriefDto';
import CardWrapper from '@/presentation/components/CardWrapper';
import Gabojait from '@/presentation/components/icon/Gabojait';
import { RatingBar } from '@/presentation/components/RatingBar';
import {
  PositionTabParamListProps,
  TeammateStackParamListProps,
} from '@/presentation/navigation/types';

import { useModelList } from '@/reactQuery/util/useModelList';
import { makeStyles, Text, useTheme } from '@rneui/themed';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Position } from '@/data/model/type/Position';
import { ProfileOrder } from '@/data/model/type/ProfileOrder';
import { profileKeys } from '@/reactQuery/key/ProfileKeys';

const QueryKey = {
  all: 'designerList',
  filtered: (filter: GetProfileProps) => [...QueryKey.all, 'filtered', filter],
};

const DesignerList = ({ navigation, route }: PositionTabParamListProps<'Designer'>) => {
  const { theme } = useTheme();
  const styles = useStyles();
  const initialParam: GetProfileProps = {
    pageFrom: 0,
    pageSize: 20,
    position: Position.Designer,
    profileOrder: 'ACTIVE',
  };
  const { data, isLoading, error, fetchNextPage, refetch, isRefreshing } = useModelList<
    GetProfileProps,
    UserProfileBriefDto
  >({
    initialParam,
    key: profileKeys.designerSeekingTeam,
    fetcher: async ({ pageParam, queryKey: [_, params] }) => {
      return await getUserSeekingTeam({ ...(params as GetProfileProps), pageFrom: pageParam }!);
    },
  });

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
              navigation.getParent()?.navigate('ProfilePreview', { userId: item.userId });
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
                  <Text style={styles.position}>UI/UX 디자이너</Text>
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

export default DesignerList;
