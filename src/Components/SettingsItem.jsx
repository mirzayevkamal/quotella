import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";

const SettingsItem = ({ title, onPress, icon, isFirst, isLast }) => {
  return (
    <TouchableRipple
      style={[
        styles.container,
        isFirst && styles.firstItem,
        isLast && styles.lastItem,
      ]}
      onPress={onPress}
      rippleColor={"rgba(0, 0, 0, .32)"}
    >
      <>
        <View style={styles.wrapper}>
          {icon}
          <Text style={styles.text}>{title}</Text>
        </View>
        <Entypo name="chevron-small-right" size={24} color="#fff" />
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#303030",
    margin: 1,
  },
  wrapper: { flexDirection: "row", alignItems: "center" },
  text: {
    fontSize: 17,
    color: "#fff",
    marginLeft: 15,
  },
  firstItem: {
    borderRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  lastItem: {
    borderRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});

export default SettingsItem;
