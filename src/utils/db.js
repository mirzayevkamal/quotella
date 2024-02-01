import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";
import { Asset } from "expo-asset";

const db = SQLite.openDatabase("allquotes.db");

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

const downloadFile = async (uri, destination) => {
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    console.log(`Download Progress: ${progress * 100}%`);
  };

  try {
    const downloadResumable = FileSystem.createDownloadResumable(
      uri,
      destination,
      {},
      callback
    );

    const { uri: localUri } = await downloadResumable.downloadAsync();

    console.log("Download complete. Local URI: ", localUri);

    // Your further processing logic here...
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

async function openDatabaseLocal(pathToDatabaseFile, dbName) {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    console.log("Creating directory");
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
    console.log("Directory created successfully");
  }
  if (
    !(
      await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + `SQLite/${dbName}`
      )
    ).exists
  ) {
    console.log("Directory exists but need to download file");

    await downloadFile(
      pathToDatabaseFile,
      FileSystem.documentDirectory + `SQLite/${dbName}`
    );

    // await FileSystem.downloadAsync(
    //   pathToDatabaseFile,
    //   FileSystem.documentDirectory + `SQLite/${dbName}`
    // );
    console.log("Directory Success");

    return SQLite.openDatabase(dbName);
  } else {
    console.log("Directory already exists");
    return SQLite.openDatabase(dbName);
  }
}

const createANewDb = (dbName) => {
  const db = SQLite.openDatabase(`${dbName}.db`);
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${dbName} (id INTEGER PRIMARY KEY AUTOINCREMENT, by TEXT, quote TEXT, tags TEXT);`,
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

const doesDatabaseExist = async (dbName) => {
  const db = SQLite.openDatabase(`${dbName}.db`);

  return new Promise((resolve) => {
    db.transaction((tx) => {
      // Use PRAGMA statement to check if the table exists
      tx.executeSql(
        `PRAGMA table_info(${dbName})`,
        [],
        (_, result) => {
          // If there are columns, the table exists
          resolve(result.rows.length > 0);
        },
        (_, error) => {
          // If an error occurs, the table does not exist
          resolve(false);
        }
      );
    });
  });
};

const addQuoteToDbAsObject = async (data) => {
  const resi = await doesDatabaseExist("liked_quotes.db");

  if (!resi) {
    createANewDb("liked_quotes");
    addToLikedQuotes(data);
  } else {
    addToLikedQuotes(data);
  }
};

const addToLikedQuotes = (data) => {
  const likedQuotesDb = SQLite.openDatabase("liked_quotes.db");

  likedQuotesDb.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO liked_quotes (by, quote, tags) VALUES (?, ?, ?)",
      [data.by, data.quote, data.tags],
      () => {
        console.log("Data inserted successfully");
      },
      (error) => {
        console.error("Error inserting data: ", error);
      }
    );
  });
};

const getLikedQuotes = () => {
  const likedQuotesDb = SQLite.openDatabase("liked_quotes.db");

  return new Promise((resolve) => {
    likedQuotesDb.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM liked_quotes",
        [],
        (_, { rows: { _array } }) => {
          console.log("Lenting", _array.length);
          resolve(_array);
        },
        (error) => {
          resolve([]);
        }
      );
    });
  });
};

const removeLikedQuote = (quote) => {
  const likedQuotesDb = SQLite.openDatabase("liked_quotes.db");

  return new Promise((resolve) => {
    likedQuotesDb.transaction((tx) => {
      // Use SQL DELETE statement to remove the item by id
      tx.executeSql(
        "DELETE FROM liked_quotes WHERE quote = ?",
        [quote.quote],
        (_, result) => {
          console.log("rizalt", result);
          if (result.rowsAffected > 0) {
            console.log("Item removed successfully");
            resolve(true);
          } else {
            console.log("Item not found");
            resolve(false);
          }
        },
        (_, error) => {
          console.error("Error removing item:", error);
          resolve(false);
        }
      );
    });
  });
};

const getQuotesFromDb = async () => {
  console.log("gettling quotes from db");
  const dibi = await openDatabaseLocal(
    "https://github.com/mirzayevkamal/quotella/raw/main/assets/quotes/allquotes.db",
    "allquotes.db"
  );

  return new Promise((resolve) => {
    dibi.transaction((tx) => {
      tx.executeSql(
        "select * from allquotes WHERE LENGTH(quote) < 350 ORDER BY RANDOM() limit 10",
        [],
        (_, { rows: { _array } }) => {
          resolve(_array);
        }
      );
    });
  });
};

export {
  createTable,
  insertDataFromJson,
  openDatabaseLocal,
  addQuoteToDbAsObject,
  getLikedQuotes,
  removeLikedQuote,
  getQuotesFromDb,
};
