import { ArrowCard } from '@/presentation/components/BaseCard';
import { getNotifications, Notification } from '@/data/localdb';
import { Text } from '@rneui/themed';
import { useEffect, useState } from 'react';
import React from 'react';
import { FlatList, View } from 'react-native';
import { useDB } from '@/data/localdb/dbProvider';
import { AlertType } from '@/data/model/type/AlertType';

export function useNotification() {
  const [notifications, setNotifications] = useState([] as Notification[]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);

  const db = useDB();

  const refetch = () => (db ? getNotifications(db, page) : {});
  const fetchNextPage = () => {
    setPage(prev => prev + 1);
    refetch();
  };

  useEffect(() => {
    if (db) getNotifications(db, 0).then(res => setNotifications(res));
  }, [db]);

  return {
    notifications,
    isRefreshing,
    fetchNextPage,
    refetch,
  };
}

export default function AlertPage() {
  const { notifications, isRefreshing, fetchNextPage, refetch } = useNotification();
  return (
    <>
      <View style={{ backgroundColor: 'white', flex: 1, paddingTop: 16 }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          data={notifications}
          renderItem={({ item }) => (
            <ArrowCard
              title={item.title}
              key={item.id}
              style={{ marginHorizontal: 20, marginVertical: 9 }}
              onPress={() => {
                switch (AlertType[item.type]) {
                  case AlertType.TEAM_PROFILE: {

                  }
                }
              }}
            >
              <Text>{item.body}</Text>
            </ArrowCard>
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
