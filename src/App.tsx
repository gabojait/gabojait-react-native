import React, {useRef} from 'react'
import {SafeAreaView} from 'react-native'
import {ThemeProvider} from '@rneui/themed'
import {theme} from '@/theme'
import {RootNavigation} from './presentation/navigation/RootNavigation'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import allReducers from '@/redux/reducers'
import ReduxThunk from 'redux-thunk'
import CustomModal, {CustomModalRef} from './presentation/components/modal/Modal'
import { ModalProvider } from './presentation/components/modal/context'
import { CookiesProvider } from 'react-cookie'

const App = () => {
  const backgroundStyle = {
    flex: 1,
  }
  const store = createStore(allReducers, applyMiddleware(ReduxThunk))
  // const modalRef = useRef<CustomModalRef>()

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <ModalProvider>
            <SafeAreaView style={backgroundStyle}>
              <RootNavigation />
            </SafeAreaView>
          </ModalProvider>
        </CookiesProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
