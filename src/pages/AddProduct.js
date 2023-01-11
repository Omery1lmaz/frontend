import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/authenticationSlices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCategories,
  addProduct,
  getCategoriesBySeller,
} from "../store/productSlices";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { isSuccessP, isErrorP, isLoadingP, sellerCategories } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    if (isErrorP) {
      toast.error(message);
    }
    if (isSuccessP) {
      toast.success(message);
    }
    if (user) {
      dispatch(getCategoriesBySeller({ id: user._id, user: user }));
    }
  }, [isErrorP, user, isSuccessP]);
  console.log(sellerCategories.map((category) => console.log(category)));
  const validate = Yup.object({
    Name: Yup.string().required("Name is required"),
    Brand: Yup.string().required("Brand is required"),
    Description: Yup.string()
      .required("Description is required")
      .min(36, "Minimum 36 Karakter olmalıdır"),
    Price: Yup.number("Ürün fiyatı harf içermemelidir")
      .min(1, "Fiyat 1 ya da daha yüksek olmalıdır")
      .positive()
      .integer()
      .required("Price is required"),
    Category: Yup.array()
      // .oneOf(
      //   [sellerCategories.map((category) => category._id)],
      //   "Lütfen kategori Seçiniz"
      // )
      .required("Required"),
  });

  const ButtonHandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Formik
        initialValues={{
          Name: "",
          Brand: "",
          Description: "",
          Price: 1,
          Category: "",
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const { Name, Brand, Description, Price, Category } = values;
          const product = { Name, Brand, Description, Price, Category };
          dispatch(addProduct(product));
          resetForm({ values: "" });
        }}
      >
        {(formik) => (
          <div class="container tm-mt-big tm-mb-big">
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            <div class="row">
              <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
                  <div class="row">
                    <div class="col-12">
                      <h2 class="tm-block-title d-inline-block">Add Product</h2>
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
                          <label for="Description">Description</label>
                          <textarea
                            id="Description"
                            name="Description"
                            class="form-control validate"
                            rows="3"
                            required
                            value={formik.values.Description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></textarea>
                        </div>
                        {formik.errors.Description &&
                        formik.touched.Description ? (
                          <div class="error">* {formik.errors.Description}</div>
                        ) : null}
                        <div class="form-group mb-3">
                          {/* CATEGORY */}
                          <label for="Category">Category</label>
                          <div
                            role="group"
                            aria-labelledby="checkbox-group"
                            id="Category"
                            name="Category"
                            value={formik.values.Category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            onClick={console.log(formik.values.Category)}
                          >
                            {sellerCategories.map((category) => (
                              <label>
                                <Field
                                  type="checkbox"
                                  name="Category"
                                  id="Category"
                                  value={category._id}
                                />
                                {category.name}
                              </label>
                            ))}
                          </div>

                          {formik.errors.Category && formik.touched.Category ? (
                            <div class="error">* {formik.errors.Category}</div>
                          ) : null}

                          <div class="row">
                            <div class="form-group mb-3 col-xs-12 col-sm-6">
                              <label for="Price">Price</label>
                              <input
                                id="Price"
                                name="Price"
                                type="text"
                                class="form-control validate"
                                data-large-mode="true"
                                value={formik.values.Price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.Price && formik.touched.Price ? (
                              <div class="error">* {formik.errors.Price}</div>
                            ) : null}

                            <div class="form-group mb-3 col-xs-12 col-sm-6">
                              <label for="Brand">Brand</label>
                              <input
                                id="Brand"
                                name="Brand"
                                type="text"
                                class="form-control validate"
                                required
                                value={formik.values.Brand}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            {formik.errors.Brand && formik.touched.Brand ? (
                              <div class="error">* {formik.errors.Brand}</div>
                            ) : null}
                          </div>
                        </div>
                        <div class="col-12">
                          <button
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
    </>
  );
};

export default AddProduct;
