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
            <LoginInput state={'default'} />
            <LoginInput state={'success'} />
            <LoginInput state={'error'} />
            <LoginInput iconInput={true} state={'default'} />
            <LoginInput iconInput={true} state={'success'} />
            <LoginInput iconInput={true} state={'error'} />
            <LoginInput secureInput={true} state={'default'} />
            <LoginInput secureInput={true} state={'success'} />
            <LoginInput secureInput={true} state={'error'} />
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
