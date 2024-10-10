import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Person } from "./types";

type DataType = { [key: string]: any };

type ContextType = [DataType, any, any, any, any];

const APP_NAME = "RememberMe";

const MyDataContext = createContext<ContextType | undefined>(undefined);

export function MyDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataType>({});

  const saveData = async (key: string, newData: any) => {
    try {
      const storageKey = `${APP_NAME}${key}`;
      await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
      setData((prevData) => ({ ...prevData, [key]: newData ?? [] }));
      console.log(`Storage key: ${key}:`, newData);
    } catch (error) {
      console.error(`Error saving data for ${key}:`, error);
    }
  };

  const removeData = async (key: string) => {
    try {
      const storageKey = `${APP_NAME}${key}`;
      await AsyncStorage.removeItem(storageKey);
      setData((prevData) => {
        const newData = { ...prevData };
        delete newData[key];
        return newData;
      });
      console.log(`Data removed for ${key}`);
    } catch (error) {
      console.error(`Error removing data for ${key}:`, error);
    }
  };
  const removePerson = (id: string) => {
    console.log(`iProvide`, id);
    const updatedPeople = data.person.filter(
      (person: Person) => person.id !== id
    );
    saveData("person", updatedPeople);
  };
  useEffect(() => {
    const loadData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        const relevantKeys = keys.filter((key) => key.startsWith(APP_NAME));
        const storedPairs = await AsyncStorage.multiGet(relevantKeys);
        const loadedData: DataType = {};
        storedPairs.forEach(([fullKey, value]) => {
          if (value) {
            const key = fullKey.replace(APP_NAME, "");
            loadedData[key] = JSON.parse(value);
          }
        });
        setData(loadedData);
      } catch (error) {
        console.error("Error loading data from AsyncStorage:", error);
      }
    };
    loadData();
  }, []);

  const clearAllData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const relevantKeys = keys.filter((key) => key.startsWith(APP_NAME));
      await AsyncStorage.multiRemove(relevantKeys);
      setData({});
      console.log("All data cleared");
    } catch (error) {
      console.error("Error clearing data:", error);
    }
  };

  return (
    <MyDataContext.Provider
      value={[data, saveData, removePerson, removeData, clearAllData]}
    >
      {children}
    </MyDataContext.Provider>
  );
}

export function useMyData(): NonNullable<ContextType> {
  const context = useContext(MyDataContext);
  if (!context)
    throw new Error("useMyData must be used within a MyDataProvider");
  return context;
}
