import { Text, View } from "react-native";

const QuoteText = ({ quote, author }) => {
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 27,
          padding: 20,
          fontWeight: "500",
          lineHeight: 32,
        }}
      >
        “{quote}”
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: 17,
          fontWeight: "500",
          fontStyle: "italic",
        }}
      >
        - {author}
      </Text>
    </View>
  );
};

export default QuoteText;
