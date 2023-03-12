import CompletedTeamBanner from '@/presentation/components/CompletedTeamBanner'
import { MainStackScreenProps } from '@/presentation/navigation/types'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getTeamsToReview } from '@/redux/reducers/teamsToReviewGetReducer'
import React, { useEffect} from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'

const TeamHistory = ({navigation}:MainStackScreenProps<'TeamHistory'>) => {
    const test = [{
        backends: [{nickname: "류성룡",position: "backend",rating: 0,reviewCnt: 0,schemaVersion: "string",userId: "string"}],
        designers: [{nickname: "이하늬",position: "designer",rating: 0,reviewCnt: 0,schemaVersion: "string",userId: "string"}],
        frontends: [{nickname: "진선규",position: "frontend",rating: 0,reviewCnt: 0,schemaVersion: "string",userId: "string"}],
        projectManagers: [{nickname: "이동휘",position: "string",rating: 0,reviewCnt: 0,schemaVersion: "string",userId: "string"}],
        projectName: "치킨배달 앱",
        teamId: "string"
      }]
    const dispatch = useAppDispatch()
    const {data, loading, error} = useAppSelector(state => state.teamsToReviewGetReducer.teamsToReviewGetResult)

    useEffect(() => {
        dispatch( getTeamsToReview() )
    }, [])

    return(
        <View style={{backgroundColor:'white', flex:1}}>
            <FlatList
            showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.toString()}
                data={test}
                renderItem={({item}) => 
                    <TouchableOpacity onPress={() => navigation.navigate('TeamReview', {teamId: item.teamId})}>
                        <CompletedTeamBanner team={item} />
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

export default TeamHistory