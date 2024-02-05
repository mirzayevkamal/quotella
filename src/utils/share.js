import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import { CameraRoll, Platform, Share } from "react-native";
import * as FileSystem from "expo-file-system";

export const openShareDialogAsync = async (ref, successCb, failCb) => {
  if (!(await Sharing.isAvailableAsync())) {
    console.log("failed sharing");
    failCb();
  } else {
    const imageURI = await captureRef(ref, {
      result: "tmpfile",
      quality: 1,
      format: "jpg",
    });

    const result = await Share.share({
      message: Platform.OS !== "ios" && "Share image from Quotella",
      url: imageURI,
    })
      .then((result) => {
        console.log("rizalt", result);
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

export const saveImage = async (ref) => {
  const imageURI = await captureRef(ref, {
    result: "tmpfile",
    quality: 1,
    format: "jpg",
  })
    .then((imageURI) => imageURI)
    .catch((error) => {
      console.log("image capture error", error);
    });

  const { status } = await MediaLibrary.requestPermissionsAsync();

  if (status === "granted") {
    try {
      await MediaLibrary.saveToLibraryAsync(imageURI);
      //Delete image from storage
      return true;
    } catch {
      return false;
    }
  } else {
    return false;
  }

  // try {
  //   // Request device storage access permission
  //   const { status } = await MediaLibrary.requestPermissionsAsync();
  //   if (status === "granted") {
  //     // Save image to media library
  //     await MediaLibrary.saveToLibraryAsync(imageURI);
  //     successCb();
  //     console.log("Image successfully saved");
  //   }
  // } catch (error) {
  //   console.log(error);
  //   failCb();
  // }
};

export const handleQuoteDownload = async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    await saveImage(
      quoteRef,
      () => showSuccessSnackbar(),
      () => showFailureSnackbar()
    );
  } catch (error) {
    console.error("Error during quote download:", error);
  }
};
