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
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flex: 1, margin: 2 }}>
          <Text
            variant="titleSmall"
            style={{
              color: "#606060",
              marginTop: 10,
            }}
          >
            Quote's font
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
        <View style={{ flex: 1, margin: 2, alignItems: "center" }}>
          <Text
            variant="titleSmall"
            style={{
              color: "#606060",
              marginTop: 10,
            }}
          >
            Author's font
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          flexDirection: "row",
        }}
      >
        <View>
          <Text
            variant="titleLarge"
            style={{
              color: "#fff",
            }}
          >
            Available fonts
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 40, marginRight: 10 }}>
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
    margin: 5,
    width: "100%",
    height: "100%",
    paddingBottom: 20,
  },
});

export default FontsCarousel;
