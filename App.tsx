import { NavigationContainer,useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddIdeaScreen from "./pages/AddIdeaScreen";
import AddPersonScreen from "./pages/AddPersonScreen";
import { MyDataProvider } from "./Providers";
import IdeaScreen from "./pages/IdeaScreen";
import PeopleScreen from "./pages/PeopleScreen";
import { Pressable, Text } from "react-native";
import { headerStyles, textStyles } from "./styles";

const Stack = createNativeStackNavigator();
const Drawer = createNativeStackNavigator();

function Root() {
  const navigation = useNavigation();
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
            <Pressable onPress={() => navigation.navigate("Add Person")}>
              <Text style={headerStyles.headerRightButton}>Add Person</Text>
            </Pressable>
          ),
          
        }}
      />
      <Stack.Screen name="Ideas" component={IdeaScreen} options={
        {
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Add Idea")}>
              <Text style={headerStyles.headerRightButton}>Add Idea</Text>
            </Pressable>
          ),
        }
      }/>
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
            name="Add Person" 
            component={AddPersonScreen}
            options={{ headerBackTitle: "People" }}
          />
          <Stack.Screen 
            name="Add Idea" 
            component={AddIdeaScreen}
            options={{ headerBackTitle: "People" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyDataProvider>
  );
}