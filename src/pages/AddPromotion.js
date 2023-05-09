import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  addVariation,
  getCatsBySeller,
  getPromotionsBySeller,
} from "../store/productSlices";
import Multiselect from "multiselect-react-dropdown";
import PageSpinner from "../components/UI/spinners/pageSpinner";

const AddProduct = () => {
  const dispatch = useDispatch();

  const { sellerCategories, isLoadingP, promotions } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getCatsBySeller());
    dispatch(getPromotionsBySeller());
  }, []);
  const [maxValue, setMaxValue] = useState(1);
  const [errorMessage, setErrorMessage] = useState();
  const [inputList, setinputList] = useState([]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    if (name === "isSelected") {
      console.log("isSelected");
      console.log(typeof value, "value");
      let counter = 0;
      inputList.map((a) => {
        value == "true" && counter++;
        console.log(value == "true", "isselected true", value);
      });
      if (counter > maxValue) {
        setErrorMessage(
          "Productlar daki selected ürünler max valuedan fazla olamaz"
        );
      } else {
        const list = [...inputList];
        list[index][name] = value;
        setinputList(list);
      }
    } else {
      const list = [...inputList];
      list[index][name] = value;
      setinputList(list);
    }
  };
  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { name: "", price: 0, isSelected: false }]);
  };

  const validate = Yup.object({
    Name: Yup.string().required("Name is required"),
    Multiple: Yup.boolean().required("Multiple is required"),
    Zorunlu: Yup.boolean().required("Zorunlu is required"),
    MaxValue: Yup.number("Max Value harf içermemelidir")
      .min(1, "Max Value 1 ya da daha yüksek olmalıdır")
      .positive()
      .integer()
      .required("Max Value is required"),
  });

  const ButtonHandleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {isLoadingP ? (
        <PageSpinner />
      ) : (
        <Formik
          initialValues={{
            Name: "",
            Multiple: false,
            Zorunlu: false,
            MaxValue: 1,
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            const { Name, Multiple, Zorunlu, MaxValue } = values;
            const variation = {
              name: Name,
              iscompulsory: Zorunlu,
              maxValue: MaxValue,
              products: inputList,
            };
            dispatch(addVariation({ variation }));
            resetForm({ values: "" });
            setinputList([]);
          }}
        >
          {(formik) => (
            <div class="container tm-mt-big tm-mb-big">
              <div class="row">
                <div className="row">
                  <div className="col-sm-12">
                    {inputList.map((x, i) => {
                      return (
                        <div className="row mb-3">
                          <div class="form-group col-md-4">
                            <label>Size</label>
                            <input
                              type="text"
                              name="name"
                              class="form-control"
                              placeholder="Enter First Name"
                              onChange={(e) => handleinputchange(e, i)}
                            />
                          </div>
                          <div class="form-group col-md-4">
                            <label>Price</label>
                            <input
                              type="number"
                              name="price"
                              class="form-control"
                              placeholder="Enter Last Name"
                              onChange={(e) => handleinputchange(e, i)}
                            />
                          </div>
                          <div class="form-group col-md-4">
                            <label>Selected</label>
                            <select
                              name="isSelected"
                              onChange={(e) => handleinputchange(e, i)}
                              value={inputList[i]["isSelected"]}
                            >
                              <option value={false}>Seçili Değil</option>
                              <option value={true}>Seçili</option>
                            </select>
                          </div>
                          <div class="form-group col-md-2 mt-4">
                            <button
                              className="btn btn-danger mx-1"
                              onClick={() => handleremove(i)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className="btn btn-success"
                      onClick={handleaddclick}
                    >
                      Add More
                    </button>
                  </div>
                </div>
                <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                  <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
                    <div class="row">
                      <div class="col-12">
                        <h2 class="tm-block-title d-inline-block">
                          Add Product
                        </h2>
                      </div>
                    </div>
                    <div class="row tm-edit-product-row">
                      <div class="col-xl-6 col-lg-6 col-md-12">
                        <form
                          action=""
                          class="tm-edit-product-form"
                          onSubmit={formik.handleSubmit}
                        >
                          <div class="form-group mb-3">
                            <label for="Name">Product Name</label>
                            <input
                              id="Name"
                              name="Name"
                              type="text"
                              class="form-control validate"
                              required
                              value={formik.values.Name}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.errors.Name && formik.touched.Name ? (
                            <div class="error">* {formik.errors.Name}</div>
                          ) : null}
                          <div class="form-group mb-3">
                            <label for="Name">Max Value</label>
                            <input
                              id="MaxValue"
                              name="MaxValue"
                              type="number"
                              class="form-control validate"
                              required
                              value={formik.values.MaxValue}
                              onChange={(e) => {
                                formik.handleChange(e);
                                setMaxValue(e.target.value);
                              }}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.errors.Name && formik.touched.Name ? (
                            <div class="error">* {formik.errors.Name}</div>
                          ) : null}
                          <div class="form-group mb-3">
                            <label for="Name">Zorunlu</label>
                            <input
                              id="Zorunlu"
                              name="Zorunlu"
                              type="checkbox"
                              value={formik.values.Zorunlu}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                          </div>
                          {formik.errors.Name && formik.touched.Name ? (
                            <div class="error">* {formik.errors.Name}</div>
                          ) : null}

                          <div class="col-12">
                            <button
                              style={{ width: "250px" }}
                              type="submit"
                              class="btn btn-primary btn-block text-uppercase"
                              onSubmit={ButtonHandleSubmit}
                            >
                              Add Product Now
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddProduct;
