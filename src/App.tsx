/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {ThemeProvider} from '@rneui/themed'
import React from 'react'
import {SafeAreaView, ScrollView, useColorScheme, View} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {theme} from '@/theme'
import MyPageScreen from '@/presentation/screens/MyPageScreen'

const App = () => {
  const backgroundStyle = {
    flex: 1,
  }

  return (
    // <ThemeProvider theme={theme}>
    //   <SafeAreaProvider>
    //     <SafeAreaView style={backgroundStyle}>
    //       {/* <ScrollView
    //         style={{
    //           padding: 20,
    //         }}>
    //       </ScrollView> */}
    //     </SafeAreaView>
    //   </SafeAreaProvider>
    // </ThemeProvider>
    <MyPageScreen />
  )
}

export default App
