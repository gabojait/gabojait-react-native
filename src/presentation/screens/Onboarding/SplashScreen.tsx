import {RootStackParamList} from '@/presentation/navigation/types'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {getUser, loginReducer} from '@/redux/reducers/loginReducer'
import globalStyles from '@/styles'
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import {View} from 'react-native'
import Splash from 'react-native-splash-screen'

const SplashScreen = ({navigation}: StackScreenProps<RootStackParamList, 'SplashScreen'>) => {
  const handleRefresh = () => {
    console.log(user)
    if (!user.loading) {
      if (user.data && !user.error) {
        console.log("토큰 리프레시 성공. ")
        navigation.navigate('MainNavigation')
      }
      if (!user.data && user.error) {
        console.log("토큰 리프레시 실패. 로그인으로 이동.")
        navigation.navigate('OnboardingNavigation')
      }
      Splash.hide()
    }
  }

  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.loginReducer.user)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  useEffect(handleRefresh, [user])
  return <View style={[{flex: 1, backgroundColor: ''}]}></View>
}
export default SplashScreen
