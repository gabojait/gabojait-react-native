import {GetProfileProps, getUserSeekingTeam} from '@/data/api/profile';
import UserProfileOfferDto from '@/data/model/User/UserProfileBriefDto';
import CardWrapper from '@/presentation/components/CardWrapper';
import Gabojait from '@/presentation/components/icon/Gabojait';
import {RatingBar} from '@/presentation/components/RatingBar';
import {PageModel, useModelList} from '@/reactQuery/util/useModelList';
import {makeStyles, Text, useTheme} from '@rneui/themed';
import {PositionTabParamListProps} from '@/presentation/navigation/types';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Position} from '@/data/model/type/Position';
import {profileKeys} from '@/reactQuery/key/ProfileKeys';
import {UserCard} from '@/presentation/components/UserCard';

const QueryKey = {
    all: 'backendList',
    filtered: (filter: GetProfileProps) => [...QueryKey.all, 'filtered', filter],
};

const BackendList = ({navigation, route}: PositionTabParamListProps<'Backend'>) => {
    const {theme} = useTheme();
    const initialParam: GetProfileProps = {
        pageFrom: 0,
        pageSize: 20,
        position: Position.Backend,
        profileOrder: 'ACTIVE',
    };
    const {data, isLoading, error, fetchNextPage, refetch, isRefreshing} = useModelList<
        GetProfileProps,
        UserProfileOfferDto
    >({
        initialParam,
        idName: "userId",
        key: profileKeys.backendSeekingTeam,
        fetcher: async ({pageParam, queryKey: [_, param]}) => {
            return await getUserSeekingTeam({...(param as GetProfileProps), pageFrom: pageParam});
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
                        <UserCard item={item} position={Position.Backend}/>
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

export default BackendList;
