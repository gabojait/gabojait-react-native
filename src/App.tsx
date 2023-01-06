import React from 'react'

import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {AirbnbRating, FAB, Text, ThemeProvider} from '@rneui/themed'

import {NavigationContainer, useNavigation} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
//import 'react-native-gesture-handler'

import {theme} from '@/theme'
import {FilledButton, OutlinedButton} from '@/presentation/components/Button'
import styles from './styles'
import {createStackNavigator} from '@react-navigation/stack'
import Main from '@/presentation/Main'
import {ButtonProps} from '@rneui/themed'
import BirthDropdown from '@/presentation/components/BirthDropdown'
import ProfileCard2 from '@/presentation/components/ProfileCard2'
import { IconInput } from '@/presentation/components/IconInput'
import { PasswordInput } from '@/presentation/components/PasswordInput'

const DesignSystem = () => {
  return (
    <ScrollView
      style={{
        padding: 20,
      }}>
      {/* <Text h3>Wraped Buttons (with flex)</Text>
      <View style={styles.wrapButtonConatiner}>
        <FilledButton title="시작하기" />
        <FilledButton title="시작하기" disabled />
      </View>
      <Text h3>Outlined Buttons (Round)</Text>
      <OutlinedButton title="삭제하기" disabled />
      <OutlinedButton title="종료하기" />
      <OutlinedButton title="해산하기" disabled />
      <Text h3>Outlined Buttons</Text>
      <View style={styles.wrapButtonConatiner}>
        <OutlinedButton title="중복확인" />
        <OutlinedButton title="확인완료" disabled />
      </View>
      <AirbnbRating
        count={5}
        reviews={['최악이에요', '별로에요', '괜찮아요', '좋아요', '최고에요']}
      />
      <FAB /> */}
      <Text h3>MenuCard - divide</Text>
      <Text h3>Birth Dropdown</Text>
      <BirthDropdown />
      {InputDesignSystem()}
      <Text h3>ProfileCard</Text>
      <ProfileCard2
        height={5}
        title="자기소개"
        placeholderText="관심있는 기술분야와 경험을 작성해보세요!"
        state="default"
        nextIcon={true}
      />
      <ProfileCard2
        height={5}
        title="자기소개"
        placeholderText="관심있는 기술분야와 경험을 작성해보세요!"
        state="success"
        nextIcon={true}
      />
      <ProfileCard2
        height={5}
        title="자기소개"
        placeholderText="관심있는 기술분야와 경험을 작성해보세요!"
        state="error"
        nextIcon={true}
      />
    </ScrollView>
  )
}

const Buttons = () => {
  return (
    <ScrollView
      style={{
        padding: 20,
      }}>
      <Text>Shrink to text</Text>
      <View style={styles.wrapButtonConatiner}>
        <FilledButton title="Large" size="lg" />
        <FilledButton title="Medium" />
        <FilledButton title="Small" size="sm" />
      </View>
      <View style={styles.wrapButtonConatiner}>
        <OutlinedButton title="Large" size="lg" />
        <OutlinedButton title="Medium" />
        <OutlinedButton title="Small" size="sm" />
      </View>
      <Text>Expand to parent</Text>
      <FilledButton title="Large" size="lg" />
      <FilledButton title="Medium" />
      <FilledButton title="Small" size="sm" />
      <OutlinedButton title="Large" size="lg" />
      <OutlinedButton title="Medium" />
      <OutlinedButton title="Small" size="sm" />
    </ScrollView>
  )
}

const InputDesignSystem = () => (
  <ScrollView>
    <Text h3>IconInput</Text>
            <Text h4>아이디</Text>
            <IconInput inputType='id' placeholder='5~15자 영문, 숫자 조합'/>
            <Text h4>실명</Text>
            <IconInput inputType='realname'placeholder='2~5자'/>
            <Text h4>별명</Text>
            <IconInput inputType='nickname' placeholder='2~8자'/>
            <Text h4>이메일</Text>
            <IconInput inputType='email' placeholder='ex) gabojait@naver.com'/>
            <Text h3>PasswordInput</Text>
            <Text h4>비밀번호</Text>
            <PasswordInput inputType='password' placeholder='영문, 숫자 조합 10~30자'/>
            <Text h4>비밀번호 확인</Text>
            <PasswordInput inputType='spellingCheck'/>
  </ScrollView>
)

const App = () => {
  const backgroundStyle = {
    flex: 1,
  }
  const RootStack = createStackNavigator()
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={backgroundStyle}>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Main">
            <RootStack.Group screenOptions={{headerShown: false}}>
              <RootStack.Screen name="Onboarding" component={Buttons} />
              <RootStack.Screen name="Main" component={Main} />
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeProvider>
  )
}

export default App
