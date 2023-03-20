import React from "react";

import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { infoNotification } from "../services/notification";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const buttonDisabled = cartItems.length === 0 ? true : false;
  return (
    <Helmet title="Cart">
      <Container style={{ margin: "30px auto" }}>
        <Row>
          <Col
            lg="8"
            style={{ overflow: "auto", height: "500px" }}
            className="d-flex justify-content-center align-items-center"
          >
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
            <div className="mt-4 card-right-side mt-0">
              <h3 className="order-title">Order Summary</h3>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Subtotal:</h6>
                <span className="cart__subtotal">
                  <i class="fa-solid fa-turkish-lira-sign"></i>
                  {totalAmount}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Company:</h6>
                <span className="seller_company">
                  {cartItems[0]?.seller.name}
                </span>
              </div>
              <p>Taxes and shipping will calculate at checkout</p>
              <Link to="/checkout">
                <button disabled={buttonDisabled} className="addTOCart__btn">
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
};

const Tr = (props) => {
  const { id, image01, title, price, quantity, variation, seller } = props.item;
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
            seller: seller ? seller : null,
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
      <td className="text-center cart__item-del">
        <i class="fa-solid fa-xmark" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
