// AddIdeaScreen - add a new idea object inside the ideas array for a selected person.

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

type Props = {
  navigation: any;
  route: any;
};

const AddIdeaScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View>
        <Pressable
          style={buttonStyles.button}
          onPress={() => navigation.navigate("PeopleScreen")}
        >
          <Text style={buttonStyles.buttonText}>{"People Screen"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddIdeaScreen;
