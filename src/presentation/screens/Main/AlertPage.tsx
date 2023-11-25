import { BaseCard } from '@/presentation/components/BaseCard';
import { Text } from '@rneui/themed';
import React from 'react';
import { FlatList, View } from 'react-native';
import { AlertType } from '@/data/model/type/AlertType';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { RootStackNavigationProps } from '@/presentation/navigation/RootNavigation';
import { useModelList } from '@/reactQuery/util/useModelList';
import { getNotifications, makeReadNotification } from '@/data/api/notification';
import { Position } from '@/data/model/type/Position';

const NotificationQueryKey = {
  all: ['notification'],
};

export default function AlertPage({ navigation }: MainStackScreenProps<'AlertPage'>) {
  // Todo: DB 기반 알림 조회 도입

  const initialParam = {
    pageFrom: 1,
    pageSize: 20,
  };

  const {
    data: notifications,
    isRefreshing,
    fetchNextPage,
    refetch,
  } = useModelList({
    initialParam,
    idName: 'notificationId',
    key: NotificationQueryKey.all,
    fetcher: async ({ pageParam = initialParam.pageFrom }) => {
      console.log(pageParam, initialParam.pageSize);
      return await getNotifications({
        pageFrom: pageParam,
        pageSize: initialParam.pageSize,
      });
    },
  });
  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1, paddingTop: 16 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.notificationId}
          data={notifications?.pages.flatMap(page => page.data)}
          renderItem={({ item }) => (
            <BaseCard
              title={item.title}
              key={item.notificationId}
              style={{ marginHorizontal: 20, marginVertical: 9 }}
              onPress={() => {
                // 읽기 처리 결과는 상관 없음
                try {
                  makeReadNotification(item.notificationId);
                } catch (e) {}
                switch (AlertType[item.notificationType]) {
                  case AlertType.TEAM_PROFILE: {
                    // 팀/팀원 합류로 인한 알림. 현재 팀 페이지로 이동
                    return navigation
                      .getParent<RootStackNavigationProps>()
                      .push('MainBottomTabNavigation', { screen: 'Team' });
                  }
                  case AlertType.REVIEW: {
                    return navigation.push('TeamReview', { teamId: '' });
                  }
                  // Offer from User to Team
                  case AlertType.USER_OFFER: {
                    return navigation.push('ApplyStatus', {
                      screen: 'Frontend',
                      params: { position: Position.Frontend },
                    });
                  }
                  // Offer from Team to User
                  case AlertType.TEAM_OFFER: {
                    return navigation.push('OfferFromTeamPage');
                  }
                }
              }}
            >
              <Text numberOfLines={1} ellipsizeMode="tail">
                {item.body}
              </Text>
            </BaseCard>
          )}
          refreshing={isRefreshing}
          onEndReached={() => {
            fetchNextPage();
          }}
          onRefresh={() => {
            refetch();
          }}
          onEndReachedThreshold={0.6}
        />
      </View>
    </>
  );
}
