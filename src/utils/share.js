import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { CameraRoll, Share } from "react-native";

export const openShareDialogAsync = async (ref, successCb, failCb) => {
  if (!(await Sharing.isAvailableAsync())) {
    console.log("failed sharing");
    failCb();
  } else {
    const imageURI = await captureRef(ref, {
      result: "tmpfile",
      quality: 1,
      format: "png",
    });

    const result = await Share.share({
      message: "Share image from Quotella",
      url: imageURI,
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          return {
            status: "shared",
          };
        } else if (result.action === Share.dismissedAction) {
          return {
            status: "dismissed",
          };
        }
      })
      .catch(() => {
        return {
          status: "error",
        };
      });

    return result;
  }
};

export const saveImage = async (ref, successCb, failCb) => {
  const imageURI = await captureRef(ref, {
    result: "tmpfile",
    quality: 1,
    format: "jpg",
  });

  try {
    // Request device storage access permission
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      // Save image to media library
      await MediaLibrary.saveToLibraryAsync(imageURI);
      successCb();
      console.log("Image successfully saved");
    }
  } catch (error) {
    console.log(error);
    failCb();
  }
};
