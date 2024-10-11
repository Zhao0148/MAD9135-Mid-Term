// AddIdeaScreen - add a new idea object inside the ideas array for a selected person.

import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import {  styles, textStyles } from "../styles";
import { useMyData } from "../Providers";
import CameraComponent from "../components/Camera";
import { useRoute } from "@react-navigation/native";
import { AddIdeaScreenRouteProp} from "../App";


const AddIdeaScreen = () => {
  const {data, saveData} = useMyData();
  const route = useRoute<AddIdeaScreenRouteProp>();
  const { id } = route.params;
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
        {data?.cameraImageDimension && (
          <CameraComponent personId={id}  />
        )}
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddIdeaScreen;
