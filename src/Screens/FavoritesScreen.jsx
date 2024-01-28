import { useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import QuoteItem from "../Components/QuoteItem";
import { Text } from "react-native-paper";
import BottomSheet from "@devvie/bottom-sheet";
import QuoteWrapper from "../Components/QuoteWrapper";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

const FavoritesScreen = () => {
  const likedQuotes = useSelector((state) => state.quotes.likedQuotes);
  const [selectedItem, setSelectedItem] = useState(null);
  const sheetRef = useRef(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      sheetRef.current?.close();
    }
  }, [isFocused]);

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          variant="headlineLarge"
          style={{
            color: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 5,
            fontWeight: "600",
          }}
        >
          Favorites
        </Text>
        <FlatList
          data={likedQuotes}
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
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      {selectedItem && (
        <BottomSheet
          animationType="fade"
          openDuration={300}
          closeDuration={300}
          height={"83%"}
          ref={sheetRef}
          style={{ backgroundColor: "rgb(15, 15, 15)" }}
        >
          <View style={{ width: "100%", height: "100%", marginBottom: -40 }}>
            <QuoteWrapper data={[selectedItem]} />
          </View>
        </BottomSheet>
      )}
    </>
  );
};

export default FavoritesScreen;
