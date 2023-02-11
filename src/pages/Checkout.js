import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "../styles/checkout.css";
import { createOrder } from "../store/productSlices";
import { Formik } from "formik";
import { cartActions } from "../store/shopping-cart/cartSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Checkout = () => {
  // const [enterName, setEnterName] = useState("");
  // const [enterTable, setEnterTable] = useState();

  const [open, setOpen] = React.useState(false);
  const [deal, setDeal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const shippingInfo = [];
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const shippingCost = 0;
  const dispatch = useDispatch();
  const totalAmount = cartTotalAmount + Number(shippingCost);
  const { cartItems } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.product);
  const validate = Yup.object({
    Name: Yup.string()
      .required("Name is required")
      .min(3, "name must be more than three letters"),

    orderMessage: Yup.string(),
    Table: Yup.number()
      .required("Table is required")
      .min(0, "Table must be beetwen 0 and 100")
      .max(100, "Table must be beetwen 0 and 100"),
    Deal: Yup.bool().required("Deal is required"),
  });

  useEffect(() => {
    if (orders && orders.status && orders.status == "200") {
      console.log("first");
      dispatch(cartActions.removeAllItems());
    }
  }, [orders]);

  const { user } = useSelector((state) => state.auth);
  const products = cartItems.map((item) => {
    return {
      product: item.id,
      price: item.price,
      image: item.image01,
      qty: item.quantity,
      name: item.title,
    };
  });
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Helmet title="Checkout">
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              <h6 className="mb-4">Shipping Address</h6>
              <Formik
                initialValues={{
                  Name: "",
                  Table: "",
                  orderMessage: "",
                  Deal: false,
                }}
                validationSchema={validate}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
                  const { Name, Table, orderMessage } = values;
                  dispatch(
                    createOrder({
                      name: Name,
                      products,
                      orderMessage,
                      user: user._id,
                      seller: cartItems[0].seller.id,
                      shippingAddress: { table: Table },
                      productsQnty: cartItems.totalQuantity,
                    })
                  );
                  resetForm({ values: "" });
                }}
              >
                {(formik) => (
                  <form
                    className="checkout__form"
                    onSubmit={formik.handleSubmit}
                  >
                    <div className="form__group">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        required
                        id="Name"
                        name="Name"
                        value={formik.values.Name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>

                    <div className="form__group">
                      <input
                        type="number"
                        id="Table"
                        name="Table"
                        placeholder="Enter your table"
                        required
                        value={formik.values.Table}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div className="form__group">
                      <input
                        type="area"
                        placeholder="Enter your message"
                        required
                        id="orderMessage"
                        name="orderMessage"
                        value={formik.values.orderMessage}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{height: '80px'}}
                      />
                    </div>

                    <div className="form__group d-flex mb-1">
                      <input
                        type="checkbox"
                        placeholder="idea"
                        id="Deal"
                        name="Deal"
                        style={{ width: "max-content", marginRight: "5px" }}
                        onClick={() => handleOpen()}
                        onChange={formik.handleChange}
                        value={formik.values.Deal}
                        required
                      />
                      <span>Lorem ipsum</span>
                    </div>
                    <button type="submit" className="addTOCart__btn">
                      Payment
                    </button>
                  </form>
                )}
              </Formik>
            </Col>
            <Col lg="4" md="6">
              <div className="checkout__bill">
                <div className="checkout_company">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Company:
                    <span style={{ textTransform: "uppercase" }}>
                      {cartItems[0]?.seller?.name}
                    </span>
                  </h5>
                </div>
                <h6 className="d-flex align-items-center justify-content-between mb-3 mt-3">
                  Subtotal: <span>${cartTotalAmount}</span>
                </h6>
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Shipping: <span>${shippingCost}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
            <Button
              onClick={() => {
                handleClose();
                setDeal(true);
              }}
            >
              Okudum, Onaylıyorum
            </Button>
          </Box>
        </Modal>
      </section>
    </Helmet>
  );
};

export default Checkout;
