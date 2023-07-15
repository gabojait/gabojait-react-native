import React, {useRef} from 'react'
import {SafeAreaView} from 'react-native'
import {ThemeProvider} from '@rneui/themed'
import {RootNavigation} from './presentation/navigation/RootNavigation'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import allReducers from '@/redux/reducers'
import ReduxThunk from 'redux-thunk'
import CustomModal, {CustomModalRef} from './presentation/components/modal/Modal'
import {ModalProvider} from './presentation/components/modal/context'
import {QueryClient, QueryClientProvider, useQuery} from 'react-query'
import {theme} from './presentation/theme'
import ErrorBoundary from './presentation/components/errorComponent/ErrorBoundary'
import {Fallback500, Fallback503} from './presentation/components/errorComponent/GeneralFallback'

const queryClient = new QueryClient()

const App = () => {
  const backgroundStyle = {
    flex: 1,
  }
  const store = createStore(allReducers, applyMiddleware(ReduxThunk))
  // const modalRef = useRef<CustomModalRef>()

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary fallback500={Fallback500()} fallback503={Fallback503()}>
          <QueryClientProvider client={queryClient}>
            <ModalProvider>
              <SafeAreaView style={backgroundStyle}>
                <RootNavigation />
              </SafeAreaView>
            </ModalProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  )
}

export default App
