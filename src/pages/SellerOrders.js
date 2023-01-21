import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOrderBySeller } from "../store/productSlices";
import styles from "./sellerOrder.module.css";
const SellerOrders = () => {
  const dispatch = useDispatch();

  const {
    isSuccessP,
    isErrorP,
    isLoadingP,
    sellerCategories,
    category,
    orders,
    product,
    messageP,
  } = useSelector((state) => state.product);
  let test = 1;
  useEffect(() => {
    dispatch(getOrderBySeller());
    console.log(orders, "orders");
  }, []);

  return (
    <>
      <div class="container">
        <h1>Orders</h1>
        <div class="title-underline"></div>
        <table>
          <thead>
            <tr>
              <th>Movie Name</th>
              <th>Date</th>
              <th>Prices</th>
              <th>Length</th>
              <th>Buy Ticket</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              <tr>
                <td>{order._id}</td>
                <td>01/08/2019</td>
                <td>10$</td>
                <td>2h 58m</td>
                <td>
                  <a href="#">Buy Now</a>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SellerOrders;
