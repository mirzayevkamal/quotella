import React from "react";
import { Button, ImageBackground, View } from "react-native";
import { openShareDialogAsync } from "../utils/share";
import { IconButton, MD3Colors } from "react-native-paper";

const QuoteWrapper = ({ children }) => {
  const quoteRef = React.useRef(null);

  const handleShare = async () => {
    console.log(quoteRef);
    await openShareDialogAsync(quoteRef);
  };

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 10,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          zIndex: 999,
        }}
      >
        <IconButton
          icon="bookmark"
          iconColor={MD3Colors.neutral99}
          size={20}
          onPress={handleShare}
          mode="contained"
          containerColor={"#292626"}
        />
        <IconButton
          icon="download"
          iconColor={MD3Colors.neutral99}
          size={20}
          onPress={handleShare}
          mode="contained"
          containerColor={"#292626"}
        />
      </View>
      <View
        ref={quoteRef}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ImageBackground
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.7,
          }}
          source={require("../../assets/bgs/bg-2.jpg")}
        />
        {children}
      </View>
    </View>
  );
};

export default QuoteWrapper;
