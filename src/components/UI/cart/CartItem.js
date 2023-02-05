import React, { useEffect } from "react";
import { ListGroupItem } from "reactstrap";

import "../../../styles/cart-item.css";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { infoNotification } from "../../../services/notification";

const CartItem = ({ item }) => {
  const { id, title, price, image01, quantity, totalPrice, variation } = item;

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
        title,
        price,
        image01,
        variation,
      })
    );
  };
  useEffect(() => {
    console.log(variation);
  }, [variation]);

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={image01} alt="product-img" />
        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div className="w-100">
            <div className="d-flex align-items-center  justify-content-between w-100 mb-2">
              <h6 className="cart__product-title">{title}</h6>
              <p className=" d-flex align-items-center gap-5 cart__product-price m-0">
                <span>${totalPrice}</span>
              </p>
            </div>
            <div className="d-flex align-items-center  justify-content-between w-100 mb-2 mt-2">
              <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
                <span className="increase__btn" onClick={incrementItem}>
                  <i class="ri-add-line"></i>
                </span>
                <span className="quantity">{quantity}</span>
                <span className="decrease__btn" onClick={decreaseItem}>
                  <i class="ri-subtract-line"></i>
                </span>
              </div>
              {variation && (
                <div>
                  <span>
                    Size:
                    <strong style={{ color: "var(--primary-color)" }}>
                      {variation}
                    </strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          <span className="delete__btn" onClick={deleteItem}>
            <i class="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
