import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import ButtonSpinner from "../components/UI/spinners/spinner";

import PageSpinner from "../components/UI/spinners/pageSpinner";
import { getWaiter, updateWaiter } from "../store/waiterSlice";
const EditWaiter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isSuccessW, isLoadingW, waiter } = useSelector(
    (state) => state.waiter
  );
  useEffect(() => {
    dispatch(getWaiter({ id }));
  }, []);

  const validate = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 karakter olmalıdır")
      .required("Name is required"),
  });
  useEffect(() => {
    isSuccessW && navigate("/waiter-list");
  }, [isSuccessW]);

  return (
    <>
      {isLoadingW ? (
        <PageSpinner />
      ) : (
        <>
          {waiter && (
            <Formik
              initialValues={{
                name: waiter.name,
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                const { name } = values;
                const waiter = { name, _id: id };
                console.log("Submit Form ", waiter);
                dispatch(updateWaiter({ waiter }));
              }}
            >
              {(formik) => {
                return (
                  <div class="container tm-mt-big tm-mb-big">
                    <div class="row">
                      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
                          <div class="row">
                            <div class="col-12">
                              <h2 class="tm-block-title d-inline-block">
                                Edit Waiter
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
                                  <label for="Name">Waiter Name</label>
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
                                  <div class="error">
                                    * {formik.errors.name}
                                  </div>
                                ) : null}

                                <div class="col-12">
                                  <button
                                    type="submit"
                                    class="btn btn-primary btn-block text-uppercase"
                                  >
                                    {isLoadingW ? (
                                      <ButtonSpinner />
                                    ) : (
                                      <span>Update Waiter</span>
                                    )}
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Formik>
          )}
        </>
      )}
    </>
  );
};

export default EditWaiter;
