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
  getCategoryById,
  getProductsById,
  updateCategory,
  updateProduct,
} from "../store/productSlices";

const EditCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const {
    isSuccessP,
    isErrorP,
    isLoadingP,
    sellerCategories,
    category,
    product,
    messageP,
  } = useSelector((state) => state.product);

  const categoryId = id;
  const userId = user._id;

  const validate = Yup.object({
    name: Yup.string().required("name is required"),
    description: Yup.string().required("description is required").min(36),
  });
  useEffect(async () => {
    console.log(category);
    if (isErrorP) {
      toast.error(message);
    }
    if (messageP._id) {
      toast.success("Kategori güncelleştirildi");
      navigate("/category-list");
    }
    dispatch(getCategoryById({ id, userId }));
  }, [messageP]);

  return !category.description ? (
    <div>Bekleyiniz</div>
  ) : (
    <>
      <Formik
        initialValues={{
          name: category.name ? category.name : "",
          description: category.description ? category.description : "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          const { name, description } = values;
          const category = { name, description, userId };
          dispatch(updateCategory({ category, id }));
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
                          <label for="name">Product Name</label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            class="form-control validate"
                            required
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.errors.name && formik.touched.name ? (
                          <div class="error">* {formik.errors.name}</div>
                        ) : null}

                        <div class="form-group mb-3">
                          <label for="description">Description</label>
                          <textarea
                            id="description"
                            name="description"
                            class="form-control validate"
                            rows="3"
                            required
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          ></textarea>
                        </div>
                        {formik.errors.description &&
                        formik.touched.description ? (
                          <div class="error">* {formik.errors.description}</div>
                        ) : null}
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

export default EditCategory;
