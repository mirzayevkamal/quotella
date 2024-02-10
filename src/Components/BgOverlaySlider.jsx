import Slider from "@react-native-community/slider";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuoteBgOpacity } from "../store/slices/quotesSlice";

const BgOverlaySlider = () => {
  const { quoteBgOpacity } = useSelector((state) => state.quotes);
  const dispatch = useDispatch();

  const handleValueChange = (e) => {
    console.log(e);
    dispatch(setQuoteBgOpacity(e));
  };
  return (
    <Slider
      style={{ width: "100%", height: 40 }}
      minimumValue={0}
      maximumValue={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000"
      value={quoteBgOpacity}
      onValueChange={handleValueChange}
      step={0.1}
    />
  );
};

export default BgOverlaySlider;
