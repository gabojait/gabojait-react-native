import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { AlertType } from '@/data/model/type/AlertType';

const SQLite = require('react-native-sqlite-storage');
SQLite.enablePromise(true);

export const getDBConnection = async () => {
  console.log('connect db!');
  try {
    const db = await openDatabase({ name: 'noti-db.db', location: 'default' });
    console.info(`[DB] 로컬 DB 연결 상태: ${db ? '정상' : '오류'}\n`);
    return db;
  } catch (e) {
    console.error(
      '[DB]',
      `
      로컬 DB 연결 상태: 오류
      오류 상세 내용: ${e}
      `,
    );
    return null;
  }
};

export type Notification = {
  id: number;
  title: string;
  body: string;
  time: string;
  type: keyof typeof AlertType;
};

export const createTable = async (db: SQLiteDatabase) => {
  return await db.executeSql(`CREATE TABLE IF NOT EXISTS TNotification(
        id int NOT NULL PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        body VARCHAR(100) NOT NULL,
        time DATETIME(6) NOT NULL,
        type VARCHAR(10) NOT NULL
    )`);
};
export const getNotifications = async (
  db: SQLiteDatabase,
  page: number,
): Promise<Notification[]> => {
  try {
    const notifications: Notification[] = [];
    const query = `SELECT * FROM TNotification LIMIT 10 OFFSET ${page ?? 0}`;
    console.log(query);
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        notifications.push(result.rows.item(index));
      }
    });
    console.log(notifications);
    return notifications;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get notifcations!!!');
  }
};

export const saveNotification = async (db: SQLiteDatabase, notification: Notification) => {
  const insertQuery = `INSERT OR REPLACE INTO TNotification(id, title, body, time, type) values(
${notification.id}, '${notification.title}', '${notification.body}', '${notification.time}', '${notification.type}'
)`;

  return db.executeSql(insertQuery);
};

export const deleteNotification = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from TNotification where id = ${id}`;
  await db.executeSql(deleteQuery);
};

export const clearNotificationTable = async (db: SQLiteDatabase) => {
  const deleteQuery = `DROP TABLE TNotification`;
  await db.executeSql(deleteQuery);
};
