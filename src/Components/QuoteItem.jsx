import { Pressable, Text, View } from "react-native";

const QuoteItem = ({ item, onPress }) => {
  const { by, quote } = item;

  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View
        style={{
          margin: 3,
          flex: 1,
          borderRadius: 10,
          backgroundColor: "#292626",
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
    </Pressable>
  );
};

export default QuoteItem;
