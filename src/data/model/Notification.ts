interface Notification {
  notificationId: string;
  title: string;
  body: string;
  isRead: boolean;
  deepLink: {
    url: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}
