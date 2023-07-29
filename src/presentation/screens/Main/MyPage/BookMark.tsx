import TeamBanner from '@/presentation/components/TeamBanner';
import {MainStackScreenProps} from '@/presentation/navigation/types';
import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import TeamBriefDto from '@/data/model/Team/TeamBriefDto';
import {PageRequest, useModelList} from "@/reactQuery/util/useModelList";
import {getFavoriteTeams} from "@/data/api/favorite";

const QueryKey = {
    all: ['GetTeamsOnBookMark'],
    filtered: (filter: PageRequest) => [...QueryKey.all, 'filtered', {...filter, pageFrom: undefined}]
}
const BookMark = ({navigation}: MainStackScreenProps<'BookMark'>) => {

    const [params, setParams] = useState({pageFrom: 0, pageSize: 20} as PageRequest)
    const {data, isLoading, error, fetchNextPage, refetch, isRefreshing} = useModelList({
        initialParam: {...params},
        key: QueryKey.filtered(params),
        fetcher: ({pageParam, queryKey: [_, __, params]}) => {
            return getFavoriteTeams({...(params as PageRequest), pageFrom: pageParam})
        }
    })
    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.toString()}
                data={data?.pages?.map(page => page.data).flat()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('GroupDetail', {teamId: item.teamId})}
                    >
                        <TeamBanner teamMembersCnt={item.teamMemberCnts} teamName={item.projectName}/>
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

export default BookMark;
