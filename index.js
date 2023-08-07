/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import { name as appName } from './app.json';

function getMessageFromBackground() {
  const messageNewArrived = messaging().setBackgroundMessageHandler(async remoteMessage => {
    return remoteMessage;
  });
  console.log(`MessageFromBackground!!!!!!!!!!!!------>${messageNewArrived}`);
}

getMessageFromBackground();

AppRegistry.registerComponent(appName, () => App);
