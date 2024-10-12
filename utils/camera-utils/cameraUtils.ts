import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

import { randomUUID } from "expo-crypto";
import { ManipulatedImage } from "../../types";

export function correctOrientation(orientation: number) {
    switch (orientation) {
      case 6:
        return -90;
      default:
        return 0;
    }
  }

  export const manipulateImage = async (
    uri: string,
    orientation: number,
    width: number
  ): Promise<string> => {
    let rotatedPhotoUri = uri;
  
    if (orientation) {
      const rotation = correctOrientation(orientation);
      if (rotation !== 0) {
        const manipulatedImage: ManipulatedImage = await ImageManipulator.manipulateAsync(
          uri,
          [
            { rotate: rotation },
            { resize: { width } },
          ],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        rotatedPhotoUri = manipulatedImage.uri;
        console.log(`Rotated URI: ${JSON.stringify(manipulatedImage)}`);
      }
    }
  
    const filename = `${randomUUID()}.png`;
    const imageDir = `${FileSystem.documentDirectory}images/`;
    const finalPath = `${imageDir}${filename}`;
  
    const dirInfo = await FileSystem.getInfoAsync(imageDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
    }
  
    await FileSystem.moveAsync({ from: rotatedPhotoUri, to: finalPath });
    return finalPath;
  };