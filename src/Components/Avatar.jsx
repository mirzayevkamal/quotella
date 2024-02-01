import { Image, View } from "react-native";
import { Avatar } from "react-native-paper";

const SettingsAvatar = () => {
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", margin: 20 }}
    >
      <Avatar.Image
        size={100}
        style={{
          backgroundColor: "#303030",
          borderColor: "#FCC908",
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={require("../../assets/logo-premium.png")}
      />
    </View>
  );
};

export default SettingsAvatar;
