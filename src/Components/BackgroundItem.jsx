import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const BackgroundItem = ({ item }) => {
  const navigation = useNavigation();

  console.log("item", item);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("BackgroundImagesScreen", { name: item.name })
      }
      style={styles.container}
    >
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.overlay} />
      <Image style={styles.image} source={item.image} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 150,
    borderRadius: 10,
    margin: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#000",
    zIndex: 1,
    opacity: 0.3,
    width: "100%",
    borderRadius: 10,
    height: "100%",
  },
});

export default React.memo(BackgroundItem);
