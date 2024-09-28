// IdeaScreen - list the name and image for each idea belonging to a selected person.

import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { buttonStyles } from "../styles";

type Props = {
    navigation: any;
    route: any;
}

const IdeaScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView
    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
  >
    <View>
      <Pressable
        style={buttonStyles.button}
        onPress={() => navigation.navigate("AddPersonScreen")}
      >
        <Text style={buttonStyles.buttonText}>{"Add Person Screen"}</Text>
      </Pressable>
    </View>
  </SafeAreaView>
  )
}

export default IdeaScreen