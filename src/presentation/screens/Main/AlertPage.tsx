import { BaseCard } from '@/presentation/components/BaseCard';
import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Animated, FlatList, View } from 'react-native';
import { AlertType } from '@/data/model/type/AlertType';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { RootStackNavigationProps } from '@/presentation/navigation/RootNavigation';
import { useModelList } from '@/reactQuery/util/useModelList';
import { getNotifications, makeReadNotification } from '@/data/api/notification';
import { Position } from '@/data/model/type/Position';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const { theme } = useTheme();

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View
        style={{
          justifyContent: 'center',
        }}
      >
        <View>
          <Text
            style={{
              fontSize: theme.fontSize.md,
            }}
          >
            알림을 삭제할까요?
          </Text>
        </View>
        <Animated.View style={[{ opacity }]}>
          <TouchableOpacity>
            <Text>예</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

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
              style={{
                marginHorizontal: 20,
                marginVertical: 9,
                paddingHorizontal: 20,
                borderColor: item.isRead ? theme.colors.grey2 : theme.colors.primary,
                opacity: item.isRead ? 0.6 : 1,
              }}
              enabled={!item.isRead}
              onPress={() => {
                // 읽기 처리 결과는 상관 없음
                try {
                  makeReadNotification(item.notificationId);
                } catch (e) {}
                switch (AlertType[item.notificationType]) {
                  case AlertType.NEW_TEAM_MEMBER:
                  case AlertType.FIRED_TEAM_MEMBER:
                  case AlertType.QUIT_TEAM_MEMBER:
                  case AlertType.TEAM_INCOMPLETE:
                  case AlertType.TEAM_PROFILE_UPDATED: {
                    // 팀/팀원 합류로 인한 알림. 현재 팀 페이지로 이동
                    return navigation
                      .getParent<RootStackNavigationProps>()
                      .replace('MainBottomTabNavigation', { screen: 'Team' });
                  }
                  case AlertType.TEAM_COMPLETE: {
                    return navigation.replace('MainNavigation', { screen: 'TeamHistory' });
                  }
                  // Offer from User to Team
                  case AlertType.USER_OFFER: {
                    return navigation.replace('MainNavigation', {
                      screen: 'ApplyStatus',
                      params: { position: Position.Frontend },
                    });
                  }
                  // Offer from Team to User
                  case AlertType.TEAM_OFFER: {
                    return navigation.replace('MainNavigation', { screen: 'OfferFromTeamPage' });
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
