import { useTheme } from "@react-navigation/native";
import React from "react";
import { Button, Image, SafeAreaView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuoteText from "../Components/QuoteText";
import QuoteWrapper from "../Components/QuoteWrapper";
import { Searchbar } from "react-native-paper";
import {
  createTable,
  insertDataFromJson,
  openDatabaseLocal,
} from "../utils/db";
import * as SQLite from "expo-sqlite";

// const db = SQLite.openDatabase('https://github.com/mirzayevkamal/quotella/raw/main/assets/quotes/datalarim.db');

const getDbData = async () => {
  const dibi = await openDatabaseLocal(
    "https://github.com/mirzayevkamal/quotella/raw/main/assets/quotes/datalarim.db"
  );

  await dibi.transaction((tx) => {
    tx.executeSql("select 100 from quotes", [], (_, { rows: { _array } }) => {
      console.log("erey", _array);
    });
  });
};

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = React.useState("");
  getDbData();
  // React.useEffect(() => {
  //   // Initialize the database and create the table
  //   createTable();

  //   // Insert data from the JSON file into the SQLite database
  //   insertDataFromJson(myQuotes);
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: insets.top }}>
      <View style={{ padding: 5 }}>
        <Searchbar
          placeholder="Search a quote"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <QuoteWrapper>
        {/* <Image
          style={{ alignSelf: "center", width: 170, height: 80 }}
          width={150}
          height={40}
          source={require("../../assets/icon.png")}
        /> */}
        <QuoteText quote="The greatest glory in living lies not in never falling, but in rising every time we fall." />
      </QuoteWrapper>
    </SafeAreaView>
  );
};

export default HomeScreen;
