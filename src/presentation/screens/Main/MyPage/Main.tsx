import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native'
import React, { useEffect } from 'react'
import {Icon, makeStyles, Text, useTheme} from '@rneui/themed'
import {MainBottomTabNavigationProps} from '@/presentation/navigation/types'
import CardWrapper from '@/presentation/components/CardWrapper'
import Gabojait from '@/presentation/components/icon/Gabojait'
import DivideWrapper from '@/presentation/components/DivideWrapper'
import {RatingBar} from '@/presentation/components/RatingBar'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getProfile } from '@/redux/reducers/profileGetReducer'
import { chagneToOfficialWord } from '@/util'
import ProfileViewDto from '@/model/Profile/ProfileViewDto'

const Main = ({navigation}: MainBottomTabNavigationProps<'MyPage'>) => {
  const {theme} = useTheme()
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const {data:profileData, loading:profileLoading, error:profileError} = useAppSelector(
    state => state.profileGetReducer.profileGetResult
  )

  useEffect(() => {
    dispatch(getProfile())
  },[])

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
        <View>
          <View style={{flexDirection:'row'}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: theme.fontWeight.bold,
                color: theme.colors.primary,
              }}>
              {profileData?.nickname}
            </Text>
            {profileData?.teamMemberStatus == 'LEADER' 
            ?<Text style={{fontSize: theme.fontSize.md, fontWeight:theme.fontWeight.medium, color:theme.colors.grey1, paddingTop:10, paddingStart:5}}>팀장님</Text>
            :<></>}
          </View>
          <Text style={{fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.medium, paddingTop: 5}}>
            {chagneToOfficialWord(profileData?.position)}
          </Text>
        </View>
        <CardWrapper
          style={[
            {borderRadius: 22, justifyContent: 'center', maxHeight: 45, paddingHorizontal: 22},
          ]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainNavigation', {screen: 'Setting'})}>
            <Gabojait name="setting" size={34} color="black" />
          </TouchableOpacity>
        </CardWrapper>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 20, marginTop: 20}}>
        <CardWrapper style={[{flex: 1, minHeight: 93, justifyContent: 'center', marginRight: 7}]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MainNavigation', {screen: 'BookMark'})}>
            <Icon type="ionicon" size={43} name="heart-circle-outline"/>
            <Text style={{textAlign: 'center'}}>찜</Text>
          </TouchableOpacity>
        </CardWrapper>
        <CardWrapper style={[{flex: 1, minHeight: 93, justifyContent: 'center', marginLeft: 7}]}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MainNavigation', {
                screen: 'Profile',
                params: {screen: 'View'},
              })
            }>
            <Gabojait style={{padding: 5}} name="person" size={34} color="black" />
            <Text style={{textAlign: 'center'}}>프로필</Text>
          </TouchableOpacity>
        </CardWrapper>
      </View>
      <View style={styles.divider}>
        {profileData?.teamMemberStatus == 'LEADER' 
        ?<LeaderComponent 
        onPressApply={() => navigation.navigate('MainNavigation',{screen:'ApplyStatus'})}
        onPressTeam={() => {}}
        onPressHistory={() => navigation.navigate('MainNavigation', {screen: 'TeamHistory'})}/>
        :<MemberComponent
        onPressApply={() => navigation.navigate('MainNavigation', {screen: 'OfferPage'})}
        onPressTeam={() => navigation.navigate('MainNavigation', {screen: 'TeamApplied'})}
        onPressHistory={() => navigation.navigate('MainNavigation', {screen: 'TeamHistory'})}
        />}
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: theme.fontWeight.bold,
          marginLeft: 24,
          paddingBottom: 3,
          marginTop: 20,
        }}>
        나의 리뷰
      </Text>
      {profileData?.reviews == null
      ?<MyReview data={profileData}/>
      :<NoReview/>}
    </ScrollView>
  )
}

interface ReviewItemProps {
  name: string
  score: number
  content: string
}
const ReviewItem = ({name, score, content}: ReviewItemProps) => {
  const {theme} = useTheme()
  return (
    <CardWrapper
      style={{
        minHeight: 180,
        maxWidth: 256,
        marginHorizontal: 10,
        padding: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: theme.colors.disabled,
      }}>
      <View>
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <Text
            style={{
              fontSize: theme.fontSize.sm,
              fontWeight: theme.fontWeight.bold,
              paddingRight: 5,
            }}>
            {name}
          </Text>
          <RatingBar ratingScore={score} size={theme.ratingBarSize.xs} />
        </View>
        <Text
          numberOfLines={5}
          ellipsizeMode="tail"
          style={{
            color: theme.colors.grey1,
            fontSize: theme.fontSize.xs,
            fontWeight: theme.fontWeight.light,
            lineHeight: 25,
          }}>
          {content}
        </Text>
      </View>
    </CardWrapper>
  )
}

interface Component {
  onPressApply: () => void
  onPressTeam: () => void
  onPressHistory: () => void
}
const MemberComponent = ({onPressApply, onPressTeam, onPressHistory}: Component) => {
  const styles = useStyles()

  return (
    <DivideWrapper style={{flex: 1, minHeight: 93, justifyContent: 'center'}}>
      <View>
        <TouchableOpacity onPress={() => onPressApply()}>
          <Icon type="ionicon" size={43} name="grid-outline" />
          <Text style={{textAlign: 'center', paddingTop:5}}>받은 제안</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPressTeam()}>
          <Icon type="ionicon" size={43} name="document-text-outline" />
          <Text style={{textAlign: 'center', paddingTop:5}}>지원한 팀</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPressHistory()}>
          <Gabojait style={{padding: 5}} name="people" size={34} color="black" />
          <Text style={{textAlign: 'center', paddingTop:5}}>팀 히스토리</Text>
        </TouchableOpacity>
      </View>
    </DivideWrapper>
  )
}

const LeaderComponent = ({onPressApply, onPressTeam, onPressHistory}: Component) => {
  const styles = useStyles()

  return (
    <DivideWrapper style={{flex: 1, minHeight: 93, justifyContent:'center'}}>
      <View>
        <TouchableOpacity onPress={() => onPressApply()}>
          <Icon type="ionicon" size={43} name="grid-outline"/>
          <Text style={{textAlign: 'center', paddingTop:5}}>지원 소식</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPressTeam()}>
          <Icon type="ionicon" size={43} name="document-text-outline" />
          <Text style={{textAlign: 'center', paddingTop:5}}>팀원관리</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPressHistory()}>
          <Gabojait style={{padding: 5}} name="people" size={34} color="black" />
          <Text style={{textAlign: 'center', paddingTop:5}}>팀 히스토리</Text>
        </TouchableOpacity>
      </View>
    </DivideWrapper>
  )
}

const MyReview = (data:ProfileViewDto) => {
  const {theme} = useTheme()

  return (
    <>
    <View style={{marginLeft: 20, flexDirection: 'row'}}>
        <RatingBar ratingScore={data?.rating} size={theme.ratingBarSize.md} />
        <Text style={{fontSize: 20, fontWeight: theme.fontWeight.bold, paddingLeft: 9}}>{data?.rating}</Text>
    </View>
    <View style={{paddingBottom: 70}}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data?.reviews}
        renderItem={({item}) => (
          <ReviewItem name={item.nickname} score={item.rating} content={item.content} />
        )}
      />
    </View>
  </>
  )
}

const NoReview = () => {
  const {theme} = useTheme()

  return (
      <Text style={{
        fontSize:theme.fontSize?.lg, 
        fontWeight:theme.fontWeight.medium, 
        color:theme.colors.grey2, 
        textAlign:'center',
        paddingVertical:130
        }}
      >
        아직 작성된 리뷰가 없어요!
      </Text>
  )
}

const useStyles = makeStyles(theme => ({
  scrollView: {
    paddingVertical: 20,
    backgroundColor: theme.colors.white,
  },
  divider: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
}))

export default Main
