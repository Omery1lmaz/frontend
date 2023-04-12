import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCategories } from "../store/productSlices";
import ButtonSpinner from "../components/UI/spinners/spinner";
import { addWaiter } from "../store/waiterSlice";
const AddWaiter = () => {
  const validate = Yup.object({
    name: Yup.string()
      .min(3, "Minimum 3 karakter olmalıdır")
      .required("name is required"),
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoadingW, isSuccessW } = useSelector((state) => state.waiter);
  const gotoWaiterListPage = () => navigate("/waiter-list");
  useEffect(() => {
    isSuccessW && gotoWaiterListPage();
  }, [isSuccessW]);

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={validate}
      onSubmit={async (values) => {
        console.log(values);
        const { name } = values;
        const waiter = { name };
        dispatch(addWaiter({ waiter }));
      }}
    >
      {(formik) => (
        <>
          <div class="container tm-mt-big tm-mb-big">
            <div class="row">
              <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
                  <div class="row">
                    <div class="col-12">
                      <h2
                        class="tm-block-title d-inline-block"
                      >
                        Add Waiter
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
                          <label for="name">Waiter Name</label>
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
                        <div class="form-group mb-3"></div>
                        <div class="col-12">
                          <button
                            type="submit"
                            class="btn btn-primary btn-block text-uppercase"
                          >
                            {isLoadingW ? (
                              <ButtonSpinner />
                            ) : (
                              <span>Add Waiter</span>
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
        </>
      )}
    </Formik>
  );
};

export default AddWaiter;
