import GroupListCard from '@/presentation/components/TeamBanner';
import {MainStackScreenProps} from '@/presentation/navigation/types';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {useAppSelector} from "@/redux/hooks";
import TeamBriefDto from "@/data/model/Team/TeamBriefDto";

const TeamsApplied = ({navigation, route}: MainStackScreenProps<'TeamApplied'>) => {

    // Todo: API 붙이기

    const teams = [] as TeamBriefDto[]

    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.toString()}
                data={teams}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('GroupDetail', {teamId: item.teamId})}>
                        <GroupListCard teamMembersCnt={item.teamMemberCnts} teamName={item.projectName}/>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default TeamsApplied;
