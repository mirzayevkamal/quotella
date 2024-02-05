import { Text, View } from "react-native";
import { useSelector } from "react-redux";

const QuoteText = ({ quote, author }) => {
  const selectedFonts = useSelector((state) => state.quotes.selectedFonts);
  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 23,
          padding: 20,
          lineHeight: 32,
          fontFamily: selectedFonts.quote,
          letterSpacing: 0.2,
        }}
      >
        “{quote}”
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: 14,
          fontWeight: "500",
          fontStyle: "italic",
          fontFamily: selectedFonts.author,
        }}
      >
        - {author}
      </Text>
    </View>
  );
};

export default QuoteText;
