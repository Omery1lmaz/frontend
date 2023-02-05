import React from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { infoNotification } from "../services/notification";
const Cart = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Cart">
      <Container>
        <Row>
          <Col lg="8">
            {cartItems.length === 0 ? (
              <h5 className="text-center">Your cart is empty</h5>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <Tr item={item} key={item.id} />
                  ))}
                </tbody>
              </table>
            )}
          </Col>
          <Col lg="4">
            <div className="mt-4 card-right-side">
              <h3 className="order-title">Order Summary</h3>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Subtotal:</h6>
                <span className="cart__subtotal">{totalAmount}</span>
              </div>
              <p>Taxes and shipping will calculate at checkout</p>
              <button className="addTOCart__btn">
                <Link to="/checkout">Proceed to checkout</Link>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image01, title, price, quantity, variation } = props.item;
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const incrementItem = () => {
    user
      ? dispatch(
          cartActions.addItem({
            id,
            title,
            price,
            image01,
            variation,
          })
        )
      : infoNotification("Lütfen giriş yapınız");
  };

  const decreaseItem = () => {
    dispatch(
      cartActions.removeItem({
        id,
        title,
        price,
        image01,
        variation,
      })
    );
  };
  const deleteItem = () => {
    dispatch(
      cartActions.deleteItem({
        id,
        image01,
        title,
        price,
        quantity,
        variation,
      })
    );
  };
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={image01} alt="" />
        <span>{title}</span>
      </td>
      <td className="text-center">
        <span>${price}</span>
      </td>
      <td>
        <div
          className=" d-flex align-items-center justify-content-between increase__decrease-btn"
          style={{ background: "#EFEFEF" }}
        >
          <span className="increase__btn" onClick={incrementItem}>
            <i class="ri-add-line"></i>
          </span>
          <span className="quantity">{quantity}</span>
          <span className="decrease__btn" onClick={decreaseItem}>
            <i class="ri-subtract-line"></i>
          </span>
        </div>
      </td>
      {/* <td className="text-center">{quantity}</td> */}
      <td className="text-center cart__item-del">
        <i class="fa-solid fa-xmark" onClick={deleteItem}></i>
        {/* <i class="ri-delete-bin-line" onClick={deleteItem}></i> */}
      </td>
    </tr>
  );
};

export default Cart;
