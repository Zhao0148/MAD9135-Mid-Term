import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
} from "react-native";
import { Image } from "expo-image";
import { IdeaArrayObject } from "../types";
import { useMyData } from "../Providers";
import { ideaListStyles, PhotoModalStyles} from "../styles";
import { X } from "lucide-react-native";

type Props = { ideas: IdeaArrayObject };

export default function ListItemIdeas({ ideas }: Props) {
  const { data } = useMyData();
  const [isExpanded, setIsExpanded] = useState(false);
  const { image, giftDescription } = ideas;
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const handlePress = () => {
    if (image?.uri) {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  const imageAspectRatio =
    data.cameraImageDimension.imageDimensions.width /
    data.cameraImageDimension.imageDimensions.height;
  const modalImageWidth = screenWidth * 0.9;
  const modalImageHeight = modalImageWidth / imageAspectRatio;

  return (
    <View >
      {/* Expands thumbnail to large photo */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isExpanded}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={PhotoModalStyles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={PhotoModalStyles.modalContent}>
                <Image
                  source={{ uri: image?.uri }}
                  style={[
                    PhotoModalStyles.modalImage,
                    {
                      width: modalImageWidth,
                      height: modalImageHeight,
                    },
                  ]}
                />

                <Pressable
                  style={PhotoModalStyles.closeButton}
                  onPress={handleClose}
                >
                  <X color="#FFF" size={24} />
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Each gift item */}
      {ideas && (
        <View style={ideaListStyles.card}>
          <View style={ideaListStyles.textContainer}>
            <Text style={ideaListStyles.title}>Gift Idea</Text>
            <Text style={ideaListStyles.description}>{giftDescription}</Text>
          </View>
          <Pressable onPress={handlePress}>
            <Image
              source={{ uri: image?.uri }}
              style={[
                ideaListStyles.image,
                {
                  width: screenWidth * 0.2,
                  height: (screenWidth * 0.2) / imageAspectRatio,
                },
              ]}
              contentFit="cover"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

