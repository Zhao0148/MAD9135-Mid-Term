import React, { useState } from "react";
import { StyleSheet, View, Text, Platform, Pressable } from "react-native";
import { Image } from "expo-image";
import { IdeaArrayObject } from "../types";
import { useMyData } from "../Providers";
import { ideaListStyles, modalStyles } from "../styles";

type Props = { ideas: IdeaArrayObject };

export default function ListItemIdeas({ ideas }: Props) {
  const [data] = useMyData();
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const cameraWidth = data.cameraImageDimension.imageDimensions.width * 0.5;
  const cameraHeight = data.cameraImageDimension.imageDimensions.height * 0.5;

  const { image, giftDescription } = ideas;
  const handlePress = () => {
    const uri = image?.uri;
    if (uri) {
      setImageModalVisible(true);
    }
  };
    return (
      <View style={ideaListStyles.card}>
        {ideas && (
          <View style={ideaListStyles.contentContainer}>
            <Pressable onPress={handlePress}>
              <Image
                source={{ uri: image?.uri }}
                style={[
                  ideaListStyles.image,
                  {
                    width: cameraWidth,
                    height: cameraHeight,
                  },
                ]}
                contentFit="cover"
              />
              <Text>Change Image</Text>
            </Pressable>
            <View style={ideaListStyles.textContainer}>
              <Text style={ideaListStyles.title}>Gift Idea</Text>
              <Text style={ideaListStyles.description}>{giftDescription}</Text>
            </View>
          </View>
        )}
      </View>
    );
  };



