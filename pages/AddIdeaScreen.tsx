// AddIdeaScreen - add a new idea object inside the ideas array for a selected person.

import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  Platform,
} from "react-native";
import { buttonStyles, styles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import IdeaTextInput from "../components/IdeaTextInput";
import * as ImagePicker from "expo-image-picker";
import CameraComponent from "../components/Camera";


// import { CameraType } from "expo-camera";
// type CameraType = "back" | "front";
type Props = {
  navigation: any;
  route: any;
};

const AddIdeaScreen = ({ navigation }: Props) => {
  // const [image, setImage] = useState(null);




  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={textStyles.h2}>{"Add Idea"}</Text>
      </View>

      <Text style={textStyles.p}>{"Gift Idea"}</Text>
      <IdeaTextInput />
      <CameraComponent />
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
