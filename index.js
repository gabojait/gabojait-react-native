/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App, {HeadlessCheck} from './src/App';
import {name as appName} from './app.json';
import messaging from "@react-native-firebase/messaging";
import {createTable, getDBConnection, getNotifications, saveNotification} from "@/data/localdb";

console.log("messaging registered: ", messaging().isDeviceRegisteredForRemoteMessages);

messaging()
    .subscribeToTopic('com.gabojait.app')
    .then(() => console.log('Subscribed to topic!'));
// Handle background messages using setBackgroundMessageHandler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    const db = await getDBConnection();
    await createTable(db);
    await saveNotification(db, {
        id: remoteMessage.messageId,
        title: remoteMessage.data.title,
        body: remoteMessage.data.body,
        time: remoteMessage.data.time
    });
    console.log(await getNotifications(db));

    await db.close();

});
AppRegistry.registerComponent(appName, () => HeadlessCheck);
