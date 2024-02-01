import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    height: "100%",
  },
  card: {
    backgroundColor: "red",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  quote: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  by: {
    fontSize: 12,
    color: "#ccc",
  },
});

export default styles;
