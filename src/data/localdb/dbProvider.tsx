import React, {createContext, useContext, useState, useEffect} from 'react';
import {getDBConnection} from "@/data/localdb/index";
import {SQLiteDatabase} from "react-native-sqlite-storage";

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

    return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
}

export function useDB() {
    return useContext(DBContext);
}
