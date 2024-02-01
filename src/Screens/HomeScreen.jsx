import React, { useEffect } from "react";
import QuoteWrapper from "../Components/QuoteWrapper";
import { getQuotesFromDb } from "../utils/db";
import { useDispatch, useSelector } from "react-redux";
import { setAllQuotes } from "../store/slices/quotesSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const allQuotes = useSelector((state) => state.quotes.allQuotes);

  const getDbData = async () => {
    const res = await getQuotesFromDb();

    if (allQuotes.length > 100) {
      dispatch(setAllQuotes(res));
    } else {
      dispatch(setAllQuotes([...allQuotes, ...res]));
    }
  };

  useEffect(() => {
    getDbData();
  }, []);

  
  return <QuoteWrapper loadCb={getDbData} allQuotes={allQuotes} />;
};

export default HomeScreen;
