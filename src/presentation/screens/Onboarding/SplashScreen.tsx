import {RootStackScreenProps} from '@/presentation/navigation/types'
import {useAppDispatch, useAppSelector} from '@/redux/hooks'
import {getUser} from '@/redux/reducers/loginReducer'
import React, {useEffect} from 'react'
import {View} from 'react-native'
import Splash from 'react-native-splash-screen'

const SplashScreen = ({navigation}: RootStackScreenProps<'SplashScreen'>) => {
  const handleRefresh = () => {
    console.log(user)
    if (!user.loading) {
      if (user.data && !user.error) {
        console.log('토큰 리프레시 성공. ')
        navigation.navigate('MainBottomTabNavigation', {
          screen: 'Home',
        })
      }
      if (!user.data && user.error) {
        console.log('토큰 리프레시 실패. 로그인으로 이동.')
        navigation.navigate('OnboardingNavigation', {screen: 'Login'})
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
