import React, { useEffect } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  SafeAreaView,
  View,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SQLite from "expo-sqlite";
import NoResult from "../Components/NoResult";
import QuoteItem from "../Components/QuoteItem";
import { Categories } from "../utils/constants";
import CategoryItem from "../Components/CategoryItem";
import { Text } from "react-native-paper";
import useDebounce from "../hooks/useDebounce";

const db = SQLite.openDatabase("quotes.db");

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [foundElements, setFoundElements] = React.useState([]);
  const [showNoQuoteFound, setShowNoQuoteFound] = React.useState(false);

  const searchItems = () => {
    if (searchQuery.length) {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM quotes WHERE by LIKE ? OR tags LIKE ?",
          [`%${searchQuery}%`, `%${searchQuery}%`],
          (tx, results) => {
            const len = results.rows.length;
            if (len > 0) {
              setFoundElements(results.rows._array);
              Keyboard.dismiss();
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 5 }}>
        <Text
          variant="headlineLarge"
          style={{
            color: "#fff",
            paddingVertical: 10,
            fontWeight: "600",
          }}
        >
          Search a quote
        </Text>
        <Searchbar
          placeholder="Type an author, keyword or phrase"
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
              <QuoteItem item={item} onPress={() => {}} />
            )}
            keyExtractor={(item) => item.id}
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
                fontWeight: "600",
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
    </SafeAreaView>
  );
};

export default SearchScreen;
