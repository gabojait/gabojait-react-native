import {GetProfileProps, getUserSeekingTeam} from '@/data/api/profile'
import UserProfileBriefDto from '@/data/model/User/UserProfileBriefDto'
import CardWrapper from '@/presentation/components/CardWrapper'
import Gabojait from '@/presentation/components/icon/Gabojait'
import {RatingBar} from '@/presentation/components/RatingBar'
import {useModelList} from '@/reactQuery/useModelList'
import {makeStyles, Text, useTheme} from '@rneui/themed'
import React from 'react'
import {FlatList, TouchableOpacity, View} from 'react-native'

const PMList = () => {
  const {theme} = useTheme()
  const styles = useStyles()
  const {data, isLoading, error, fetchNextPage, refetch, param, isRefreshing} = useModelList<
    GetProfileProps,
    UserProfileBriefDto
  >({
    initialParam: {pageFrom: 0, pageSize: 20, position: 'manager', profileOrder: 'active'},
    key: 'managerList',
    fetcher: async ({pageParam}) => {
      return await getUserSeekingTeam(pageParam!)
    },
  })

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
        keyExtractor={item => item.userId.toString()}
        data={data?.pages.flat()}
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
                <Text style={styles.position}>PM</Text>
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
        onRefresh={refetch}
        onEndReached={() => {
          fetchNextPage()
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

export default PMList
