import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { blurhash } from "../utils/constants";

const CategoryItem = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.text}>{item.name}</Text>
        <Image
          placeholder={blurhash}
          cachePolicy={"disk"}
          source={item.image}
          style={{ width: 30, height: 30, borderRadius: 4 }}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flex: 1,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#292626",
    padding: 18,
  },
  text: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});

export default CategoryItem;
