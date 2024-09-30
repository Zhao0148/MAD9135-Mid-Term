import {
  CameraType,
  useCameraPermissions,
  CameraRatio,
  CameraViewRef,
  CameraView,
  Camera,
  CameraPictureOptions,
} from "expo-camera";
import { CameraCapturedPicture } from "expo-camera/build/legacy/Camera.types";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMyData } from "../Providers";
import { Dimensions } from "react-native";
import { cameraStyles } from "../styles";
const screenDimensions = Dimensions.get("screen");

export default function CameraComponent() {
  const [data, setData] = useMyData();
  const camera = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [ratio, setRatio] = useState<CameraRatio>("4:3");
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [isTakingPicture, setIsTakingPicture] = useState<boolean>(false);
  useEffect(() => {
    calculateImageDimensions();
  }, [ratio, facing]);

  const calculateImageDimensions = async () => {
    const screenWidth = screenDimensions.width;
    const imageWidthPercentage = 0.7;
    const imageWidth = Math.floor(screenWidth * imageWidthPercentage);
    const aspectRatio = 4 / 3;
    const imageHeight = Math.floor(imageWidth / aspectRatio);
    const newImageDimensions = { width: imageWidth, height: imageHeight };

    setImageDimensions(newImageDimensions);
    setData([...data, { imageDimensions: newImageDimensions }]);
  };
  type PhotoOutput = CameraCapturedPicture | undefined;
  const takePicture = async () => {
    try {
      if (!cameraReady) {
        console.log("Camera is not ready yet.");
        return;
      }
      const options: CameraPictureOptions = {
        quality: 0.5,
        exif: true,
      };

      if (camera.current && cameraReady === true) {
        // await camera.current.getAvailablePictureSizesAsync();
        /* 
        Changing the aspect ratio of the camera will change the resolution.
        */
        setIsTakingPicture(true);
        const photo: PhotoOutput = await camera.current.takePictureAsync(
          options
        );
        //photo exif is type MediaTrackSettings
        if (photo) {
          console.log(`photoWidth: ${photo?.width}`);
          console.log(`photoHeight: ${photo?.height}`);
          console.log("photo", photo);
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsTakingPicture(false);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={cameraStyles.container}>
        <Text style={cameraStyles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <View style={cameraStyles.container}>
      <CameraView
        ref={camera}
        style={cameraStyles.camera}
        facing={facing}
        ratio={"4:3"}
        pictureSize={`${imageDimensions.height}x${imageDimensions.width}`}
        onCameraReady={() => {
          setCameraReady(true);
        }}
      >

        <View style={cameraStyles.buttonContainer}>
          {!isTakingPicture ? (
            <TouchableOpacity style={cameraStyles.button} onPress={takePicture}>
              <Text style={cameraStyles.text}>Take Picture</Text>
            </TouchableOpacity>
          ) : (
            cameraReady && (
              <View style={cameraStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={cameraStyles.loadingText}>Taking Picture...</Text>
              </View>
            )
          )}
        </View>
      </CameraView>
    </View>
  );
}
