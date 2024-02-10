import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";

const QuoteItem = ({ item, onPress }) => {
  const { by, quote } = item;
  const { selectedBgImage } = useSelector((state) => state.quotes);

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View
        style={{
          margin: 3,
          flex: 1,
          borderRadius: 10,
          backgroundColor: "#000",
          padding: 15,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "Cabin",
          }}
          visible
        >
          {quote?.substring(0, 150)}...
        </Text>
        <Text
          style={{
            color: "#fff",
            fontStyle: "italic",
            fontWeight: "200",
            paddingTop: 5,
            fontSize: 12,
            textAlign: "left",
            fontFamily: "Cabin",
          }}
        >
          {by}
        </Text>
      </View>
      <Image
        source={selectedBgImage}
        style={{
          position: "absolute",
          opacity: 0.4,
          borderRadius: 10,
          top: 2,
          left: 2,
          width: "97%",
          height: "96%",
          zIndex: 1,
        }}
        contentFit="cover"
      />
    </Pressable>
  );
};

export default QuoteItem;
