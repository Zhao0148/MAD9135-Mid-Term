import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddIdeaScreen from "./pages/AddIdeaScreen";
import AddPersonScreen from "./pages/AddPersonScreen";
import PeopleScreen from "./pages/PeopleScreen";
import IdeaScreen from "./pages/IdeaScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "indigo" },
          headerTintColor: "white",
        }}
        initialRouteName="Home"
      >
        <Stack.Screen name="PeopleScreen" component={PeopleScreen}  />
        <Stack.Screen name="AddPersonScreen" component={AddPersonScreen} />
        <Stack.Screen name="AddIdeaScreen" component={AddIdeaScreen} />
        <Stack.Screen name="IdeaScreen" component={IdeaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
