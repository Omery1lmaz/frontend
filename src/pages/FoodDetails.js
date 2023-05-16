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

const RadioInputArray = ({
  variation,
  maxSelection,
  handlePromotionChange,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = variation.variation;
  const validationSchema = Yup.object().shape({
    selectedOptions: Yup.array()
      .min(1, "En az bir seçenek seçmelisiniz.")
      .max(maxSelection, `En fazla ${maxSelection} seçenek seçebilirsiniz.`)
      .required("En az bir seçenek seçmelisiniz."),
  });

  useEffect(() => {
    console.log(selectedOptions);
    console.log(options, "options");
    handlePromotionChange(selectedOptions, variation._id);
  }, [selectedOptions]);
  useEffect(() => {
    const filteredSelect = options.products.filter((o) => o.isSelected);
    console.log(filteredSelect, "filteredSelect");
    filteredSelect.map((p) => {
      console.log(p, "selected p");
      setSelectedOptions([
        ...selectedOptions,
        {
          name: p.name,
          price: p.price,
          _id: p._id,
        },
      ]);
    });
  }, []);

  const handleOptionChange = (event) => {
    const value = JSON.parse(event.target.value);

    if (
      selectedOptions.some((selectedOption) => selectedOption._id === value._id)
    ) {
      setSelectedOptions(
        selectedOptions.filter((option) => option._id !== value._id)
      );
    } else if (selectedOptions.length < maxSelection) {
      setSelectedOptions([...selectedOptions, value]);
    }
  };
  return (
    <div>
      {options.products.map((option, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={JSON.stringify({
              name: option.name,
              price: option.price,
              _id: option._id,
            })}
            checked={selectedOptions.some(
              (selectedOption) => selectedOption._id === option._id
            )}
            onChange={handleOptionChange}
            disabled={
              selectedOptions.length === maxSelection &&
              !selectedOptions.some(
                (selectedOption) => selectedOption._id === option._id
              )
            }
          />

          {option._id}
        </label>
      ))}
    </div>
  );
};

const SelectComponent = ({
  variation,
  maxSelection,
  handlePromotionChange,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const options = variation.variation;

  useEffect(() => {
    if (selectedOption) {
      handlePromotionChange(selectedOption, variation._id);
    }
  }, [selectedOption]);
  useEffect(() => {
    console.log(options, "options");
    const index = options.products.findIndex((o) => o.isSelected);
    if (index >= 0) {
      const v = options.products[index];
      console.log(v);
      setSelectedOption({
        name: v.name,
        price: v.price,
        _id: v._id,
      });
    }
    console.log(selectedOption, "selcted option");
  }, []);

  const handleOptionChange = (event) => {
    const value = JSON.parse(event.target.value);

    if (selectedOption && selectedOption._id === value._id) {
      setSelectedOption(null);
    } else {
      setSelectedOption(value);
    }
  };
  return (
    <div>
      <select
        value={selectedOption ? JSON.stringify(selectedOption) : ""}
        onChange={handleOptionChange}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.products.map((option, index) => (
          <option key={index} value={JSON.stringify(option)}>
            {option._id}
          </option>
        ))}
      </select>
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
    // if (variations && variations.length > 0) {
    //   console.log("price startks");
    //   console.log(variations[0].price, "variations default price");
    // } else {
    //   product.variations &&
    //     console.log(product.variations, "product variations");
    // }
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

  const options = ["Seçenek 1", "Seçenek 2", "Seçenek 3", "Seçenek 4"];
  const maxSelection = 2;
  const [test, setTest] = useState([]);
  useEffect(() => {
    console.log(typeof test);
    console.log(test);
  }, [test]);

  const handlePromotionChange = (value, _id) => {
    console.log(value, _id, "value _id");
    if (value.length === 0) {
      setTest(test.filter((item) => item._id !== _id));
    } else if (test.some((selectedOption) => selectedOption._id === _id)) {
      const copyArray = [...test];
      const index = copyArray.findIndex((item) => item._id === _id);
      if (index !== -1) {
        copyArray[index] = { _id: _id, products: value };
        setTest(copyArray);
      }
    } else {
      test.push({ _id: _id, products: value });
      setTest([...test]);
    }
  };

  return (
    <>
      <div>
        <h1>{product.name}</h1>
        {/* Diğer ürün özelliklerini göstermek */}
        <div>
          <h1>{product.name}</h1>
          {/* Diğer ürün özelliklerini göstermek */}
          {
            Array.isArray(product.promotions) &&
              product.promotions.length > 0 &&
              product.promotions?.map((v) => {
                return (
                  <>
                    <h2>Radio Input Array</h2>
                    {v.variation.maxValue > 1 ? (
                      <RadioInputArray
                        variation={v}
                        maxSelection={v.variation.maxValue}
                        handlePromotionChange={handlePromotionChange}
                      />
                    ) : (
                      <SelectComponent
                        variation={v}
                        maxSelection={v.variation.maxValue}
                        handlePromotionChange={handlePromotionChange}
                      />
                    )}
                  </>
                );
              })
            // <ProductPromotions
            //   promotion={product.promotions[0]} // İlk promosyonu gönderiyoruz
            //   handlePromotionChange={handlePromotionChange}
            //   maxSelection={2}
            // />
          }
        </div>

        {/* {Array.isArray(product.promotions) &&
          product.promotions.length > 0 &&
          product.promotions.map((v) => {
            console.log(v, "v");
            return (
              <div>Test</div>
              // <ProductPromotions
              //   product={product}
              //   handlePromotionChange={handlePromotionChange}
              //   maxSelection={2}
              // />
            );
          })} */}
      </div>

      {/* /*{isLoadingP ? (
        <PageSpinner />
      ) : ( */}
      {/* <Helmet title="Product-details">
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
      {/* {Array.isArray(variations) &&
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
      </Helmet>  */}
      {/* )} */}
    </>
  );
};

export default FoodDetails;
