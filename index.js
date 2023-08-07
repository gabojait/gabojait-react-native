/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App, {HeadlessCheck} from './src/App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";

console.log("messaging registered: ", messaging().isDeviceRegisteredForRemoteMessages);

messaging()
    .subscribeToTopic('com.gabojait.app')
    .then(() => console.log('Subscribed to topic!'));
// Handle background messages using setBackgroundMessageHandler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => HeadlessCheck);
