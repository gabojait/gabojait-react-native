import { SafeAreaView } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { RootNavigation } from './presentation/navigation/RootNavigation';
import allReducers from '@/redux/reducers';
import ReduxThunk from 'redux-thunk';
import { ModalProvider } from './presentation/components/modal/context';
import { theme } from './presentation/theme';
import ErrorBoundary from './presentation/components/errorComponent/ErrorBoundary';
import { Fallback500, Fallback503 } from './presentation/components/errorComponent/GeneralFallback';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createLogger } from 'redux-logger';
import './assets/locales/index';

const queryClient = new QueryClient();
const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(ReduxThunk, logger));

import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from 'react-query'

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected)
  })
})

if (__DEV__) {
  import('react-query-native-devtools').then(({ addPlugin }) => {
    addPlugin({ queryClient });
  });
}

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };
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
  );
};

export default App;
