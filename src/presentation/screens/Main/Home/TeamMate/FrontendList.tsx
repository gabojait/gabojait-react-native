import CardWrapper from '@/presentation/components/CardWrapper'
import Gabojait from '@/presentation/components/icon/Gabojait'
import {RatingBar} from '@/presentation/components/RatingBar'
import {makeStyles, useTheme} from '@rneui/themed'
import React, {useEffect, useState} from 'react'
import {FlatList, Text, TouchableOpacity, View} from 'react-native'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import UserProfileBriefDto from '@/data/model/User/UserProfileBriefDto'
import {findIndividuals} from '@/redux/reducers/individualsFindReducer'
import {FRONTED} from '@/presentation/util'

const FrontendList = () => {
  const {theme} = useTheme()
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const {data, loading, error} = useAppSelector(
    state => state.individualsFindReducer.individualsFindResult,
  )
  const [contentData, setContentData] = useState<UserProfileBriefDto[]>()
  const [individualsFindState, setIndividualsFindState] = useState({pageFrom: 0, pageNum: 20})
  const [isRefreshing, setIsRefreshing] = useState(false)

  const requestMoreTeam = () => {
    if (data != null && data.length >= individualsFindState.pageNum) {
      dispatch(
        findIndividuals(individualsFindState.pageFrom, individualsFindState.pageNum, FRONTED),
      )
      setIndividualsFindState(prevState => ({
        ...prevState,
        pageFrom: individualsFindState.pageFrom + 1,
      }))
    }
  }

  const refreshMoreTeam = () => {
    setContentData([])
    requestMoreTeam()
    setIsRefreshing(false)
  }

  useEffect(() => {
    console.log(`data 변경 감지`)
    if (!loading && contentData != null && data != null) {
      setContentData([...contentData, ...data])
      console.log(`data: ${data}`)
      console.log(`contentData: ${contentData}`)
    }
  }, [data, loading, error])

  useEffect(() => {
    console.log(`첫 렌더링`)
    dispatch(findIndividuals(individualsFindState.pageFrom, individualsFindState.pageNum, FRONTED))
    setIndividualsFindState(prevState => ({
      ...prevState,
      pageFrom: individualsFindState.pageFrom + 1,
    }))
    if (!loading && data != null) {
      setContentData(data)
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingVertical: 15,
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.userId}
        data={contentData}
        renderItem={({item}) => (
          <CardWrapper
            style={{
              marginVertical: 5,
              marginHorizontal: 20,
              borderWidth: 1,
              borderColor: theme.colors.disabled,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: 32,
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                alignContent: 'center',
              }}>
              <View>
                <Text style={styles.name}>{item.nickname}</Text>
                <Text style={styles.position}>프론트 개발자</Text>
                <View style={{flexDirection: 'row', paddingBottom: 10}}>
                  <RatingBar ratingScore={item.rating} />
                  <Text style={styles.score}>{item.rating}</Text>
                </View>
              </View>
              <TouchableOpacity style={{justifyContent: 'center'}}>
                <Gabojait name="arrow-next" size={28} color={theme.colors.disabled} />
              </TouchableOpacity>
            </View>
          </CardWrapper>
        )}
        refreshing={isRefreshing}
        onRefresh={refreshMoreTeam}
        onEndReached={() => {
          requestMoreTeam()
        }}
        onEndReachedThreshold={0.6}
      />
    </View>
  )
}

const useStyles = makeStyles(theme => ({
  name: {
    fontSize: 18,
    fontWeight: theme.fontWeight?.semibold,
    color: 'black',
  },
  position: {
    fontSize: 12,
    fontWeight: theme.fontWeight?.light,
    color: 'black',
    paddingBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: theme.fontWeight?.bold,
    color: 'black',
    paddingLeft: 10,
  },
}))

export default FrontendList
