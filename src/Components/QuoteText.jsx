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
          fontSize: 27,
          padding: 20,
          lineHeight: 32,
          fontFamily: selectedFonts.quote,
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
          fontFamily: selectedFonts.author,
        }}
      >
        - {author}
      </Text>
    </View>
  );
};

export default QuoteText;
