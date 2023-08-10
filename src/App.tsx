import { AppRegistry, SafeAreaView } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { RootNavigation } from './presentation/navigation/RootNavigation';
import allReducers from '@/redux/reducers';
import ReduxThunk from 'redux-thunk';
import { ModalProvider } from './presentation/components/modal/context';
import { theme } from './presentation/theme';
import GeneralErrorBoundary from './presentation/components/errorComponent/ErrorBoundary';
import { Fallback500, Fallback503 } from './presentation/components/errorComponent/Fallback';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from 'react-query';
import { createLogger } from 'redux-logger';
import './assets/locales/index';

const queryClient = new QueryClient();
const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(ReduxThunk, logger));

import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from 'react-query';
import messaging, { firebase } from '@react-native-firebase/messaging';

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

// Check if app was launched in the background and conditionally render null if so
export function HeadlessCheck({ isHeadless }: { isHeadless: boolean }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  // Render the app component on foreground launch
  return <App />;
}

const App = () => {
  const backgroundStyle = {
    flex: 1,
  };

  // const modalRef = useRef<CustomModalRef>()
  const { reset } = useQueryErrorResetBoundary();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GeneralErrorBoundary onReset={reset}>
          <QueryClientProvider client={queryClient}>
            <ModalProvider>
              <SafeAreaView style={backgroundStyle}>
                <RootNavigation />
              </SafeAreaView>
            </ModalProvider>
          </QueryClientProvider>
        </GeneralErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
