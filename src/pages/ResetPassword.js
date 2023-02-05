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
import { resetPasswordVerify } from "../store/authenticationSlices";
import { useParams } from "react-router-dom";

const ResetPassword = () => {

  const validate = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });
  const { id, token } = useParams();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("Emailinizi Onaylayınız");
    }
  }, [dispatch]);

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        const { password } = values;
        dispatch(resetPasswordVerify({ id, token, password }));
      }}
    >
      {(formik) => (
        <Helmet title="Login">
          <CommonSection title="Login" />
          <section>
            <Container>
              <Row>
                <Col lg="6" md="6" sm="12" className="m-auto text-center">
                  <form className="form mb-5" onSubmit={formik.handleSubmit}>
                    <div className="form__group">
                      <input
                        type="password"
                        id="password"
                        class="form-control form-control-lg "
                        autoComplete="off"
                        placeholder="Enter Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password && formik.touched.password ? (
                        <div class="error">* {formik.errors.password}</div>
                      ) : null}
                    </div>
                    <div className="form__group">
                      <input
                        type="password"
                        id="confirmPassword"
                        class="form-control form-control-lg "
                        autoComplete="off"
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.confirmPassword &&
                      formik.touched.confirmPassword ? (
                        <div class="error">
                          * {formik.errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                    <button type="submit" className="addTOCart__btn">
                      Reset Password
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

export default ResetPassword;
