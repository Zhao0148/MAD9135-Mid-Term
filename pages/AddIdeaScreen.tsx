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
  TextInput,
} from "react-native";
import { buttonStyles, styles, textStyles } from "../styles";
import { useMyData } from "../Providers";

type Props = {
  navigation: any;
  route: any;
};

const AddIdeaScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={textStyles.h2}>{"Add Idea"}</Text>
      </View>

      <Text style={textStyles.p}>{"Gift Idea"}</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => console.log(text)}
        placeholder="Gift Idea"
      />
      <View>
        <Pressable
          style={buttonStyles.button}
          onPress={() => navigation.navigate("Ideas")}
        >
          <Text style={buttonStyles.buttonText}>{"Save Idea"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddIdeaScreen;
