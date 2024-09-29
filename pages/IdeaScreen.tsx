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
import { useMyData } from "../Providers";
import HeaderRightButton from "../components/headerRightButton";
type Props = {
  navigation: any;
  route: any;
};

const IdeaScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View>
        
        <Pressable
          style={buttonStyles.button}
          onPress={() => navigation.navigate("Add Idea")}
        >
          <Text style={buttonStyles.buttonText}>{"Delete Idea"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default IdeaScreen;
