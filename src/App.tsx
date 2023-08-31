import { SafeAreaView } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { RootNavigation } from './presentation/navigation/RootNavigation';
import allReducers from '@/redux/reducers';
import ReduxThunk from 'redux-thunk';
import { ModalProvider } from './presentation/components/modal/context';
import { theme } from './presentation/theme';
import GeneralErrorBoundary from './presentation/components/errorComponent/ErrorBoundary';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from 'react-query';
import { createLogger } from 'redux-logger';
import './assets/locales/index';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(ReduxThunk, logger));

import NetInfo from '@react-native-community/netinfo';
import { onlineManager } from 'react-query';
import CodePush, { CodePushOptions, DownloadProgress, LocalPackage } from 'react-native-code-push';
import { SafeAreaProvider } from 'react-native-safe-area-context';

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
};

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
    backgroundColor: 'yellow',
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

export default CodePush(codePushOptions)(App);
