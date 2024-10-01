import { NavigationContainer, useNavigation , NavigationProp} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddIdeaScreen from "./pages/AddIdeaScreen";
import AddPersonScreen from "./pages/AddPersonScreen";
import { MyDataProvider } from "./Providers";
import IdeaScreen from "./pages/IdeaScreen";
import PeopleScreen from "./pages/PeopleScreen";
import { Pressable, Text } from "react-native";
import { headerStyles, textStyles } from "./styles";
import React from "react";

export type StackParamList = {
  Home: undefined;
  Ideas: { id: string };
  AddPerson: undefined;
  AddIdea: undefined;
  Root: undefined;  
};

export type StackNavigationProp = NavigationProp<StackParamList>;
const Stack = createNativeStackNavigator<StackParamList>();
const Drawer = createNativeStackNavigator();
function Root() {
  const navigation = useNavigation<StackNavigationProp>();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "indigo" },
        headerTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="People"
        component={PeopleScreen}
        options={{
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("AddPerson")}>
              <Text style={headerStyles.headerRightButton}>Add Person</Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Ideas"
        component={IdeaScreen}
        options={{
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("AddIdea")}>
              <Text style={headerStyles.headerRightButton}>Add Idea</Text>
            </Pressable>
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <MyDataProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "indigo" },
            headerTintColor: "white",
          }}
          initialRouteName="Root"
        >
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddPerson"
            component={AddPersonScreen}
            options={{ headerBackTitle: "People" }}
          />
          <Stack.Screen
            name="AddIdea"
            component={AddIdeaScreen}
            options={{ headerBackTitle: "People" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyDataProvider>
  );
}
