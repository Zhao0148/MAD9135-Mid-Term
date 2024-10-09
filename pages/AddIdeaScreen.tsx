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
  Dimensions,
  Image,
  useWindowDimensions,
  ScrollView,
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
  const [data, saveData] = useMyData();
  const screen = useWindowDimensions();
  useEffect(() => {
    calculateImageDimensions();
  }, []);

  const calculateImageDimensions = async () => {
    const screenWidth = screen?.width;
    const imageWidthPercentage = 0.7;
    const imageWidth = Math.floor(screenWidth * imageWidthPercentage);
    const aspectRatio = 9 / 16;
    const imageHeight = Math.floor(imageWidth / aspectRatio);
    const newImageDimensions = { width: imageWidth, height: imageHeight };
    console.log(`newImageDimensions`, newImageDimensions);
    saveData("cameraImageDimension", { imageDimensions: newImageDimensions });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
       <View style={[styles.paddingContainer, { alignItems: "flex-start" }]}>
        <Text style={textStyles.h2}>{"Add Idea"}</Text>
      </View>
      <View style={[styles.paddingContainer, { alignItems: "flex-start" }]}>
      <Text>{"Gift Idea"}</Text>
      </View>


      {data?.cameraImageDimension && <CameraComponent />}
      <View>
        {/* <Pressable
          style={buttonStyles.button}
          onPress={() => navigation.navigate("Ideas")}
        >
          <Text style={buttonStyles.buttonText}>{"Save Idea"}</Text>
        </Pressable> */}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddIdeaScreen;
