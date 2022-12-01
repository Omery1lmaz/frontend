import React, { useRef, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/authenticationSlices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ResetPasswordLink } from "../store/authenticationSlices";
const ForgetPassword = () => {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isSuccess) {
      toast.success("Emailinizi Onaylayınız");
    }
    if (isError) {
        toast.error("Hata oluştu");
      }
  }, [isSuccess, isError]);

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const { email } = values;
        console.log(email);
        dispatch(ResetPasswordLink(email));
      }}
    >
      {(formik) => (
        <Helmet title="Login">
          <CommonSection title="Login" />
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

          <section>
            <Container>
              <Row>
                <Col lg="6" md="6" sm="12" className="m-auto text-center">
                  <form className="form mb-5" onSubmit={formik.handleSubmit}>
                    <div className="form__group">
                      <input
                        type="email"
                        id="email"
                        class="form-control form-control-lg "
                        autoComplete="off"
                        placeholder="Enter email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.email && formik.touched.email ? (
                        <div class="error">* {formik.errors.email}</div>
                      ) : null}
                    </div>
                    <button type="submit" className="addTOCart__btn">
                      Get Link
                    </button>
                  </form>
                </Col>
              </Row>
            </Container>
          </section>
        </Helmet>
      )}
    </Formik>
  );
};

export default ForgetPassword;
