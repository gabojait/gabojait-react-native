import { openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { AlertType } from '@/data/model/type/AlertType';

const SQLite = require('react-native-sqlite-storage');
SQLite.enablePromise(true);

export const getDBConnection = async () => {
  console.log('connect db!');
  try {
    const db = await openDatabase(
      {
        name: 'noti-db.db',
        location: 'default',
        createFromLocation: 1,
      },
      () => {
        console.info('[DB] 연결 완료');
      },
      e => {
        console.info(`[DB] ${e}`);
        throw e;
      },
    );
    console.info(
      `[DB] 로컬 DB 연결 상태: ${db ? '정상' : '오류'}
        `,
    );
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

export class Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  type: keyof typeof AlertType;
  read: boolean;

  constructor({
    id,
    title,
    body,
    time,
    type,
    read,
  }: {
    id: string;
    title: string;
    body: string;
    time: string;
    type: keyof typeof AlertType;
    read: boolean;
  }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.time = time;
    this.type = type;
    this.read = read;
  }
}

export class NotificationRepository {
  db: SQLiteDatabase;
  constructor(db: SQLiteDatabase) {
    this.db = db;
    this.createTableIfNotExists();
  }

  async createTableIfNotExists() {
    return await this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS TNotification(
        id VARCHAR(30) NOT NULL PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        body VARCHAR(100) NOT NULL,
        time DATETIME(6) NOT NULL,
        type VARCHAR(10) NOT NULL,
        read BIT DEFAULT 1
    )`,
    );
  }

  async save(notification: Notification) {
    const insertQuery = `INSERT OR REPLACE INTO TNotification(id, title, body, time, type) values(
'${notification.id}', '${notification.title}', '${notification.body}', '${notification.time}', '${notification.type}'
)`;

    return await this.db.executeSql(insertQuery);
  }
  async delete(id: number) {
    const deleteQuery = `DELETE from TNotification where id = ${id}`;
    return await this.db.executeSql(deleteQuery, undefined);
  }

  async modify(id: number, notification: Notification) {
    const readNumber = notification.read ? 1 : 0;

    const updateQuery = `
    UPDATE TNotification
    SET title = '${notification.title}',
        body = '${notification.body}',
        time = '${notification.time}',
        type = '${notification.type}'
        read = ${readNumber}
    WHERE id = ${notification.id};`;
    return await this.db.executeSql(updateQuery);
  }

  async findByPage(page: number): Promise<Notification[]> {
    try {
      const notifications: Notification[] = [];
      const query = `SELECT * FROM TNotification  ORDER BY time DESC LIMIT 10 OFFSET ${page ?? 0}`;
      console.log(query);
      const results = await this.db.executeSql(query);
      results.forEach(result => {
        for (let index = 0; index < result.rows.length; index++) {
          const item = result.rows.item(index);
          const readBoolean = item.read === 1;
          notifications.push({ ...item, read: readBoolean });
        }
      });
      console.log(notifications);
      return notifications;
    } catch (error) {
      console.error(error);
      throw Error('Failed to get notifications!!!');
    }
  }

  async clear() {
    const deleteQuery = 'DROP TABLE IF EXISTS TNotification ';
    await this.db.executeSql(deleteQuery);
  }
}
