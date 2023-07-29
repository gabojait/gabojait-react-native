import CompletedTeamBanner from '@/presentation/components/CompletedTeamBanner'
import {MainStackScreenProps} from '@/presentation/navigation/types'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {getTeamToReview} from '@/redux/reducers/teamToReviewGetReducer'
import React, {useEffect} from 'react'
import {FlatList, TouchableOpacity, View} from 'react-native'

export default function TeamHistory({navigation, route}: MainStackScreenProps<'TeamHistory'>) {
    const dispatch = useAppDispatch()

    const {data, loading, error} = useAppSelector(
        state => state.profileReducer.userProfile,
    )


    return <>
        {
            !loading && !error && data && data.completedTeams &&
            (
                <View style={{backgroundColor: 'white', flex: 1}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.toString()}
                        data={data.completedTeams}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TeamReview', {teamId: item.teamId})}>
                                <CompletedTeamBanner team={item}/>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
    </>
}