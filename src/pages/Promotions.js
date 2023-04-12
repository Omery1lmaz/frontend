import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPromotionsBySeller } from "../store/productSlices";

const Promotions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromotionsBySeller());
  }, []);

  return <div>Promotions</div>;
};

export default Promotions;
