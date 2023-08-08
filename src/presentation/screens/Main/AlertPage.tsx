import {ArrowCard} from "@/presentation/components/BaseCard";
import {getDBConnection, getNotifications, Notification} from "@/data/localdb";
import {Text} from "@rneui/themed";
import {useEffect, useState} from "react";
import React from 'react'
import {FlatList, TouchableOpacity, View} from "react-native";
import TeamBanner from "@/presentation/components/TeamBanner";

export function useNotification() {
    const [notifications, setNotifications] = useState([] as Notification[])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [refetch, setRefetch] = useState<((page: number) => Promise<void>) | null>(null)
    const [page, setPage] = useState(0)

    const fetchNextPage = () => {
        setPage(prev => prev + 1)
        console.log('refetch: ', refetch)
        refetch?.(page)
    }
    useEffect(() => {
        let isMounted = true;

        async function fetchDataAndOpenDB(page: number) {
            const db = await getDBConnection();

            if (db && isMounted) {
                // Component is still mounted, safe to set the DB connection to state or perform other operations
                setIsRefreshing(true)
                setNotifications(await getNotifications(db, page))
                setIsRefreshing(false)
            } else {
                db?.close()
            }
        }

        setRefetch(() => fetchDataAndOpenDB)
        fetchDataAndOpenDB(0);

        return () => {
            isMounted = false;
            // Close database connection if needed
        };
    }, []);

    return {
        notifications,
        isRefreshing,
        fetchNextPage,
        refetch
    }
}

export default function AlertPage() {

    const {notifications, isRefreshing, fetchNextPage, refetch} = useNotification()
    return <>
        <View style={{backgroundColor: 'white', flex: 1}}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                data={notifications}
                renderItem={({item}) => (
                    <ArrowCard title={item.title} key={item.id}>
                        <Text>{item.body}</Text>
                    </ArrowCard>
                )}
                refreshing={isRefreshing}
                onEndReached={() => {
                    fetchNextPage();
                }}
                onRefresh={() => {
                    refetch?.(0)
                }}
                onEndReachedThreshold={0.6}
            />
        </View>
    </>
}