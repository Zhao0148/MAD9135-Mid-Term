import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  CameraType,
  useCameraPermissions,
  CameraView,
  ImageSize,
  CameraPictureOptions,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { randomUUID } from "expo-crypto";
import { CameraIcon, Images, X } from "lucide-react-native";
import { Image } from "expo-image";
import { StyleSheet } from "react-native";
// Local imports
import { useMyData } from "../Providers";
import { cameraStyles, styles, stylesInput, touchableBtn } from "../styles";
import { IdeaArrayObject, ImagePreview, ManipulatedImage } from "../types";
import ModalComponent from "./Modal";
import { RootStackNavigationProp } from "../App";
import { manipulateImage } from "../utils/camera-utils/cameraUtils";

export default function CameraComponent({ personId }: { personId: string }) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [permission, requestPermission] = useCameraPermissions();
  const [currentPictureResolution, setCurrentPictureResolution] =
    useState<ImageSize>({
      width: 1080,
      height: 1920,
    });
  const { data, saveData, updateGift } = useMyData();
  const camera = useRef<CameraView | null>(null);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const [giftDescription, setGiftDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const cameraWidth = data.cameraImageDimension?.imageDimensions.width;
  const cameraHeight = data.cameraImageDimension?.imageDimensions.height;

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function saveGift({ id }: { id: string }) {
    const giftConfig: IdeaArrayObject = {
      giftId: randomUUID(),
      giftDescription,
      image: imagePreview,
      width: currentPictureResolution.width,
      height: currentPictureResolution.height,
    };
    updateGift({ personId: id, giftConfig })
      .then(() => {
        setImagePreview(null);
        setGiftDescription("");
        navigation.navigate("Ideas", { id: personId });
      })
      .catch(() => setModalVisible(true));
  }

  const takePicture = async () => {
    try {
      if (!cameraReady) {
        return;
      }
      const options: CameraPictureOptions = {
        quality: 1,
        exif: true,
        // shutterSound: false, // expo implemented but not released.
      };

      if (camera.current && cameraReady === true) {
        const resolutionsArray =
          await camera.current.getAvailablePictureSizesAsync();
        const preferredResolution = selectPreferredResolution(resolutionsArray);
        setCurrentPictureResolution(preferredResolution);
        await saveData("currentImageDimension", {
          imageDimensions: preferredResolution,
        });
        setIsTakingPicture(true);

        await camera.current
          .takePictureAsync(options)
          .then(async (photo) => {
            if (photo) {
              const finalUri = await manipulateImage(
                photo.uri,
                photo.exif.Orientation,
                preferredResolution.width
              );
              setImagePreview({ uri: finalUri });
            }
          })
          .catch((err) => console.warn(err.message));
      }
    } catch (error) {
      console.log("error in takePicture", error);
    } finally {
      setIsTakingPicture(false);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access the gallery is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagePreview({ uri: result.assets[0].uri });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={[styles.paddingContainer]}>
        {isModalVisible && (
          <ModalComponent
            isModalVisible={true}
            onConfirm={() => setModalVisible(false)}
            titleText="Missing Field"
            bodyText="Fill in the missing fields"
          />
        )}
        <TextInput
          style={[stylesInput.input,{marginBottom:25}]}
          onChangeText={setGiftDescription}
          placeholder="Gift Idea"
          autoCorrect={false}
          value={giftDescription}
        />

        <View
          style={[
            cameraStyles.cameraContainer,
            {
              width: cameraWidth,
              height: cameraHeight,
            },
          ]}
        >
          {imagePreview ? (
            <Image
              contentFit="cover"
              source={{ uri: imagePreview.uri }}
              style={[
                cameraStyles.cameraView,
                { width: cameraWidth, height: cameraHeight },
              ]}
            />
          ) : (
            <CameraView
              animateShutter={false}
              ref={camera}
              style={[
                cameraStyles.cameraView,
                { width: cameraWidth, height: cameraHeight },
              ]}
              facing={facing}
              pictureSize={`${cameraWidth}x${cameraHeight}`}
              onCameraReady={() => {
                setCameraReady(true);
              }}
            >
              <View style={cameraStyles.buttonContainer}>
                {isTakingPicture && (
                  <View style={cameraStyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={cameraStyles.loadingText}>
                      Taking Picture...
                    </Text>
                  </View>
                )}
              </View>
            </CameraView>
          )}
        </View>
        {/* Conditional buttons*/}
        {imagePreview ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Pressable
              onPress={() => setImagePreview(null)}
              style={cameraStyles.secondaryButton}
            >
              <Text style={cameraStyles.retakeButtonText}>Retake</Text>
            </Pressable>
            <TouchableOpacity
              style={cameraStyles.saveButton}
              onPress={() => saveGift({ id: personId })}
            >
              <Text style={cameraStyles.saveButtonText}>Save Gift</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={[touchableBtn.touchable, { backgroundColor: "red" }]}
              onPress={() => navigation.navigate("Ideas", { id: personId })}
            >
              <X size={24} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[touchableBtn.touchable, { width: 75, height: 75 }]}
              onPress={takePicture}
            >
              <CameraIcon size={42} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={touchableBtn.touchable}
              onPress={pickImage}
            >
              <Images size={24} color={"white"} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const selectPreferredResolution = (resolutions: string[]): ImageSize => {
  const verticalResolutions = resolutions.map((res) => {
    const [width, height] = res.split("x").map(Number);
    return { width: height, height: width };
  });
  return verticalResolutions[1] || verticalResolutions[0];
};
