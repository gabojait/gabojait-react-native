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
import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {theme} from '@/theme'
import LoginInput from '@/presentation/components/LoginInput'
import ProfileCard from '@/presentation/components/ProfileCard'
import {FilledButton, OutlinedButton} from '@/presentation/components/Button'
import styles from './styles'
import BirthDropdown from '@/presentation/components/BirthDropdown'
import ProfileCard2 from './presentation/components/ProfileCard2'

const App = () => {
  const backgroundStyle = {
    flex: 1,
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={backgroundStyle}>
          <ScrollView
            style={{
              padding: 20,
            }}>
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
            <BirthDropdown />
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
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
