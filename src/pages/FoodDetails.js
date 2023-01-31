import React, { useState, useEffect } from "react";

import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import { getProduct } from "../store/productSlices";

const FoodDetails = () => {
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message, product } = useSelector(
    (state) => state.product
  );
  const [size, setSize] = useState();
  const { name, defaultPrice, categories, description, image, variations } =
    product;
  const [price, setPrice] = useState(defaultPrice);
  // const relatedProduct = products.filter((item) => category === item.category);

  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id,
        title: name,
        price,
        image01: image,
        variation: size && size,
      })
    );
  };

  useEffect(() => {
    dispatch(getProduct({ id }));
    console.log(product, "product");
    // const test = document.getElementById("select-size").value;
    // console.log(test);
    if (variations && variations.length > 0) {
      console.log("price startks");
      console.log(variations[0].price, "variations default price");
    } else {
      console.log(product.variations, "product variations");
    }
  }, []);

  const handleChange = (event) => {
    const variation = variations.find((item) => item._id == event.target.value);
    if (variation) {
      setSize(variation.size);
      setPrice(variation.price);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  useEffect(() => {
    if (variations && variations.length > 0) {
      setPrice(variations[0].price);
      setSize(variations[0].size);
    }
  }, [variations]);

  return (
    <Helmet title="Product-details">
      <section>
        <Container>
          <Row>
            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={image} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{name}</h2>
                <p className="product__price">
                  Price: <span>${price}</span>
                </p>
                <p className="category mb-5">Category: Food</p>
                {Array.isArray(variations) &&
                variations &&
                variations.length > 1 ? (
                  <div>
                    <span className="size-span">Size: </span>
                    <select
                      id="select-size"
                      className="select"
                      onChange={handleChange}
                    >
                      {variations.map((item) => {
                        return (
                          <option key={item.id} value={item._id}>
                            {item.size}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : null}

                <button onClick={addItem} className="addTOCart__btn btn">
                  Add to Cart
                </button>
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={` ${tab === "rev" ? "tab__active" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Review
                </h6>
              </div>

              {tab === "desc" ? (
                <div className="tab__content">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="tab__form mb-3">
                  <div className="review pt-5">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>

                  <div className="review">
                    <p className="user__name mb-0">Jhon Doe</p>
                    <p className="user__email">jhon1@gmail.com</p>
                    <p className="feedback__text">great product</p>
                  </div>
                  <form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        onChange={(e) => setEnteredName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your email"
                        onChange={(e) => setEnteredEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="form__group">
                      <textarea
                        rows={5}
                        type="text"
                        placeholder="Write your review"
                        onChange={(e) => setReviewMsg(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="addTOCart__btn">
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </Col>

            <Col lg="12" className="mb-5 mt-4">
              <h2 className="related__Product-title">You might also like</h2>
            </Col>

            {/* {relatedProduct.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={item.id}>
                <ProductCard item={item} />
              </Col>
            ))} */}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
