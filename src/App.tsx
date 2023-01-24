import React from 'react'
import {SafeAreaView} from 'react-native'
import {ThemeProvider} from '@rneui/themed'
import {theme} from '@/theme'
import {RootNavigation} from './presentation/navigation/RootNavigation'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import allReducers from '@/redux/reducers'
import ReduxThunk from 'redux-thunk'

const App = () => {
  const backgroundStyle = {
    flex: 1,
  }
  const store = createStore(allReducers, applyMiddleware(ReduxThunk))

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaView style={backgroundStyle}>
          <RootNavigation />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  )
}

export default App
