import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/authenticationSlices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import productSlices, {
  addCategories,
  addProduct,
  getCategoriesBySeller,
  getProductsById,
  updateProduct,
} from "../store/productSlices";

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { isSuccessP, isErrorP, isLoadingP, sellerCategories, product } =
    useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductsById(id));
    dispatch(getCategoriesBySeller({ id, user: user }));
    if (isErrorP) {
      toast.error(message);
    }
    if (isSuccessP) {
      toast.success(message);
    }
  }, [isErrorP, isSuccessP]);
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
      .min(1, "Kategor Seçiniz")
      // .oneOf(
      //   [sellerCategories.map((category) => category._id)],
      //   "Lütfen kategori Seçiniz"
      // )
      .required("Required"),
  });
  const productId = product._id;
  const ButtonHandleSubmit = (e) => {
    e.preventDefault();
  };

  return isLoading && isLoadingP ? (
    <div>Bekleyiniz</div>
  ) : (
    <>
      <Formik
        initialValues={{
          Name: product.name ? product.name : "",
          Brand: product.brand ? product.brand : "",
          Description: product.description ? product.description : "",
          Price: product.price,
          Category: [],
        }}
        validationSchema={validate}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          const { Name, Brand, Description, Price, Category } = values;
          const product = { Name, Brand, Description, Price, Category };
          console.log(
            "Product Edit Pagee : " +
              product.Name +
              product.Brand +
              product.Description
          );
          dispatch(updateProduct({ product, productId }));
          resetForm({ values: "" });
        }}
      >
        {(formik) => (
          <div class="container tm-mt-big tm-mb-big">
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
                            onClick={console.log(
                              " Category values " + formik.values.Category
                            )}
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
                          >
                            Update Product Now
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

export default EditProduct;
