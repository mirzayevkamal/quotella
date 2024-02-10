import { FlatList, Pressable, StyleSheet, Touchable, View } from "react-native";
import { Fonts, FontsList } from "../utils/constants";
import FontItem from "./FontItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedFonts } from "../store/slices/quotesSlice";
import { useEffect, useState } from "react";
import { Divider, Text, SegmentedButtons } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";

const FontsCarousel = () => {
  const dispatch = useDispatch();
  const selectedFonts = useSelector((state) => state.quotes.selectedFonts);
  const [value, setValue] = useState("quote");

  const setSelectedFont = async (font) => {
    const selectedFontData =
      value === "author"
        ? {
            ...selectedFonts,
            author: font,
          }
        : {
            ...selectedFonts,
            quote: font,
          };

    dispatch(setSelectedFonts(selectedFontData));

    try {
      await AsyncStorage.setItem(
        "selectedFonts",
        JSON.stringify(selectedFontData)
      );
      console.log(`${selectedFontData ? "Author" : "Quote"} font saved`);
    } catch (e) {
      // saving error
      console.log(`${selectedFontData ? "Author" : "Quote"} font save error`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionWrapper}>
        <View style={styles.selectedFontWrapper}>
          <Text
            variant="titleSmall"
            style={{
              color: "#606060",
            }}
          >
            Quote's font
          </Text>
          <View style={styles.fontNameWrapper}>
            <EvilIcons
              name="check"
              size={24}
              color="#fff"
              style={{ paddingTop: 5 }}
            />
            <Text
              variant="titleSmall"
              style={{
                color: "#ececec",
                marginBottom: 5,
                marginTop: 10,
              }}
            >
              {selectedFonts.quote}
            </Text>
          </View>
        </View>
        <View style={styles.selectedFontWrapper}>
          <Text
            variant="titleSmall"
            style={{
              color: "#606060",
            }}
          >
            Author's font
          </Text>
          <View style={styles.fontNameWrapper}>
            <EvilIcons
              name="check"
              size={24}
              color="#fff"
              style={{ paddingTop: 5 }}
            />
            <Text
              variant="titleSmall"
              style={{
                color: "#ececec",
                marginBottom: 5,
                marginTop: 10,
              }}
            >
              {selectedFonts.author}
            </Text>
          </View>
        </View>
      </View>
      <Divider style={{ width: "100%", marginTop: 20 }} />
      <View
        style={{
          marginVertical: 20,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          variant="titleMedium"
          style={{
            color: "#fff",
          }}
        >
          Available fonts
        </Text>
        <View style={{ flex: 1, marginLeft: 50 }}>
          <SegmentedButtons
            value={value}
            density="medium"
            onValueChange={setValue}
            buttons={[
              {
                value: "quote",
                label: "Quote",
                style: {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: "#fff",
                  borderWidth: 0,
                },
                checkedColor: "#303030",
                showSelectedCheck: true,
              },
              {
                value: "author",
                label: "Author",
                checkedColor: "#303030",
                showSelectedCheck: true,
                style: {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderColor: "#fff",
                  borderWidth: 0,
                },
              },
            ]}
          />
        </View>
      </View>
      <FlatList
        style={{ height: 500 }}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        numColumns={2}
        data={FontsList}
        renderItem={({ item }) => (
          <FontItem
            onPress={() => setSelectedFont(item.name)}
            isPremium={item.isPremium}
            font={item.name}
            isSelected={
              value === "author"
                ? selectedFonts.author === item.name
                : selectedFonts.quote === item.name
            }
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  sectionWrapper: {
    padding: 10,
    backgroundColor: "#151515",
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: "row",
  },
  selectedFontWrapper: {
    flex: 1,
    margin: 2,
    alignItems: "flex-start",
  },
  fontNameWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FontsCarousel;
