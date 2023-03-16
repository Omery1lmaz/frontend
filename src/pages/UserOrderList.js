import { Table, Row, Col, Container } from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import {
  deleteOrder,
  deleteProductById,
  getOrderBySeller,
  getProductsBySeller,
  updateOrderStatus,
} from "../store/productSlices";
import "../styles/user-order-list.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserOrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  let { orders } =
    useSelector((state) => state.product);
  const handleDelete = (id) => {
    dispatch(deleteOrder({ id }));
  };

  useEffect(() => {
    dispatch(getOrderBySeller());
  }, []);
  return (
    <>
      <Col className="d-flex justify-content-center align-items-center mt-5">
        <h4>Orders</h4>
      </Col>

      <Container style={{ margin: "30px auto" }}>
        {orders &&
          Array.isArray(orders) &&
          orders.map((item) => {
            const time = new Date(item.date);
            console.log(item.date, "item date");
            console.log(time, "time");
            return (
              <div className="order d-flex flex-column">
                <div className="order-properties d-flex flex-column">
                  <span>20 Nisan 2023</span>
                  <div className="d-flex justify-content-between">
                    <span>Toplam: {item.totalPrice}₺</span>
                    <div
                      className="d-flex justify-content-between align-items-center details order-link"
                      onClick={() => navigate(`/order-detail/${item._id}`)}
                    >
                      <span>Detaylar</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                  <span>Satıcı: {item.seller.name}</span>
                </div>
                <div className="order-status d-flex justify-content-between ">
                  <span>Order Status:</span>
                  <span>{item.isReady}</span>
                </div>
                <div className="order-products d-flex flex-wrap">
                  {Array.isArray(item.items) &&
                    item.items.map((product) => {
                      return (
                        <img className="product-img" src={product.image} />
                      );
                    })}
                </div>
              </div>
            );
          })}
      </Container>
    </>
  );
};

export default UserOrderList;
