import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IdeaArrayObject, Person } from "./types";
import * as FileSystem from "expo-file-system";
type DataType = { [key: string]: any };

type ContextType = [DataType, any, any, any, any];
type DataContextType = any;
interface UpdateGiftParams {
  personId: string;
  giftConfig: IdeaArrayObject;
}
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
  const removePerson = async (id: string) => {
    const updatedPeople = data.person.filter(
      (person: Person) => person.id !== id
    );
    saveData("person", updatedPeople);
  };

  const updateGift = async ({
    personId,
    giftConfig,
  }: UpdateGiftParams): Promise<void> => {
    const checkObject= Object.values(giftConfig).some((value) => value === undefined || value === null || value === "");
    if (!personId || checkObject) {
      throw new Error("Please fill out all fields");
    }
    try {
      const person = data.person.find(
        (person: Person) => person.id === personId
      );

      if (!person) {
        throw new Error(`Person with ID ${personId} not found`);
      }

      const updatedPerson = {
        ...person,
        ideas: [...(person.ideas || []), giftConfig],
      };

      const updatedPeople = data.person.map((person: Person) =>
        person.id === personId ? updatedPerson : person
      );

      await saveData("person", updatedPeople);
    } catch (error) {
      console.error("Error updating gift:", error);
      throw error;
    }
  };
  const removeGift = async (personId: string, giftId: string) => {
    try {
      const person = data.person.find(
        (person: Person) => person.id === personId
      );
      if (!person) {
        throw new Error(`Person with ID ${personId} not found`);
      }
      const updatedIdeas = person.ideas.filter(
        (idea: IdeaArrayObject) => idea.giftId !== giftId
        );
        const targetIdea = person.ideas.find(
          (idea: IdeaArrayObject) => idea.giftId === giftId
        );
        console.log("updatedIdeas",targetIdea.image.uri)
      const updatedPerson = { ...person, ideas: updatedIdeas };
      const updatedPeople = data.person.map((person: Person) =>
        person.id === personId ? updatedPerson : person
      );

      await FileSystem.deleteAsync(
        targetIdea.image.uri,
      );
      await saveData("person", updatedPeople);
    } catch (error) {
      console.error("Error removing gift:", error);
      throw error;
    }
  }

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
  const contextMethods: DataContextType = {
    data,
    saveData,
    removePerson,
    removeData,
    clearAllData,
    updateGift,
    removeGift
  };

  return (
    <MyDataContext.Provider value={contextMethods}>
      {children}
    </MyDataContext.Provider>
  );
}

export function useMyData(): NonNullable<DataContextType> {
  const context = useContext(MyDataContext);
  if (!context)
    throw new Error("useMyData must be used within a MyDataProvider");
  return context;
}
