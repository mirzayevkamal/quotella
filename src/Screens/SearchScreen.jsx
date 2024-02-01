import React, { useEffect } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  View,
} from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import NoResult from "../Components/NoResult";
import QuoteItem from "../Components/QuoteItem";
import { Categories } from "../utils/constants";
import CategoryItem from "../Components/CategoryItem";
import { Text } from "react-native-paper";
import useDebounce from "../hooks/useDebounce";
import BottomSheet from "@devvie/bottom-sheet";
import { useIsFocused } from "@react-navigation/native";
import QuoteWrapper from "../Components/QuoteWrapper";

const db = SQLite.openDatabase("allquotes.db");

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [foundElements, setFoundElements] = React.useState([]);
  const [showNoQuoteFound, setShowNoQuoteFound] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const sheetRef = React.useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      sheetRef.current?.close();
    }
  }, [isFocused]);

  const searchItems = () => {
    if (searchQuery.length) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM allquotes WHERE by LIKE ? OR tags LIKE ?",
          [`%${searchQuery}%`, `%${searchQuery}%`],
          (tx, results) => {
            const len = results.rows.length;
            if (len > 0) {
              setFoundElements(results.rows._array);
            } else {
              console.log("No items found");
              setFoundElements([]);
              setShowNoQuoteFound(true);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      });
    }
  };

  const debouncedValue = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedValue.length) {
      searchItems();
    } else {
      setFoundElements([]);
      Keyboard.dismiss();
    }
  }, [debouncedValue]);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <View style={{ padding: 5 }}>
        <Text
          variant="headlineLarge"
          style={{
            color: "#fff",
            paddingVertical: 10,
            fontFamily: "Cabin",
          }}
        >
          Search a quote
        </Text>
        <Searchbar
          placeholder="Type an author, keyword or phrase"
          inputStyle={{ fontFamily: "Cabin" }}
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={searchItems}
          onClearIconPress={() => {
            setShowNoQuoteFound(false);
            setFoundElements([]);
          }}
        />
      </View>
      <View>
        {showNoQuoteFound && !foundElements.length && <NoResult />}
        {foundElements.length > 0 && (
          <FlatList
            data={foundElements}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 90 }}
            renderItem={({ item }) => (
              <QuoteItem
                item={item}
                onPress={() => {
                  setSelectedItem(item);
                  setTimeout(() => {
                    sheetRef.current?.open();
                  }, 200);
                }}
              />
            )}
            keyExtractor={(item) => item.ID}
          />
        )}

        {!showNoQuoteFound && foundElements.length < 1 && (
          <View style={{ paddingBottom: 140 }}>
            <Text
              variant="headlineLarge"
              style={{
                color: "#fff",
                paddingHorizontal: 5,
                paddingVertical: 10,
                fontFamily: "Cabin",
              }}
            >
              Popular categories
            </Text>
            <FlatList
              data={Categories}
              numColumns={2}
              contentContainerStyle={{ paddingBottom: 90 }}
              renderItem={({ item }) => (
                <CategoryItem
                  onPress={() => {
                    setSearchQuery(item.name);
                  }}
                  key={item.id}
                  item={item}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
      {selectedItem && (
        <BottomSheet
          animationType="fade"
          openDuration={300}
          closeDuration={300}
          customDragHandleComponent={() => (
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >
              <IconButton
                icon="close"
                iconColor="#fff"
                onPress={() => setSelectedItem(null)}
              />
            </View>
          )}
          height={"83%"}
          ref={sheetRef}
          style={{ backgroundColor: "rgb(15, 15, 15)" }}
        >
          <View style={{ width: "100%", height: "100%", marginBottom: -50 }}>
            <QuoteWrapper allQuotes={[selectedItem]} />
          </View>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
