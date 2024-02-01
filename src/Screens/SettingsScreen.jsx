import React from "react";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import FontsCarousel from "../Components/Fonts";
import { Appbar } from "react-native-paper";
import { View } from "react-native";
import SettingsItem from "../Components/SettingsItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SettingsAvatar from "../Components/Avatar";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const settingsMenu = [
  {
    id: "1",
    title: "Font",
    icon: (
      <MaterialCommunityIcons name="palette-outline" size={24} color="#fff" />
    ),
    onPress: () => {},
    link: "Fonts",
  },
  {
    id: "2",
    title: "Backgrounds",
    icon: <Ionicons name="image-outline" size={24} color="#fff" />,
    onPress: () => {},
  },
  {
    id: "3",
    title: "Notifications",
    icon: <MaterialIcons name="notifications-none" size={24} color="#fff" />,
    onPress: () => {},
  },
];

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <SettingsAvatar />

      <View style={{ margin: 10 }}>
        {settingsMenu.map((item, index) => {
          return (
            <SettingsItem
              link={item.link}
              key={item.id}
              title={item.title}
              icon={item.icon}
              onPress={() => navigation.navigate(item.link)}
              isFirst={index === 0}
              isLast={index === settingsMenu.length - 1}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SettingsScreen;
