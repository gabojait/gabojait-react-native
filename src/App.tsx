/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {AirbnbRating, FAB, Text, ThemeProvider} from '@rneui/themed'
import React from 'react'
import {Platform, SafeAreaView, ScrollView,View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {theme} from '@/theme'
import {IconInput} from '@/presentation/components/IconInput'
import { PasswordInput } from '@/presentation/components/PasswordInput'
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
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={backgroundStyle}>
          <ScrollView>
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
            {/* <Text h3>BasicInput</Text>
            <BasicInput />
            <BasicInput state='success'/>
            <BasicInput state='error'/> */}
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
