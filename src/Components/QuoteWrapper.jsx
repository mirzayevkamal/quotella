import React from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import CarouselScreen from "./Carousel";

const QuoteWrapper = ({ allQuotes }) => {
  const [image, setImage] = React.useState(null);

 
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#292626",
        }}
      >
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          {allQuotes && <CarouselScreen data={allQuotes} />}
        </View>
      </View>
    </View>
  );
};

export default React.memo(QuoteWrapper);
