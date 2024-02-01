import { useEffect, useRef, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import QuoteItem from "../Components/QuoteItem";
import { IconButton, Text } from "react-native-paper";
import BottomSheet from "@devvie/bottom-sheet";
import QuoteWrapper from "../Components/QuoteWrapper";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const FavoritesScreen = () => {
  const likedQuotes = useSelector((state) => state.quotes.likedQuotes);
  const [selectedItem, setSelectedItem] = useState(null);
  const sheetRef = useRef(null);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isFocused) {
      sheetRef.current?.close();
    }
  }, [isFocused]);

  return (
    <>
      <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
        <Text
          variant="headlineLarge"
          style={{
            color: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 5,
            fontFamily: "Cabin",
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
          keyExtractor={(item) => item.ID || item.id}
        />
      </SafeAreaView>

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
    </>
  );
};

export default FavoritesScreen;
