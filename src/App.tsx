import { DevSettings, Platform, SafeAreaView } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { RootNavigation } from './presentation/navigation/RootNavigation';
import allReducers from '@/redux/reducers';
import ReduxThunk from 'redux-thunk';
import { ModalProvider } from './presentation/components/modal/context';
import { theme } from './presentation/theme';
import GeneralErrorBoundary from './presentation/components/errorComponent/ErrorBoundary';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from 'react-query';
import { createLogger } from 'redux-logger';
import './assets/locales/index';
import NetInfo from '@react-native-community/netinfo';
import CodePush, { CodePushOptions } from 'react-native-code-push';
import { OverlayProvider } from '@toss/use-overlay';
import messaging from '@react-native-firebase/messaging';
import {
  displayBackgroundNotification,
  displayForegroundNotification,
  setAndroidAlarmChannel,
  setAndroidForegroundService,
  setIosCategories,
} from '@/presentation/utils/FcmMessageUtils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});
const logger = createLogger();
const store = createStore(allReducers, applyMiddleware(ReduxThunk, logger));

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
  const [safeAreaBackgroundColor, setSafeAreaBackgroundColor] = useState('white');
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Safe Area Color (iOS Only)', () => {
        setSafeAreaBackgroundColor(prev => (prev === 'white' ? 'yellow' : 'white'));
      });
    }
    initializeMessage();
  }, []);

  function initializeMessage() {
    if (Platform.OS === 'ios') {
      setIosCategories();
    } else {
      setAndroidForegroundService();
      setAndroidAlarmChannel();
    }

    messaging().onMessage(async remoteMessage => {
      let id = 0;
      displayForegroundNotification(id.toString(), remoteMessage);
      id++;
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      let id = 0;
      displayBackgroundNotification(id.toString(), remoteMessage);
      id++;
    });
  }

  const backgroundStyle = {
    flex: 1,
    backgroundColor: __DEV__ ? safeAreaBackgroundColor : 'white',
  };

  const { reset } = useQueryErrorResetBoundary();
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GeneralErrorBoundary onReset={reset}>
          <QueryClientProvider client={queryClient}>
            <ModalProvider>
              <OverlayProvider>
                <SafeAreaView style={backgroundStyle}>
                  <RootNavigation />
                </SafeAreaView>
              </OverlayProvider>
            </ModalProvider>
          </QueryClientProvider>
        </GeneralErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default CodePush(codePushOptions)(App);
