import { Text } from "react-native";

const QuoteText = ({ quote }) => {
  return (
    <Text
      style={{
        textAlign: "center",
        color: "#fff",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        padding: 20,
      }}
    >
      “{quote}”
    </Text>
  );
};

export default QuoteText;
