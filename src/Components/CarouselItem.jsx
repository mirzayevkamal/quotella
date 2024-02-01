import React, { memo } from "react";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Dimensions } from "react-native";
import QuoteText from "./QuoteText";
import { useSelector, useDispatch } from "react-redux";
import { setLikedQuotes } from "../store/slices/quotesSlice";
import { IconButton, MD3Colors } from "react-native-paper";
import {
  addQuoteToDbAsObject,
  getLikedQuotes,
  removeLikedQuote,
} from "../utils/db";

const { width } = Dimensions.get("window");

const CarouselItem = ({ item, showActions }) => {
  const dispatch = useDispatch();
  const likedQuotes = useSelector((state) => state.quotes.likedQuotes);

  const handleGetLikedQuotes = async () => {
    const res = await getLikedQuotes();
    dispatch(setLikedQuotes(res));
  };

  const handleQuoteLike = async (quote) => {
    await addQuoteToDbAsObject(quote);
    await handleGetLikedQuotes();
  };

  const handleQuoteUnlike = async (quote) => {
    await removeLikedQuote(quote);
    await handleGetLikedQuotes();
  };

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideInDown}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: width,
        padding: 6,
      }}
    >
      <QuoteText quote={item.quote} author={item.by} />
      {showActions.actions && (
        <Animated.View
          entering={SlideInDown}
          style={{
            width: "100%",
            position: "absolute",
            bottom: 10,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            zIndex: 999,
          }}
        >
          <IconButton
            icon="heart"
            iconColor={
              likedQuotes?.filter((itm) => itm.quote === item.quote).length
                ? "red"
                : MD3Colors.neutral99
            }
            size={20}
            onPress={() => {
              if (
                likedQuotes?.filter((itm) => itm.quote === item.quote).length
              ) {
                handleQuoteUnlike(item);
              } else {
                handleQuoteLike(item);
              }
            }}
            mode="contained"
            containerColor={"#292626"}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default memo(CarouselItem);
