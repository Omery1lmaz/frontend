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
import { infoNotification } from "../services/notification";

const FoodDetails = () => {
  const [tab, setTab] = useState("desc");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message, product } = useSelector(
    (state) => state.product
  );
  const [name, setName] = useState();
  const [defaultPrice, setDefaultPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [variations, setVariations] = useState("");
  const [user, setUser] = useState("");

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const [size, setSize] = useState();

  const [price, setPrice] = useState(defaultPrice);

  const addItem = () => {
    console.log(currentUser, "user test deneme ");
    currentUser
      ? dispatch(
          cartActions.addItem({
            id,
            title: name,
            price,
            image01: image,
            variation: size ? size : null,
            seller: {
              name: user?.name,
              id: user?._id,
              isTakeAway: user?.isTakeAway,
            },
          })
        )
      : infoNotification("lütfen önce giriş yapınız");
  };
  useEffect(() => {
    if (product && !name) {
      setName(product.name);
      setDefaultPrice(product.defaultPrice);
      setCategories(product.categories);
      setDescription(product.description);
      setImage(product.image);
      setVariations(product.variations);
      setUser(product.user);
      setPrice(product.defaultPrice);
    }
  }, [product]);

  useEffect(() => {
    dispatch(getProduct({ id }));
    console.log(product, "product");
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
                <span>{`seller: ${user?.name}`}</span>
                <p className="product__price">
                  <i class="fa-solid fa-turkish-lira-sign"></i>
                  <span>{price}</span>
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
              </div>
              {tab === "desc" && (
                <div className="tab__content">
                  <p>{description}</p>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
