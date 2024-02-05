import React from "react";
import { View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import CarouselScreen from "./Carousel";
import { useRoute } from "@react-navigation/native";

const QuoteWrapper = ({ allQuotes, navigation }) => {
  const [image, setImage] = React.useState(null);
  const route = useRoute();
  console.log("route", route);
  const carouselData = allQuotes || [route.params?.item];

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
          {carouselData && <CarouselScreen data={carouselData} />}
        </View>
      </View>
    </View>
  );
};

export default React.memo(QuoteWrapper);
