import {Position} from '@/data/model/type/Position';
import {TeamMemberStatus} from '@/data/model/type/TeamMemberStatus';
import GroupListCard from '@/presentation/components/TeamBanner';
import PositionRecruiting from '@/presentation/model/PositionRecruitng';
import {MainStackScreenProps} from '@/presentation/navigation/types';
import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {PageRequest, useModelList} from "@/reactQuery/util/useModelList";
import {getOffersFromTeam} from "@/data/api/offer";

const QueryKey = {
    all: ['GetOffers'],
    filtered: (filter: PageRequest) => [...QueryKey.all, 'filtered', {...filter, pageFrom: undefined}]
}

const OfferPage = ({navigation}: MainStackScreenProps<'OfferPage'>) => {
        const arr: PositionRecruiting[] = [{position: Position.Designer, currentCnt: 0, recruitCnt: 0}];

        const [params, setParams] = useState({pageFrom: 0, pageSize: 20} as PageRequest)
        const {data, isLoading, error, fetchNextPage, refetch, isRefreshing} = useModelList({
            initialParam: {
                pageFrom: 0,
                pageSize: 20
            },
            fetcher: ({pageParam, queryKey}) => {
                console.log(pageParam, queryKey)
                return getOffersFromTeam({
                    ...(params as PageRequest),
                    pageFrom: pageParam
                })
            },
            key: QueryKey.filtered(params)
        })

        return (
            <View style={{backgroundColor: 'white', flex: 1, padding: 20}}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.toString()}
                    data={data?.pages?.map(page => page.data).flat()}
                    renderItem={({item}) => (
                        <TouchableOpacity>
                            <GroupListCard teamMembersCnt={arr} teamName={'가보자잇'}/>
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
    }
;

export default OfferPage;
