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
    handlePromotionChange(selectedOptions, variation._id);
  }, [selectedOptions]);
  useEffect(() => {
    const filteredSelect = options.products.filter((o) => o.isSelected);
    filteredSelect.map((p) => {
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
    if (event.target.value == "no-promotion") {
      setSelectedOptions([]);
    } else {
      const value = JSON.parse(event.target.value);

      if (
        selectedOptions.some(
          (selectedOption) => selectedOption._id === value._id
        ) &&
        selectedOptions.length <= 1
      ) {
        return null;
      } else {
        if (
          selectedOptions.some(
            (selectedOption) => selectedOption._id === value._id
          )
        ) {
          setSelectedOptions(
            selectedOptions.filter((option) => option._id !== value._id)
          );
        } else if (selectedOptions.length < maxSelection) {
          setSelectedOptions([...selectedOptions, value]);
        }
      }
    }
  };
  return (
    <div>
      {!options.iscompulsory && (
        <label key={"no-promotion"}>
          <input
            type="checkbox"
            value={"no-promotion"}
            checked={selectedOptions.length == 0}
            onChange={handleOptionChange}
            disabled={selectedOptions.length === maxSelection}
          />
          {"Promosyon İstemiyorum"}
        </label>
      )}
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
          {option.name}
        </label>
      ))}
    </div>
  );
};

const SelectComponent = ({ variation, secondId, handlePromotionChange }) => {
  const [selectedOption, setSelectedOption] = useState();
  const options = variation.variation;

  useEffect(() => {
    handlePromotionChange(
      selectedOption == null ? [] : [selectedOption],
      variation._id,
      secondId
    );
  }, [selectedOption]);
  useEffect(() => {
    const index = options.products.findIndex((o) => o.isSelected);
    if (index >= 0) {
      const v = options.products[index];
      setSelectedOption({
        name: v.name,
        price: v.price,
        _id: v._id,
      });
    }
  }, []);

  const handleOptionChange = (event) => {
    if (event.target.value == "") {
      setSelectedOption();
    } else {
      const value = JSON.parse(event.target.value);
      setSelectedOption(value);
    }
  };
  return (
    <div>
      <h4>{variation._id}</h4>
      <select
        value={selectedOption ? JSON.stringify(selectedOption) : ""}
        onChange={handleOptionChange}
        defaultValue={
          selectedOption && {
            name: selectedOption.name,
            price: selectedOption.price,
            _id: selectedOption._id,
          }
        }
      >
        {!options.iscompulsory && (
          <option
            selected={selectedOption && selectedOption._id === undefined}
            key={"no"}
            value={""}
          >
            Promosyon istemiyorum
          </option>
        )}
        {options.products.map((product, index) => {
          const isSelected =
            selectedOption &&
            JSON.stringify(selectedOption._id) === JSON.stringify(product._id);
          console.log(isSelected, "isselected");
          return (
            <option
              key={index}
              value={JSON.stringify(product)}
              selected={index == 1}
            >
              {product.name + product.price}
            </option>
          );
        })}
      </select>
    </div>
  );
};

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
  const [promotions, setPromotions] = useState([]);
  const [user, setUser] = useState("");
  const [size, setSize] = useState();
  const [test, setTest] = useState([]);
  const [price, setPrice] = useState(defaultPrice);
  const [selectedVariation, setSelectedVariation] = useState([]);
  const [toplam, setToplam] = useState(0);
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  let sayac = 0;

  const handleAddToCart = () => {
    const variationindexes = [];
    const promotionindexes = [];
    const variationIsRight = [];
    const promotionIsRight = [];
    variations.map((v, i) => {
      v.isRequired === true && variationindexes.push(v._id);
    });

    promotions.map((v, i) => {
      v.variation.iscompulsory === true && promotionindexes.push(v._id);
    });

    if (promotionindexes.length > 0) {
      const t = [...promotionindexes];
      const u = [...test];
      t.forEach((v) => {
        const isRight = u.some((item, i) => {
          let y = { status: false, _id: "" };
          if (item._id === v) {
            u.splice(i, 1);
            y == { status: true, _id: v._id };
          } else {
            y == { status: false, _id: v._id };
          }
          return y;
        });
        promotionIsRight.push(isRight);
      });
    } else null;
    if (variationindexes.length > 0) {
      const t = [...variationindexes];
      t.forEach((v) => {
        const isRight = variations.some((item) => item._id === v);
        variationIsRight.push(isRight);
      });
    } else null;

    let isAllTrue = true;

    variationIsRight.forEach((v) => {
      if (!v) {
        isAllTrue = false;
      }
    });
    if (isAllTrue) {
      addItem();
    }
  };
  const addItem = () => {
    currentUser
      ? dispatch(
          cartActions.addItem({
            id,
            title: name,
            price: price,
            image01: image,
            variation:
              (Array.isArray(selectedVariation) &&
                selectedVariation.length == 0 &&
                null) ||
              selectedVariation
                ? selectedVariation
                : null,
            promotion: test.length > 0 ? test : null,
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
    dispatch(getProduct({ id }));
  }, []);

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
    const list = [];
    if (sayac == 0 && variations) {
      variations.map((variation) => {
        let thereIsNoSelectedProduct = true;
        variation.products.map((product) => {
          if (product.isSelected === true) {
            thereIsNoSelectedProduct = false;
          }
        });
        if (variation.isRequired && thereIsNoSelectedProduct) {
          list.push({
            _id: variation._id,
            product: {
              name: variation.products[0].name,
              _id: variation.products[0]._id,
              price: variation.products[0].price,
            },
          });
        }
      });
      variations.map((variation) => {
        variation.products.map((product) => {
          if (
            product.isSelected &&
            !selectedVariation.some((y) => y._id == variation._id)
          ) {
            list.push({
              _id: variation._id,
              product: {
                name: product.name,
                _id: product._id,
                price: product.price,
              },
            });
          }
        });
      });
      setSelectedVariation([...list]);
      sayac++;
    }
  }, [variations]);

  const handleChange = (event) => {
    const { variationId, productPrice, productName, productId } = JSON.parse(
      event.target.value
    );

    if (productPrice == null || productName == null || productId == null) {
      const list = [...selectedVariation];
      const index = selectedVariation.findIndex((v) => v._id == variationId);
      list.splice(index, 1);
      setSelectedVariation([...list]);
    } else {
      const v = selectedVariation.filter((t) => {
        return t._id == variationId;
      });
      if (v.length == 0) {
        setSelectedVariation([
          ...selectedVariation,
          {
            _id: variationId,
            product: {
              name: productName,
              _id: productId,
              price: productPrice,
            },
          },
        ]);
      } else {
        const list = [...selectedVariation];
        const index = selectedVariation.findIndex((v) => v._id == variationId);
        list[index] = {
          _id: variationId,
          product: {
            name: productName,
            _id: productId,
            price: productPrice,
          },
        };
        setSelectedVariation(list);
      }
    }
  };

  const handlePromotionChange = (value, _id, key) => {
    const singlePromotions = [];
    if (promotions) {
      const newPromotions = [promotions];
      newPromotions.map((j) => {
        j.map((y) => {
          if (y.variation.maxValue <= 1) {
            const index = singlePromotions.findIndex((i) => i._id == y._id);
            index < 0
              ? singlePromotions.push({ _id: y._id, qty: 1 })
              : (singlePromotions[index] = {
                  _id: y._id,
                  qty: singlePromotions[index].qty + 1,
                });
          }
        });
      });
    }
    const index = singlePromotions.findIndex((i) => i._id == _id);
    if (index >= 0 && key) {
      if (value.length === 0 && key) {
        setTest(test.filter((item) => item._id !== _id && item.index !== key));
      } else {
        const copyArray = [...test];
        const indexItem = copyArray.findIndex(
          (item) => item._id === _id && item.index == key
        );
        if (indexItem !== -1) {
          copyArray[indexItem] = { _id: _id, index: key, products: value };
          setTest(copyArray);
        } else {
          test.push({ _id: _id, index: key, products: value });
          setTest([...test]);
        }
      }
    }

    if (value.length === 0 && !key) {
      setTest(test.filter((item) => item._id !== _id));
    } else if (
      test.some((selectedOption) => selectedOption._id === _id) &&
      !key
    ) {
      const copyArray = [...test];
      const index = copyArray.findIndex((item) => item._id === _id);
      if (index !== -1) {
        copyArray[index] = { _id: _id, products: value };
        setTest(copyArray);
      }
    } else if (value.length >= 1 && !key) {
      test.push({ _id: _id, products: value });
      setTest([...test]);
    }
  };

  useEffect(() => {
    let count = 0;
    test.map((a) => {
      if (Array.isArray(a.products)) {
        a.products.map((v) => {
          count += v.price;
        });
      } else {
        count += a.products.price;
      }
    });
    selectedVariation.map((v) => {
      count += v.product.price;
    });
    setToplam(count);
  }, [test, selectedVariation]);

  useEffect(() => {
    setPrice(defaultPrice + toplam);
  }, [toplam]);

  return (
    <>
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
                      <div>
                        <div>
                          {Array.isArray(product.promotions) &&
                            product.promotions.length > 0 &&
                            product.promotions?.map((v, index) => {
                              return (
                                <>
                                  {v.variation.maxValue > 1 ? (
                                    <RadioInputArray
                                      variation={v}
                                      maxSelection={v.variation.maxValue}
                                      handlePromotionChange={
                                        handlePromotionChange
                                      }
                                    />
                                  ) : (
                                    <SelectComponent
                                      variation={v}
                                      secondId={index}
                                      handlePromotionChange={
                                        handlePromotionChange
                                      }
                                    />
                                  )}
                                </>
                              );
                            })}
                        </div>
                        <div>Toplam Ücreet : {toplam}</div>
                      </div>
                    </div>
                  }
                  {Array.isArray(variations) &&
                    variations &&
                    variations.length > 0 &&
                    variations.map((v) => {
                      return (
                        <div>
                          <span className="size-span">{v.name} : </span>
                          <select
                            required={v.isRequired}
                            id="select-size"
                            className="select"
                            onChange={handleChange}
                          >
                            <option
                              value={JSON.stringify({
                                variationId: v._id,
                                productId: null,
                                productName: null,
                                productPrice: null,
                              })}
                              disabled={v.isRequired}
                            >
                              Seçiniz
                            </option>
                            {v.products.map((item) => {
                              const t = selectedVariation.some((variation) => {
                                return (
                                  variation._id == v._id &&
                                  variation.product._id == item._id
                                );
                              });
                              console.log(t, "t deneme");
                              return (
                                <option
                                  key={item.id}
                                  selected={selectedVariation.some(
                                    (variation) => {
                                      return (
                                        variation._id == v._id &&
                                        variation.product._id == item._id
                                      );
                                    }
                                  )}
                                  value={JSON.stringify({
                                    variationId: v._id,
                                    productId: item._id,
                                    productName: item.name,
                                    productPrice: item.price,
                                  })}
                                >
                                  {item.name + " " + item.price}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      );
                    })}
                  <button
                    type="submit"
                    onClick={handleAddToCart}
                    className="addTOCart__btn btn"
                  >
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
    </>
  );
};

export default FoodDetails;
{
  /* <select
        value={selectedOption ? JSON.stringify(selectedOption) : ""}
        onChange={handleOptionChange}
        defaultValue={
          selectedOption && {
            name: selectedOption.name,
            price: selectedOption.price,
            _id: selectedOption._id,
          }
        }
      >
        {!options.iscompulsory && (
          <option
            selected={selectedOption?._id == undefined}
            key={"no"}
            value={""}
          >
            Promosyon istemiyorum
          </option>
        )}
        {options.products.map((product, index) => {
          const isSelected =
            selectedOption &&
            JSON.stringify(selectedOption._id) == JSON.stringify(product._id);
          console.log(isSelected, "isselected");
          return (
            <option
              key={index}
              value={JSON.stringify(product)}
              selected={isSelected}
            >
              {product.name + product.price}
            </option>
          );
        })}
      </select> */
}
