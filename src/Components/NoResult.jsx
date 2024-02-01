import { Image, Text, View } from "react-native";

const NoResult = () => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 100 }}
    >
      <Image
        style={{ width: 200, height: 200, opacity: 0.5 }}
        source={require("../../assets/quotella.png")}
      />
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: 30,
          opacity: 0.5,
          fontFamily: "Cabin",
        }}
      >
        No quote found
      </Text>
    </View>
  );
};

export default NoResult;
