import { useState } from "react";
import { addQuoteToDbAsObject, getLikedQuotes } from "../utils/db";

const useQuote = (quote) => {
  const [targetQuote, setTargetQuote] = useState(quote);

  const getAllLikedQuotes = async () => {
    const res = await getLikedQuotes();
    dispatch(setLikedQuotes(res));
  };

  const unlikeQuote = async () => {
    await addQuoteToDbAsObject(targetQuote);
    await getAllLikedQuotes();
  };

  const likeQuote = async () => {
    await removeLikedQuote(targetQuote);
    await getAllLikedQuotes();
  };

  return { likeQuote, unlikeQuote };
};

export default useQuote;
