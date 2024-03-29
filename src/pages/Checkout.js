import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import * as Yup from "yup";
import Multiselect from "multiselect-react-dropdown";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "../styles/checkout.css";
import { createOrder } from "../store/productSlices";
import { Formik } from "formik";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { getWaitersBySellerId } from "../store/waiterSlice";

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
  const { orders, isSuccessP } = useSelector((state) => state.product);
  const selectAllText = "Hepsi";
  const validate = Yup.object({
    Name: Yup.string()
      .required("Name is required")
      .min(3, "name must be more than three letters"),

    orderMessage: Yup.string(),
    Table: Yup.number()
      .required("Table is required")
      .min(0, "Table must be beetwen 0 and 100")
      .max(100, "Table must be beetwen 0 and 100"),
    Deal: Yup.boolean().oneOf([true], "Lütfen sözleşmeyi onaylayınız"),
    isTakeAway: Yup.boolean(),
    tipCost: Yup.number().min(
      0,
      "Bahşiş min 0 türk lirasından yüksek olmalıdır"
    ),
    waiters: Yup.array(),
  });

  useEffect(() => {
    console.log("useeffects");
    if (isSuccessP && isSuccessP.status && isSuccessP.status == "200") {
      console.log("first");
      dispatch(cartActions.removeAllItems());
    }
  }, [isSuccessP]);

  const { user } = useSelector((state) => state.auth);
  const { waiters } = useSelector((state) => state.waiter);
  const products = cartItems.map((item) => {
    return {
      product: item.id,
      price: item.price,
      image: item.image01,
      qty: item.quantity,
      name: item.title,
      variation: item.variation ? item.variation : null,
      promotion: item.promotion ? item.promotion : null,
    };
  });
  const buttonDisabled = totalAmount > 0 ? false : true;

  useEffect(() => {
    cartItems.length >= 1 &&
      dispatch(getWaitersBySellerId({ id: cartItems[0]?.seller.id }));
  }, []);

  useEffect(() => {
    cartItems.length >= 1 && handleWaiters();
  }, [waiters]);
  const [test22, setTest22] = useState([]);
  const handleWaiters = () => {
    const ss = waiters.map((waiter) => {
      return {
        name: waiter.name,
        _id: waiter._id,
      };
    });
    setTest22([
      ...ss,
      { name: selectAllText, _id: waiters.map((waiter) => waiter._id) },
    ]);
    return ss;
  };

  return (
    <Helmet title="Checkout">
      <section>
        <Container>
          <Row>
            <Col lg="8" md="6">
              {cartTotalAmount > 0 ? (
                <>
                  <h6 className="mb-4">Shipping Address</h6>
                  <Formik
                    initialValues={{
                      Name: "",
                      Table: "",
                      orderMessage: "",
                      Deal: false,
                      isTakeAway: false,
                      tipCost: "",
                      waiters: [],
                    }}
                    validationSchema={validate}
                    onSubmit={(values, { resetForm }) => {
                      const {
                        Name,
                        Table,
                        orderMessage,
                        isTakeAway,
                        tipCost,
                        waiters,
                      } = values;
                      dispatch(
                        createOrder({
                          name: Name,
                          products,
                          orderMessage,
                          user: user._id,
                          seller: cartItems[0].seller.id,
                          shippingAddress: { table: Table },
                          productsQnty: cartItems.totalQuantity,
                          totalPrice: cartTotalAmount,
                          isTakeAway,
                          tip: {
                            cost: tipCost,
                            waiter: waiters,
                          },
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
                        {formik.errors.Name && formik.touched.Name ? (
                          <div class="error">* {formik.errors.Name}</div>
                        ) : null}
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
                        {formik.errors.Table && formik.touched.Table ? (
                          <div class="error">* {formik.errors.Table}</div>
                        ) : null}
                        <div className="form__group">
                          <input
                            type="area"
                            placeholder="Enter your message"
                            id="orderMessage"
                            name="orderMessage"
                            value={formik.values.orderMessage}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ height: "80px" }}
                          />
                        </div>
                        {formik.errors.orderMessage &&
                        formik.touched.orderMessage ? (
                          <div class="error">
                            * {formik.errors.orderMessage}
                          </div>
                        ) : null}
                        <div className="form__group">
                          <input
                            type="number"
                            placeholder="Enter your message"
                            id="tipCost"
                            name="tipCost"
                            value={formik.values.tipCost}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        {formik.errors.tipCost && formik.touched.tipCost ? (
                          <div class="error">* {formik.errors.tipCost}</div>
                        ) : null}
                        <div>
                          <Multiselect
                            id="waiters"
                            name="waiters"
                            options={
                              Array.isArray(waiters) && waiters.length >= 1
                                ? test22.map((waiter) => {
                                    return {
                                      name: waiter.name,
                                      _id: waiter._id,
                                    };
                                  })
                                : []
                            } // Options to display in the dropdown
                            selectedValues={
                              formik.values.waiters ? formik.values.waiters : []
                            }
                            placeholder="Garson Seçiniz"
                            // Preselected value to persist in dropdown
                            onSelect={(selectedList, selectedItem) => {
                              selectedItem.name == selectAllText
                                ? (formik.values.waiters = handleWaiters())
                                : (formik.values.waiters = selectedList);
                              console.log(formik.values.waiters);
                            }} // Function will trigger on select event
                            onRemove={(selectedList, selectedItem) => {
                              selectedItem.name == selectAllText
                                ? (formik.values.waiters = [])
                                : (formik.values.waiters = selectedList);
                              console.log(formik.values.waiters);
                            }} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                          />
                        </div>
                        <div className="form__group d-flex mb-1">
                          <input
                            type="checkbox"
                            placeholder="idea"
                            id="Deal"
                            name="Deal"
                            style={{ width: "max-content", marginRight: "5px" }}
                            onChange={formik.handleChange}
                            value={formik.values.Deal}
                            checked={formik.values.Deal}
                          />
                          <span onClick={() => handleOpen()}>Lorem ipsum</span>
                        </div>
                        {formik.errors.Deal && formik.touched.Deal ? (
                          <div class="error">* {formik.errors.Deal}</div>
                        ) : null}
                        {Array.isArray(cartItems) &&
                          cartItems.length >= 1 &&
                          cartItems[0].seller.isTakeAway && (
                            <div className="form__group d-flex mb-1">
                              <input
                                type="checkbox"
                                placeholder="isTakeAway"
                                id="isTakeAway"
                                name="isTakeAway"
                                style={{
                                  width: "max-content",
                                  marginRight: "5px",
                                }}
                              />
                              <span>Take Away</span>
                            </div>
                          )}
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <Typography
                              id="modal-modal-title"
                              variant="h6"
                              component="h2"
                            >
                              Text in a modal
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              sx={{ mt: 2 }}
                            >
                              Duis mollis, est non commodo luctus, nisi erat
                              porttitor ligula.
                            </Typography>
                            <Button
                              onClick={() => {
                                handleClose();
                                formik.values.Deal = true;
                                console.log(formik.values.Deal);
                              }}
                            >
                              Okudum, Onaylıyorum
                            </Button>
                          </Box>
                        </Modal>
                        <button
                          // disabled={buttonDisabled}
                          type="submit"
                          className="addTOCart__btn"
                        >
                          Payment
                        </button>
                      </form>
                    )}
                  </Formik>
                </>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: "24",
                  }}
                >
                  <h5>Sepet Boş</h5>
                </div>
              )}
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
      </section>
    </Helmet>
  );
};

export default Checkout;
