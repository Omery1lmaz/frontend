import React, { useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserDetails } from "../store/authenticationSlices";
import { addCategories, getCategoriesBySeller } from "../store/productSlices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const token = Cookies.get("connect.sid");
  const validate = Yup.object({
    name: Yup.string().required("name is required"),
    description: Yup.string().required("description is required"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {  isSuccessP, isErrorP, isLoadingP, message, sellerCategories } = useSelector(
    (state) => state.product
  );

  const { user } = useSelector(
    (state) => state.auth
  );
  
  useEffect(() => {
    if (isErrorP) {
      toast.error(message);
    }
    if (isSuccessP) {
      navigate("/");
    }
  }, [isErrorP, isSuccessP, , isLoadingP, message, navigate, dispatch]);

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);
        const { name, description } = values;
        const category = { name, description };
        dispatch(addCategories(category));
      }}
    >
      {(formik) => (
        <>
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
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            required
                          />
                        </div>
                        <div class="form-group mb-3">
                          <label for="description">Description</label>
                          <input
                            id="description"
                            name="description"
                            type="text"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            class="form-control validate"
                            required
                          />
                        </div>
                        <div class="form-group mb-3"></div>
                        <div class="col-12">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block text-uppercase"
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
        </>
      )}
    </Formik>
  );
};

export default AddCategory;
