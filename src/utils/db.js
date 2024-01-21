// db.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("quotes.db");

const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS quotes (id INTEGER PRIMARY KEY AUTOINCREMENT, by TEXT, quote TEXT, tags TEXT);",
      [],
      () => {
        console.log("Table created successfully");
      },
      (error) => {
        console.error("Error creating table: ", error);
      }
    );
  });
};

// db.js continued
const insertDataFromJson = (jsonData) => {
  db.transaction((tx) => {
    jsonData.forEach((item) => {
      tx.executeSql(
        "INSERT INTO quotes (by, quote, tags) VALUES (?, ?, ?);",
        [item.by, item.quote, item.tags],
        () => {
          console.log("Data inserted successfully");
        },
        (error) => {
          console.error("Error inserting data: ", error);
        }
      );
    });
  });
};

export { createTable, insertDataFromJson };
