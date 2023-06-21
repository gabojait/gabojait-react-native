import FloatingButton from '@/presentation/components/FloatingButton'
import {useTheme} from '@rneui/themed'
import React, {useEffect, useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import TeamBanner from '@/presentation/components/TeamBanner'
import {ModalContext} from '@/presentation/components/modal/context'
import {BoardStackParamListProps} from '@/presentation/navigation/types'
import {useAppDispatch} from '@/redux/hooks'
import {getTeam} from '@/redux/reducers/teamGetReducer'
import {getRecruiting, GetRecruitingProps} from '@/api/team'
import {UseInfiniteQueryResult, UseQueryResult, useInfiniteQuery, useQuery} from 'react-query'
import TeamBriefResponseDto from '@/model/Team/TeamBriefResponseDto'
import TeamBriefDto from '@/model/Team/TeamBriefDto'

const GroupList = ({navigation}: BoardStackParamListProps<'GroupList'>) => {
  const {theme} = useTheme()
  const modal = React.useContext(ModalContext)
  const dispatch = useAppDispatch()
  const [teamGetState, setTeamGetState] = useState<GetRecruitingProps>({
    pageFrom: 0,
    pageSize: 20,
    position: 'none',
    teamOrder: 'created',
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    refetch,
  }: UseInfiniteQueryResult<TeamBriefResponseDto[], Error> = useInfiniteQuery(
    [
      'recruiting',
      teamGetState.pageFrom,
      teamGetState.pageSize,
      teamGetState.position,
      teamGetState.teamOrder,
    ],
    async ({pageParam = 0}) => {
      // setTeamGetState(prevState => ({...prevState, pageFrom: pageParam}))
      const res = (await getRecruiting(teamGetState));
      setIsRefreshing(false)
      console.log(res);
      return res ?? []
    },
    {
      staleTime: 200000,
      getNextPageParam: (lastPage: TeamBriefResponseDto[]) => {
        if (lastPage.length >= teamGetState.pageSize) {
          return teamGetState.pageFrom + 1
        } else {
          return undefined
        }
      },
    },
  )

  useEffect(() => {
    console.log('useEffect 초기 렌더링 실행!')
    // dispatch(getTeam(teamGetState.pageFrom, teamGetState.pageSize))
    // setTeamGetState(prevState => ({...prevState, pageFrom: teamGetState.pageFrom + 1}))
    // isInitializable(loading, data) ? setContentData(data) : {}
  }, [])


  function handleRefresh() {
    setIsRefreshing(true)
    refetch()
  }



  /** 조건부 렌더링 구문은 항상 모든 훅의 아래에 배치해주세요!  */
  if (isLoading && !data) {
    return <Text>로딩 중</Text>
  }

  if (error) {
    return <Text>에러 발생</Text>
  }

  if (!data) {
    return null
  }



  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        position: 'relative',
      }}>
      {data && (
        <FlatList
          keyExtractor={item => item.teamId}
          data={data?.pages.flat()}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MainNavigation', {
                  screen: 'GroupDetail',
                  params: {teamId: item.teamId},
                })
              }>
              <TeamBanner team={item} />
            </TouchableOpacity>
          )}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={() => {
            fetchNextPage()
          }}
          onEndReachedThreshold={0.6}
        />
      )}

      <View
        style={{
          position: 'absolute',
          flex: 1,
          flexDirection: 'column-reverse',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          width: '95%',
          backgroundColor: theme.colors.disabled,
        }}>
        <FloatingButton
          title="팀 생성"
          onPress={() => navigation.navigate('MainNavigation', {screen: 'GroupEditor'})}
        />
      </View>
    </View>
  )
}

export default GroupList
