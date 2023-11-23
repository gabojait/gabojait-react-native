/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { HeadlessCheck } from '@/App';
import { name as appName } from './app.json';
import React from 'react';
import messaging from '@react-native-firebase/messaging';

import codePush from 'react-native-code-push';
import { getDBConnection, Notification, NotificationRepository } from '@/data/localdb';
import { AlertType } from '@/data/model/type/AlertType';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  // try {
  //   const db = await getDBConnection();
  //   const notificationRepository = new NotificationRepository(db);
  //   await notificationRepository.createTableIfNotExists();
  //   await notificationRepository.save(
  //     new Notification({
  //       read: false,
  //       id: remoteMessage.messageId ?? '-9999',
  //       title: remoteMessage.data?.title ?? '',
  //       body: remoteMessage.data?.body ?? '',
  //       time: remoteMessage.data?.time ?? '',
  //       type: remoteMessage.data?.type ?? '',
  //     }),
  //   );
  //   await db.close();
  // } catch (e) {
  //   console.error(e);
  // }
});
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };
AppRegistry.registerComponent(appName, () => codePush(codePushOptions)(HeadlessCheck));
