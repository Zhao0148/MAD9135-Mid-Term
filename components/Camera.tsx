import {
  CameraType,
  useCameraPermissions,
  CameraView,
  Camera,
  PermissionResponse,
  PermissionStatus,
} from "expo-camera";
import type { CameraPictureOptions, ImageSize } from "expo-camera";
import { Image } from "expo-image";
import { CameraIcon } from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useMyData } from "../Providers";
import * as ImagePicker from "expo-image-picker";
import { buttonStyles, cameraStyles, styles } from "../styles";
import * as ImageManipulator from "expo-image-manipulator";
import { ImagePreview, ManipulatedImage } from "../types";
import { Audio, InterruptionModeAndroid } from 'expo-av';
export default function CameraComponent() {
  const [status, requestPermission] = useCameraPermissions();
  const [currentPictureResolution, setCurrentPictureResolution] =
    useState<ImageSize>({
      width: 1080,
      height: 1920,
    });
  const [data, saveData] = useMyData();
  const camera = useRef<CameraView | null>(null);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [giftDescription, setGiftDescription] = useState("");
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);


  useEffect(() => {

  }, []);

  
  const takePicture = async () => {
    try {
      
      if (!cameraReady) {
        console.log("Camera is not ready yet.");
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
        console.log("resolutionsArray", resolutionsArray);
        const resolutionForVertical = resolutionsArray.map((res) => {
          const [width, height] = res.split("x").map(Number);
          return { width: height, height: width };
        });
        console.log("resolutionForVertical", resolutionForVertical);
        const preferredResolution =
          resolutionForVertical[1] || resolutionForVertical[0];
        console.log("preferredResolution", preferredResolution);
        setCurrentPictureResolution(preferredResolution);
        await saveData("currentImageDimension", {
          imageDimensions: preferredResolution,
        });
        setIsTakingPicture(true);
        
        await camera.current.takePictureAsync(options).then(async (photo) => {
          if (photo) {
            console.log("photo2", photo);
            let rotatedPhotoUri = photo.uri;
            if (photo.exif && photo.exif.Orientation) {
              const rotation = correctOrientation(photo.exif.Orientation);
              if (rotation !== 0) {
                const manipulatedImage: ManipulatedImage =
                  await ImageManipulator.manipulateAsync(
                    photo.uri,
                    [
                      { rotate: rotation },
                      {
                        resize: {
                          // height: currentPictureResolution.height,
                          width: currentPictureResolution.width,
                        },
                      },
                    ],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                  );
                rotatedPhotoUri = manipulatedImage.uri;
                console.log("manipulatedImage", manipulatedImage);
              }
            }
            setImagePreview({ uri: rotatedPhotoUri });
          }
        }).catch(err => console.warn(err.message));;
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsTakingPicture(false);

    }
  };

  const cameraWidth = data.cameraImageDimension?.imageDimensions.width;
  const cameraHeight = data.cameraImageDimension?.imageDimensions.height;
  if (!status) {
    return <View />;
  }

  if (status.status !== PermissionStatus.GRANTED) {
    return (
      <View style={cameraStyles.container}>
        <Text style={cameraStyles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }
  return (
    <View style={styles.paddingContainer}>
      <TextInput
        style={cameraStyles.textInput}
        onChangeText={(text) => setGiftDescription(text)}
        placeholder="Gift Idea"
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
      {image && (
        <View
          style={[
            cameraStyles.selectedImageContainer,
            { width: cameraWidth, height: cameraHeight },
          ]}
        >
          <Image
            source={{ uri: image }}
            style={[
              cameraStyles.selectedImage,
              { width: cameraWidth, height: cameraHeight },
            ]}
          />
        </View>
      )}

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
            // onPress={() => saveGift("")}
          >
            <Text style={cameraStyles.saveButtonText}>Save Gift</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "skyblue",
              borderRadius: 50,
              width: 50,
              height: 50,
              marginBottom: 20,
            }}
            onPress={takePicture}
          >
            <CameraIcon size={24} color={"black"} />
            {/* <Text style={cameraStyles.text}>Take Picture</Text> */}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function correctOrientation(orientation: number) {
  switch (orientation) {
    case 6:
      return -90;
    default:
      return 0;
  }
}

// const pickImage = async () => {
//   const permissionResult =
//     await ImagePicker.requestMediaLibraryPermissionsAsync();

//   if (permissionResult.granted === false) {
//     alert("Permission to access the gallery is required!");
//     return;
//   }

//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//   });

//   if (!result.canceled) {
//     setImage(result.assets[0].uri);
//   }
// };

// function saveGift(id: string) {
//   if (!imagePreview) {
//     alert("No image to save.");
//     return;
//   }

//   const giftModel: IdeaArrayObject = {
//     giftId: randomUUID(),
//     giftDescription,
//     image: imagePreview,
//     width: currentPictureResolution.width,
//     height: currentPictureResolution.height,
//   };
// }
