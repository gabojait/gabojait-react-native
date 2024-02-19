import { BaseCard } from '@/presentation/components/BaseCard';
import { Text, useTheme } from '@rneui/themed';
import React from 'react';
import { Animated, FlatList, View } from 'react-native';
import { MainStackScreenProps } from '@/presentation/navigation/types';
import { useModelList } from '@/reactQuery/util/useModelList';
import { getNotifications, makeReadNotification } from '@/data/api/notification';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { openDeepLink, removeCache } from '@/presentation/utils/FcmMessageUtils';
import { useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();
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

  function handleNotification(notification: Notification) {
    try {
      makeReadNotification(notification.notificationId);
    } catch (e) {}
    removeCache(notification.deepLink.url, queryClient);
    openDeepLink(notification.deepLink.url);
  }

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
              onPress={() => handleNotification(item)}
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
