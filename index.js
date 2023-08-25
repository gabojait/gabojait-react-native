/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { HeadlessCheck } from '@/App';
import { name as appName } from './app.json';
import React from 'react';
import messaging from '@react-native-firebase/messaging';

import { createTable, getDBConnection, getNotifications, saveNotification } from '@/data/localdb';

import codePush from 'react-native-code-push';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const db = await getDBConnection();
  await createTable(db);
  await saveNotification(db, {
    id: remoteMessage.messageId,
    title: remoteMessage.data.title,
    body: remoteMessage.data.body,
    time: remoteMessage.data.time,
  });
  await db.close();
});
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };
AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(HeadlessCheck));
