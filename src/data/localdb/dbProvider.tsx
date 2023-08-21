import React, {createContext, useContext, useState, useEffect} from 'react';
import {clearNotificationTable, getDBConnection} from "@/data/localdb/index";
import {SQLiteDatabase} from "react-native-sqlite-storage";
import {DevSettings} from "react-native";

const DBContext = createContext<SQLiteDatabase | null>(null);

export function DBProvider({children}: { children: React.ReactNode }) {
    const [db, setDB] = useState<SQLiteDatabase | null>(null);

    useEffect(() => {
        async function createDBConnection() {
            const connection = await getDBConnection();
            setDB(connection);
        }

        createDBConnection();

        return () => {
            if (db) {
                db?.close();
            }
        };
    }, []);

    useEffect(() => {
        if (db != null) DevSettings.addMenuItem('Clear Notification DB (may not be available)', () => {
            clearNotificationTable(db!)
        });
    })

    return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
}

export function useDB() {
    return useContext(DBContext);
}
