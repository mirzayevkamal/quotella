import { FlatList, StyleSheet, View } from "react-native";
import BackgroundItem from "../Components/BackgroundItem";
import { Text } from "react-native-paper";
import { BackgroundList } from "../utils/constants";
import BgOverlaySlider from "../Components/BgOverlaySlider";

const BackgroundsScreen = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ color: "#fff" }} variant="titleSmall" >Background Overlay Opacity</Text>
      <BgOverlaySlider />
      <FlatList
        numColumns={3}
        data={BackgroundList}
        renderItem={({ item }) => <BackgroundItem item={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "red",
    width: "100%",
    height: "100%",
  },
});

export default BackgroundsScreen;
