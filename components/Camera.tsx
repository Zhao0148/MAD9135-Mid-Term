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
import React, { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// import {Camera} from 'expo-camera';
export default function CameraComponent() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [ratio, setRatio] = useState<CameraRatio>("4:3");
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const camera = useRef<CameraView>(null);

  const takePicture = async () => {
    const options: CameraPictureOptions = { quality: 0.5, exif: true };
    if (camera && camera.current && cameraReady) {
      const getPhotoSize = await camera.current.getAvailablePictureSizesAsync();
      console.log(getPhotoSize);
      const photo = await camera.current
        .takePictureAsync(options)
        .then(({ width, height, uri, base64, exif }) => {
          console.log(uri);
          console.log(width);
          console.log(height);
          console.log(exif);
        });
      console.log(photo);
    }
  };
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={camera}
        style={styles.camera}
        facing={facing}
        ratio={"4:3"}
        // pictureSize={{ width: 640, height: 480 }}
        
        onCameraReady={() => {
          setCameraReady(true);
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
