import { Image, Pressable, View } from "react-native";

const CategoryItem = ({ item, onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <View
        style={{
          margin: 4,
          flex: 1,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Image
          source={item.image}
          style={{ width: "100%", height: 100, borderRadius: 4 }}
        />
      </View>
    </Pressable>
  );
};

export default CategoryItem;
