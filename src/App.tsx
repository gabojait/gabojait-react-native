/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {Input, Button, ButtonProps, Theme, useTheme, Text, AirbnbRating, FAB} from '@rneui/themed'
import {createTheme, ThemeProvider} from '@rneui/themed'
import React, {type PropsWithChildren} from 'react'
import {SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

// ⚠️ 테마 생성 옵션을 변경하고 난 다음에는 앱을 꼭 리로드해주세요!
const theme = createTheme({
  lightColors: {
    primary: '#1CDF71',
    error: '#FC0101',
    warning: '#F06823',
    disabled: '#D9D9D9',
  },
  mode: 'light',
  components: {
    Button: {
      titleStyle: {
        fontFamily: 'Pretendard-SemiBold',
      },
    },
    Text: {
      style: {
        fontFamily: 'Pretendard-Medium',
      },
    },
  },
  rd1: 24,
  rd2: 10,
  rd3: 5,
})
const FilledButton = (
  props: JSX.IntrinsicAttributes &
    ButtonProps & {
      theme?: Theme | undefined
      children?: React.ReactNode
      rounded?: boolean
    },
) => (
  <Button
    {...props}
    buttonStyle={{
      borderRadius: 10,
    }}
    titleStyle={{
      color: 'black',
      marginVertical: 5,
    }}
    disabledTitleStyle={{
      color: 'black',
    }}
  />
)
const OutlinedButton = (
  props: JSX.IntrinsicAttributes &
    ButtonProps & {
      theme?: Theme | undefined
      children?: React.ReactNode
      radius?: number
      highlighted?: boolean
    },
) => {
  const {theme} = useTheme()
  return (
    <Button
      {...props}
      buttonStyle={[styles.outlinedButton]}
      radius={props.radius}
      type="outline"
      titleStyle={{
        color: props.highlighted ? theme.colors.primary : 'black',
        margin: 12,
      }}
      disabledTitleStyle={{
        color: props.highlighted ? theme.colors.disabled : 'black',
      }}
    />
  )
}
const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    margin: 20,
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeAreaView style={backgroundStyle}>
          <Text h3>Full Width Buttons</Text>
          <FilledButton title="시작하기" />
          <FilledButton title="시작하기" disabled />
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
            count={10}
            reviews={['최악이에요', '별로에요', '괜찮아요', '좋아요', '최고에요']}
          />
          <FAB />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

const styles = StyleSheet.create({
  wrapButtonConatiner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  outlinedButton: {
    borderWidth: 1,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    marginBottom: 10,
  },
})

export default App
