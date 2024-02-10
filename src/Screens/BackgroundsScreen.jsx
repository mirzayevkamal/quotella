import { FlatList, StyleSheet, View } from "react-native";
import BackgroundItem from "../Components/BackgroundItem";
import { Button, Modal, Portal, Text } from "react-native-paper";
import { BackgroundList } from "../utils/constants";
import BgOverlaySlider from "../Components/BgOverlaySlider";
import BgColorPicker from "../Components/BgColorPicker";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BackgroundsScreen = () => {
  const { quoteBgColor } = useSelector((state) => state.quotes);
  const [isModalVisibe, setIsModalVisibe] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
        <View style={styles.sectionWrapper}>
          <Text
            style={{ color: "#fff", marginBottom: 10 }}
            variant="titleMedium"
          >
            Background Color Picker
          </Text>
          <View style={styles.colorBtnWrapper}>
            <Text style={styles.colorBtnText}>Selected color:</Text>
            <Button
              style={{
                backgroundColor: quoteBgColor,
                borderRadius: 6,
                borderColor: "#fff",
                borderWidth: 3,
                height: 30,
              }}
              onPress={() => {
                setIsModalVisibe(true);
              }}
              textColor="#fff"
              labelStyle={{ fontSize: 16 }}
            />
          </View>
        </View>
        <Portal>
          <Modal
            onDismiss={() => setIsModalVisibe(false)}
            visible={isModalVisibe}
            style={[styles.modal, { marginTop: insets.top + 44 }]}
          >
            <BgColorPicker onPress={() => setIsModalVisibe(false)} />
          </Modal>
        </Portal>
        <View style={styles.sectionWrapper}>
          <Text style={{ color: "#fff" }} variant="titleMedium">
            Background Overlay Opacity
          </Text>
          <BgOverlaySlider />
        </View>
      </View>
      <View style={styles.bgImagesWrapper}>
        <Text style={{ color: "#fff", marginBottom: 10 }} variant="titleMedium">
          Background Images
        </Text>
        <FlatList
          numColumns={3}
          showsVerticalScrollIndicator={false}
          scrollEnabled
          data={BackgroundList}
          renderItem={({ item }) => <BackgroundItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    width: "100%",
    padding: 30,
  },

  colorBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorBtnText: {
    color: "#909090",
    marginRight: 15,
  },
  sectionWrapper: {
    padding: 10,
    backgroundColor: "#151515",
    borderRadius: 20,
    marginBottom: 10,
    height: "auto",
  },
  bgImagesWrapper: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "#151515",
    borderRadius: 20,
    maxHeight: 450,
    paddingBottom: 20,
  },
});

export default BackgroundsScreen;
