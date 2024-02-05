import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";

const FontItem = ({ font, isPremium, onPress, isSelected }) => {
  return (
    <Pressable style={[styles.container]} onPress={onPress}>
      <Text style={[styles.text, { fontFamily: font, color: "#fff" }]}>
        {font}
      </Text>
      {isPremium && (
        <Image
          cachePolicy={"disk"}
          style={styles.image}
          width={30}
          height={30}
          source={require("../../assets/premium-badge.png")}
        />
      )}
      <View style={styles.premium}></View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 60,
    justifyContent: "center",
    margin: 5,
    flex: 1,
  },
  text: {
    color: "#000",
    fontSize: 16,
    textAlign: "left",
    padding: 10,
    paddingRight: 30,
  },
  premium: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "gray",
    opacity: 0.12,
    width: "100%",
    borderRadius: 10,
    height: "100%",
  },
  image: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 7,
    top: 15,
    zIndex: 299,
  },
});

export default FontItem;
