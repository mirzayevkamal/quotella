import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ColorPicker from "react-native-wheel-color-picker";
import { setQuoteBgColor } from "../store/slices/quotesSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const BgColorPicker = ({ onPress }) => {
  const dispatch = useDispatch();
  const { quoteBgColor } = useSelector((state) => state.quotes);
  const [color, setColor] = useState(quoteBgColor);

  const onSelectColor = async () => {
    // do something with the selected color.
    dispatch(setQuoteBgColor(color));
    try {
      await AsyncStorage.setItem("quoteBgColor", color);
      console.log(`Color saved`);
    } catch (e) {
      // saving error
      console.log(`Color save error`);
    }
  };
  return (
    <View style={styles.container}>
      <ColorPicker
        color={quoteBgColor}
        swatchesOnly={false}
        onColorChangeComplete={setColor}
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={false}
        wheelLodingIndicator={<ActivityIndicator size={40} />}
        sliderLodingIndicator={<ActivityIndicator size={20} />}
        useNativeDriver={false}
        useNativeLayout={false}
      />
      <Button
        mode="contained"
        style={styles.closeBtn}
        onPress={() => {
          onSelectColor();
          onPress();
        }}
        textColor="#000"
        labelStyle={{ fontSize: 18 }}
      >
        Ok
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 400,
    marginTop: 10,
    marginBottom: 20,
  },
  colorPicker: {
    width: "auto",
    height: "auto",
  },
  panelOne: {
    width: "auto",
    height: 100,
  },
  closeBtn: {
    marginTop: 50,
    backgroundColor: "#fff",
  },
});

export default BgColorPicker;
