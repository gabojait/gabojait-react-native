import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { getDBConnection, NotificationRepository } from '@/data/localdb/index';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { DevSettings } from 'react-native';
import LoadingSpinner from '@/presentation/screens/Loading';

const NotificationContext = createContext<NotificationRepository | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [db, setDB] = useState<SQLiteDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const notificationRepository = useMemo(() => (db ? new NotificationRepository(db) : null), [db]);

  useEffect(() => {
    async function createDBConnection() {
      console.log('Creating DB Connection!');
      const connection = await getDBConnection();
      setDB(connection);
      setIsLoading(false);
    }

    createDBConnection();

    return () => {
      if (db) {
        db?.close();
      }
    };
  }, []);

  useEffect(() => {
    if (__DEV__ && db != null)
      DevSettings.addMenuItem('Clear Notification DB (may not be available)', () => {
        notificationRepository?.clear();
      });
  });

  if (isLoading || !db) {
    return <LoadingSpinner />;
  }

  return (
    <NotificationContext.Provider value={notificationRepository!}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationRepository() {
  return useContext(NotificationContext);
}
