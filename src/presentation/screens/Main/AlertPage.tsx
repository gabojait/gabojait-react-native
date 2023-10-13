import { BaseCard } from '@/presentation/components/BaseCard';
import { Notification } from '@/data/localdb';
import { Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useNotificationRepository } from '@/data/localdb/notificationProvider';
import { AlertType } from '@/data/model/type/AlertType';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { RootStackNavigationProps } from '@/presentation/navigation/RootNavigation';

export function useNotification() {
  const [notifications, setNotifications] = useState([] as Notification[]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);

  const notificationRepository = useNotificationRepository();

  const refetch = () => notificationRepository?.findByPage(page);

  useEffect(() => {
    refetch();
  }, [page]);
  const fetchNextPage = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (notificationRepository) {
      setIsRefreshing(true);
      notificationRepository
        .findByPage(0)
        .then(res => {
          setIsRefreshing(false);
          setNotifications(res);
        })
        .catch(e => {
          setIsRefreshing(false);
        });
    }
  }, [notificationRepository]);

  return {
    notifications,
    isRefreshing,
    fetchNextPage,
    refetch,
  };
}

export default function AlertPage({ navigation }: MainStackScreenProps<'AlertPage'>) {
  const { notifications, isRefreshing, fetchNextPage, refetch } = useNotification();
  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1, paddingTop: 16 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={notifications}
          renderItem={({ item }) => (
            <BaseCard
              title={item.title}
              key={item.id}
              style={{ marginHorizontal: 20, marginVertical: 9 }}
              onPress={() => {
                switch (AlertType[item.type]) {
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
                    return navigation.push('ApplyStatus');
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
