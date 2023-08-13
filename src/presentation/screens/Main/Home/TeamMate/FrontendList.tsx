import CardWrapper from '@/presentation/components/CardWrapper';
import Gabojait from '@/presentation/components/icon/Gabojait';
import {RatingBar} from '@/presentation/components/RatingBar';
import {makeStyles, useTheme} from '@rneui/themed';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import {useModelList} from '@/reactQuery/util/useModelList';
import {GetProfileProps, getUserSeekingTeam} from '@/data/api/profile';
import {Position} from '@/data/model/type/Position';
import {profileKeys} from '@/reactQuery/key/ProfileKeys';
import {PositionTabParamListProps} from '@/presentation/navigation/types';
import {UserCard} from '@/presentation/components/UserCard';

const FrontendList = ({navigation, route}: PositionTabParamListProps<'Frontend'>) => {
    const {theme} = useTheme();
    const {data, isLoading, error, fetchNextPage, refetch, isRefreshing} = useModelList<
        GetProfileProps,
        UserProfileOfferDto
    >({
        initialParam: {
            pageFrom: 0,
            pageSize: 20,
            position: Position.Frontend,
            profileOrder: 'ACTIVE',
        },
        idName: "userId",
        key: profileKeys.frontendSeekingTeam,
        fetcher: async ({pageParam, queryKey: [_, params]}) => {
            return await getUserSeekingTeam({...(params as GetProfileProps), pageFrom: pageParam});
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
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.getParent()?.navigate('ProfilePreview', {userId: item.userId});
                        }}
                    >
                        <UserCard item={item} position={Position.Frontend}/>
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

export default FrontendList;
