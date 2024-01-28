import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuoteWrapper from "../Components/QuoteWrapper";
import { openDatabaseLocal } from "../utils/db";
import { useSelector, useDispatch } from "react-redux";
import { setAllQuotes } from "../store/slices/quotesSlice";

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const allQuotes = useSelector((state) => state.quotes.allQuotes);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDbData = async () => {
      const dibi = await openDatabaseLocal(
        "https://github.com/mirzayevkamal/quotella/raw/main/assets/quotes/quote-2.db",
        "quotes.db"
      );
      await dibi.transaction((tx) => {
        tx.executeSql(
          "select * from quotes ORDER BY ID limit 100",
          [],
          (_, { rows: { _array } }) => {
            dispatch(setAllQuotes(_array));
          }
        );
      });
    };

    getDbData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <QuoteWrapper data={allQuotes} />
    </SafeAreaView>
  );
};

export default HomeScreen;
