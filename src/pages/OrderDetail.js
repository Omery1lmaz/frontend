import { Table, Row, Col, Container } from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import {
  deleteOrder,
  deleteProductById,
  getOrderById,
  getOrderBySeller,
  getProductsBySeller,
  updateOrderStatus,
} from "../store/productSlices";
import "../styles/order-detail.css";
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

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [selectedOrder, setSelectedOrder] = useState();
  let { order } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getOrderById({ id }));
  }, []);
  useEffect(() => {
    console.log(selectedOrder);
  }, [selectedOrder]);

  return (
    <>
      <Container style={{ marginTop: "30px" }}>
        {order && (
          <>
            <div className="order-detail d-flex flex-column">
              <p className="order-detail-title">Sipariş Detayı</p>
              <span>Sipariş Tarihi: 22 Ekim 2022</span>
              <span>Sipariş Durumu: {order.isReady}</span>
              <span>Sipariş Adresi: {order.shippingAddress.table}</span>
              <span>Satıcı: {order.seller.name}</span>
              <span>Toplam: {order.totalPrice}₺</span>
            </div>
            <div className="order-detail " style={{ marginTop: "30px" }}>
              <p className="product-name">Order Actions</p>
              <div className="d-flex justify-content-between">
                <button className="order-actions-btn">
                  <i className="fa-solid fa-xmark"></i>
                  <span className="ml-1"> Sipariş İptal</span>
                </button>
              </div>
            </div>
            <div
              className="order-detail d-flex flex-column"
              style={{ marginTop: "30px" }}
            >
              <p className="order-detail-title">Ürünler</p>
              {order.items.map((product) => (
                <div className="order-detail-product d-flex flex-wrap align-items-center">
                  <img src={product.image} className="product-img" />
                  <div className="product-details d-flex flex-column">
                    <span className="product-name">{product.name}</span>
                    <span>Price: {product.price}</span>
                    <span>Quantity: {product.qty}</span>
                    <span>Variation: M</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default OrderDetail;
