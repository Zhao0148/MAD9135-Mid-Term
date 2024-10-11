import React from "react";
import { Pressable, Text } from "react-native";
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddIdeaScreen from "./pages/AddIdeaScreen";
import AddPersonScreen from "./pages/AddPersonScreen";
import IdeaScreen from "./pages/IdeaScreen";
import PeopleScreen from "./pages/PeopleScreen";
import { MyDataProvider } from "./Providers";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export type RootStackParamList = {
  People: { id: string } | undefined;
  Ideas: { id: string } | undefined;
  AddPerson: undefined;
  AddIdea: { id: string };
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
export type IdeasScreenRouteProp = RouteProp<RootStackParamList, "Ideas">;
export type AddIdeaScreenRouteProp = RouteProp<RootStackParamList, "AddIdea">;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MyDataProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "indigo" },
              headerTintColor: "white",
            }}
            initialRouteName="People"
          >
            <Stack.Screen
              name="People"
              component={PeopleScreen}
              options={({ navigation }) => ({
                title: "People",
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate("AddPerson")}>
                    <Text style={{ marginRight: 10, color: "white" }}>
                      Add Person
                    </Text>
                  </Pressable>
                ),
              })}
            />
            <Stack.Screen
              name="Ideas"
              component={IdeaScreen}
              options={({ navigation, route }) => ({
                title: "Ideas",
                headerRight: () => (
                  <Pressable
                    onPress={() =>
                      navigation.navigate("AddIdea", {
                        id: route.params?.id || "",
                      })
                    }
                  >
                    <Text style={{ marginRight: 10, color: "white" }}>
                      Add Idea
                    </Text>
                  </Pressable>
                ),
              })}
            />

            <Stack.Screen
              name="AddPerson"
              component={AddPersonScreen}
              options={{
                title: "Add Person",
                headerBackTitle: "People",
              }}
            />

            <Stack.Screen
              name="AddIdea"
              component={AddIdeaScreen}
              options={{
                title: "Add Idea",
                headerBackTitle: "Ideas",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </MyDataProvider>
  );
}
