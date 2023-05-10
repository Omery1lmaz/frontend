import React, { useState, useEffect } from "react";

import products from "../assets/fake-data/products";
import { useParams } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";
import { useFormik } from "formik";
import * as Yup from "yup";

import ProductCard from "../components/UI/product-card/ProductCard";
import { getProduct } from "../store/productSlices";
import { infoNotification } from "../services/notification";
import PageSpinner from "../components/UI/spinners/pageSpinner";

const checkboxValues = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
];
const maxSelection = 3;

const ProductPromotions = ({
  product,
  handlePromotionChange,
  maxSelection,
}) => {
  const { promotions } = product;
  const [selectedCount, setSelectedCount] = useState(0);

  const handleCheckboxChange = (promotionId, productId) => {
    const selectedPromotions = promotions.filter((promotion) => {
      return promotion.variation.products.some((product) => product.isSelected);
    });
    const totalSelected = selectedPromotions.length;

    if (
      totalSelected >= maxSelection &&
      !promotions
        .find((promotion) => promotion._id === promotionId)
        .variation.products.find((product) => product._id === productId)
        .isSelected
    ) {
      // Maksimum seçim sayısına ulaşıldı ve bu checkbox seçilmek isteniyor
      return;
    }

    handlePromotionChange(promotionId, productId);

    setSelectedCount((prevCount) =>
      promotions
        .find((promotion) => promotion._id === promotionId)
        .variation.products.find((product) => product._id === productId)
        .isSelected
        ? prevCount + 1
        : prevCount - 1
    );
  };

  return (
    <div>
      {promotions.map((promotion) => (
        <div key={promotion._id}>
          <h3>{promotion.variation.name}</h3>
          {promotion.variation.products.map((product) => (
            <label key={product._id}>
              <input
                type="checkbox"
                name={`promotion-${promotion._id}`}
                value={product._id}
                // checked={product.isSelected}
                onChange={() =>
                  handleCheckboxChange(promotion._id, product._id)
                }
                disabled={!product.isSelected && selectedCount >= maxSelection}
              />
              {product.name}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

const validationSchema = Yup.object().shape({
  selectedItems: Yup.array()
    .min(1, "Select at least one item")
    .max(maxSelection, `Select up to ${maxSelection} items`),
});

const FoodDetails = () => {
  const [tab, setTab] = useState("desc");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoadingP, product } = useSelector((state) => state.product);
  const [name, setName] = useState();
  const [defaultPrice, setDefaultPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [variations, setVariations] = useState("");
  const [promotions, setPromotions] = useState([1, 2, 3]);
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
      setPromotions(product.promotions);
    }
  }, [product]);

  useEffect(() => {
    dispatch(getProduct({ id }));
    console.log(product, "product");
    if (variations && variations.length > 0) {
      console.log("price startks");
      console.log(variations[0].price, "variations default price");
    } else {
      product.variations &&
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
  useEffect(() => {
    if (variations && variations.length > 0) {
      setPrice(variations[0].price);
      setSize(variations[0].size);
    }
  }, [variations]);

  const formik = useFormik({
    initialValues: {
      selectedItems: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values.selectedItems);
    },
  });

  const handleCheckboxChange = (e) => {
    const selectedValue = e.target.value;
    const selectedIndex = formik.values.selectedItems.indexOf(selectedValue);

    if (selectedIndex === -1) {
      // Checkbox is selected
      formik.setFieldValue("selectedItems", [
        ...formik.values.selectedItems,
        selectedValue,
      ]);
    } else {
      // Checkbox is deselected
      formik.setFieldValue(
        "selectedItems",
        formik.values.selectedItems.filter((item) => item !== selectedValue)
      );
    }
  };
  const disabledItems =
    formik.values.selectedItems.length === maxSelection
      ? checkboxValues.filter(
          (value) => !formik.values.selectedItems.includes(value)
        )
      : [];
  const handlePromotionChange = (promotionId, productId) => {
    // Promotion ve product ID'lerini kullanarak gerekli işlemleri yapabilirsiniz
    console.log(`Promotion ID: ${promotionId}, Product ID: ${productId}`);
  };
  return (
    <>
      <div>
        <h1>{product.name}</h1>
        {/* Diğer ürün özelliklerini göstermek */}
        {Array.isArray(product.promotions) && product.promotions.length > 0 && (
          <ProductPromotions
            product={product}
            handlePromotionChange={handlePromotionChange}
            maxSelection={2}
          />
        )}
      </div>

      {/* /*{isLoadingP ? (
        <PageSpinner />
      ) : ( */}
      <Helmet title="Product-details">
        <section>
          <Container>
            <Row>
              <Col lg="4" md="4">
                <div className="product__main-img">
                  <img src={image} alt="" className="w-100" />
                </div>
                <div></div>
              </Col>

              <Col lg="6" md="6">
                <div className="single__product-content">
                  <h2 className="product__title mb-3">{name}</h2>
                  <span>{`seller: ${user?.name}`}</span>
                  <p className="product__price">
                    <i class="fa-solid fa-turkish-lira-sign"></i>
                    <span>{price}</span>
                  </p>
                  {
                    <div>
                      <form onSubmit={formik.handleSubmit}>
                        {Array.isArray(product.promotions) &&
                          product.promotions.length > 0 &&
                          product.promotions.map((promotion) => {
                            if (promotion.variation.maxValue >= 1) {
                              return (
                                <div>
                                  {promotion.variation.products.map(
                                    (product) => {
                                      return (
                                        <label key={product.name}>
                                          <input
                                            type="checkbox"
                                            name="selectedItems"
                                            value={product.name}
                                            checked={formik.values.selectedItems.includes(
                                              product.name
                                            )}
                                            onChange={handleCheckboxChange}
                                            disabled={disabledItems.includes(
                                              product.name
                                            )}
                                          />
                                          {product.name}
                                        </label>
                                      );
                                    }
                                  )}
                                </div>
                              );
                            }
                          })}
                      </form>
                    </div>
                  }
                  {/* <form onSubmit={formik.handleSubmit}>
                      {product.promotions.map((promotion) => (
                        <label key={value}>
                          <input
                            type="checkbox"
                            name="selectedItems"
                            value={value}
                            checked={formik.values.selectedItems.includes(
                              value
                            )}
                            onChange={handleCheckboxChange}
                            disabled={disabledItems.includes(value)}
                          />
                          {value}
                        </label>
                      ))}
                      {formik.touched.selectedItems &&
                      formik.errors.selectedItems ? (
                        <div>{formik.errors.selectedItems}</div>
                      ) : null}
                      <button type="submit">Submit</button>
                    </form>
 */}
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
                <div></div>
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
      {/* )} */}
    </>
  );
};

export default FoodDetails;
