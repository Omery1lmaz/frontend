import React, { useEffect } from "react";
import { ListGroupItem } from "reactstrap";
import ShowMoreText from "react-show-more-text";

import "../../../styles/cart-item.css";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { infoNotification } from "../../../services/notification";
import { Forward10Rounded } from "@mui/icons-material";
const CartItem = ({ item }) => {
  const {
    id,
    title,
    price,
    image01,
    quantity,
    totalPrice,
    variation,
    promotion,
    seller,
  } = item;

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
            seller,
            promotion,
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
        promotion,
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
        promotion,
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
              {Array.isArray(promotion) && (
                <>
                  <span>Promotions</span>
                  <ShowMoreText
                    /* Default options */
                    lines={1}
                    more={<Forward10Rounded />}
                    // more="Show More"
                    less="Show less"
                    className="content-css"
                    anchorClass="show-more-less-clickable"
                    // onClick={this.executeOnClick}
                    expanded={false}
                    truncatedEndingComponent={"... "}
                  >
                    {promotion.map((p) => {
                      return p.products.map((product) => (
                        <span>{product.name} </span>
                      ));
                    })}
                  </ShowMoreText>
                </>
              )}
              {Array.isArray(variation) && variation.length >= 0 && (
                <ShowMoreText
                  Default
                  options
                  lines={1}
                  more={<Forward10Rounded />}
                  // more="Show More"
                  less="Show less"
                  className="content-css"
                  anchorClass="show-more-less-clickable"
                  // onClick={this.executeOnClick}
                  expanded={false}
                  truncatedEndingComponent={"... "}
                >
                  <span className="text-sm font-medium">Variations: </span>
                  {variation.map((i) => (
                    <span>{`${i.product.name} `}</span>
                  ))}
                </ShowMoreText>
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
