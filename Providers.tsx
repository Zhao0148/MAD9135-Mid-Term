import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type DataType = any[]; 
type ContextType = [DataType, (list: DataType) => Promise<void>];

const MyDataContext = createContext<ContextType | undefined>(undefined);

export function MyDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<DataType>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('an_asyncstorage_key');
        if (storedData !== null) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  async function updateStorageData(list: DataType) {
    try {
      await AsyncStorage.setItem('an_asyncstorage_key', JSON.stringify(list));
      setData(list);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }

  return (
    <MyDataContext.Provider value={[data, updateStorageData]}>
      {children}
    </MyDataContext.Provider>
  );
}

export function useMyData(): NonNullable<ContextType> {
  const context = useContext(MyDataContext);
  if (!context) throw new Error('useMyData must be used within a MyDataProvider');
  return context;
}