import React from 'react'
import {Platform, SafeAreaView, ScrollView,View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {AirbnbRating, FAB, Text, ThemeProvider} from '@rneui/themed'

import {NavigationContainer, useNavigation} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'
import 'react-native-gesture-handler'

import {theme} from '@/theme'
import LoginInput from '@/presentation/components/LoginInput'
import {FilledButton, OutlinedButton} from '@/presentation/components/Button'
import styles from './styles'
import BirthDropdown2 from '@/presentation/components/BirthDropdown'
import ProfileCard2 from './presentation/components/ProfileCard2'
import MenuCard from '@/presentation/components/ MenuCard'
import temporaryStyles from '@/temporaryStyle'
import DivideWrapper from '@/presentation/components/DivideWrapper'
import textStyles from './presentation/res/styles/textStyles'
import colors from '@/presentation/res/styles/color'

const App = () => {
  const backgroundStyle = {
    flex: 1,
  }
  const RootStack = createStackNavigator()
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={backgroundStyle}>
          <ScrollView>
                  <NavigationContainer>
          <RootStack.Navigator initialRouteName="Main">
            <RootStack.Group screenOptions={{headerShown: false}}>
              <RootStack.Screen name="Onboarding" component={Buttons} />
              <RootStack.Screen name="Main" component={Main} />
            </RootStack.Group>
          </RootStack.Navigator>
        </NavigationContainer>
            <Text h3>Wraped Buttons (with flex)</Text>
            <View style={styles.wrapButtonConatiner}>
              <FilledButton title="시작하기" />
              <FilledButton title="시작하기" disabled />
            </View>
            <Text h3>Outlined Buttons (Round)</Text>
            <OutlinedButton title="삭제하기" disabled radius={theme.rd1} />
            <OutlinedButton title="종료하기" radius={theme.rd1} />
            <OutlinedButton title="해산하기" disabled radius={theme.rd1} />
            <Text h3>Outlined Buttons</Text>
            <View style={styles.wrapButtonConatiner}>
              <OutlinedButton title="중복확인" radius={theme.rd3} highlighted />
              <OutlinedButton title="확인완료" radius={theme.rd3} highlighted disabled />
            </View>
            <AirbnbRating
              count={5}
              reviews={['최악이에요', '별로에요', '괜찮아요', '좋아요', '최고에요']}
            />
            <FAB />
            <Text h3>Birth Dropdown</Text>
            <BirthDropdown2 />
            <Text h3>LoginInput</Text>
            <LoginInput state={'default'} />
            <LoginInput state={'success'} />
            <LoginInput state={'error'} />
            <LoginInput iconInput={true} state={'default'} />
            <LoginInput iconInput={true} state={'success'} />
            <LoginInput iconInput={true} state={'error'} />
            <LoginInput secureInput={true} state={'default'} />
            <LoginInput secureInput={true} state={'success'} />
            <LoginInput secureInput={true} state={'error'} />
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
            <View style={temporaryStyles.firstRow}>
              <MenuCard
                title="찜"
                iconName="heart-circle-outline"
                style={{backgroundColor:colors.white}}/>
              <MenuCard
                title="프로필"
                iconName="person-circle-outline"
                style={{backgroundColor:colors.white}}/>
            </View>
            <DivideWrapper>
              <MenuCard
                title="지원소식"
                iconName="apps"/>
              <MenuCard
                title="내가 쓴 글 보기"
                iconName="albums"/>
              <MenuCard
                title='팀 히스토리'
                iconName="people"/>
            </DivideWrapper>
            <DivideWrapper style={{backgroundColor:colors.lightGrey}}>
              <View style={temporaryStyles.container}>
                <Text style={[textStyles.size6, textStyles.weight4]}>팀 매칭</Text>
                <Text style={[textStyles.size3, textStyles.weight2]}>3회</Text>
              </View>
              <View style={temporaryStyles.container}>
                <Text style={[textStyles.size6, textStyles.weight4]}>리뷰</Text>
                <Text style={[textStyles.size3, textStyles.weight2]}>3.5</Text>
              </View>
              <View style={temporaryStyles.container}>
                <Text style={[textStyles.size6, textStyles.weight4]}>총 경력</Text>
                <Text style={[textStyles.size3, textStyles.weight2]}>2년</Text>
              </View>
            </DivideWrapper>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}


export default App
