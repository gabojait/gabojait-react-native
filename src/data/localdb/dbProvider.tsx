import React, { createContext, useContext, useState, useEffect } from 'react';
import { clearNotificationTable, getDBConnection } from '@/data/localdb/index';
import { SQLiteDatabase } from 'react-native-sqlite-storage';
import { DevSettings } from 'react-native';
import LoadingSpinner from '@/presentation/screens/Loading';

const DBContext = createContext<SQLiteDatabase | null>(null);

export function DBProvider({ children }: { children: React.ReactNode }) {
  const [db, setDB] = useState<SQLiteDatabase | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        clearNotificationTable(db!);
      });
  });

  if (isLoading || !db) {
    return <LoadingSpinner />;
  }

  return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
}

export function useDB() {
  return useContext(DBContext);
}
