import React, {useRef} from 'react'
import {SafeAreaView} from 'react-native'
import {ThemeProvider} from '@rneui/themed'
import {theme} from '@/theme'
import {RootNavigation} from './navigation/RootNavigation'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import allReducers from '@/redux/reducers'
import ReduxThunk from 'redux-thunk'
import CustomModal, {CustomModalRef} from './components/modal/Modal'
import {ModalProvider} from './components/modal/context'
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'

const queryClient = new QueryClient()

const App = () => {
  const backgroundStyle = {
    flex: 1,
  }
  const store = createStore(allReducers, applyMiddleware(ReduxThunk))
  // const modalRef = useRef<CustomModalRef>()

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <SafeAreaView style={backgroundStyle}>
              <RootNavigation />
            </SafeAreaView>
          </ModalProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
