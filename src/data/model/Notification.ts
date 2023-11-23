import { AlertType } from '@/data/model/type/AlertType';

export class Notification {
  notificationId: string;
  title: string;
  body: string;
  createdAt: string;
  notificationType: keyof typeof AlertType;
  isRead: boolean;

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
    this.notificationId = id;
    this.title = title;
    this.body = body;
    this.createdAt = time;
    this.notificationType = type;
    this.isRead = read;
  }
}
