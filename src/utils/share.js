import * as Sharing from "expo-sharing";
import { captureRef } from "react-native-view-shot";

export const openShareDialogAsync = async (ref) => {
  await new Promise((r) => setTimeout(r, 500)); // i.e. sleep

  if (!(await Sharing.isAvailableAsync())) {
    console.log("failed sharing");
    return;
  }

  const imageURI = await captureRef(ref, {
    result: "tmpfile",
    quality: 1,
    format: "png",
  });

  await Sharing.shareAsync(imageURI, { mimeType: "image/png" });
};
