import { Table, Row, Col, Container } from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import * as Yup from "yup";
import { getWaitersBySellerId } from "../store/waiterSlice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import {
  createTip,
  deleteOrder,
  deleteProductById,
  getOrderById,
  getOrderBySeller,
  getProductsBySeller,
  updateOrderStatus,
} from "../store/productSlices";
import "../styles/order-detail.css";
import PageSpinner from "../components/UI/spinners/pageSpinner";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Tip = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectAllText = "Hepsi";
  const { waiters } = useSelector((state) => state.waiter);
  const [open, setOpen] = React.useState(false);
  const [deal, setDeal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { order, isLoadingP } = useSelector((state) => state.product);
  const validate = Yup.object({
    tipCost: Yup.number().min(
      0,
      "Bahşiş min 0 türk lirasından yüksek olmalıdır"
    ),
    waiters: Yup.array(),
    Deal: Yup.boolean().oneOf([true], "Lütfen sözleşmeyi onaylayınız"),
  });

  useEffect(() => {
    dispatch(getOrderById({ id }));
  }, []);
  useEffect(() => {
    order?.seller?._id &&
      dispatch(getWaitersBySellerId({ id: order.seller._id }));
  }, []);

  useEffect(() => {
    waiters && handleWaiters();
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
  const time = new Date(order.date);
  var dd = String(time.getDate()).padStart(2, "0");
  var mm = String(time.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = time.getFullYear();
  const timesyntax = mm + "/" + dd + "/" + yyyy;

  return (
    <>
      {isLoadingP ? (
        <PageSpinner />
      ) : (
        <Container style={{ marginTop: "30px" }}>
          {order && order.isReady && (
            <>
              <Formik
                initialValues={{
                  Deal: false,
                  tipCost: "",
                  waiters: [],
                }}
                validationSchema={validate}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
                  const { tipCost, waiters } = values;
                  dispatch(
                    createTip({
                      seller: order?.seller?._id,
                      tip: {
                        cost: tipCost,
                        waiter: waiters,
                      },
                      id,
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
                        type="number"
                        placeholder="Enter your Tip Cost"
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
                    <button
                      // disabled={buttonDisabled}
                      type="submit"
                      className="addTOCart__btn"
                    >
                      Payment
                    </button>
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
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
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
                  </form>
                )}
              </Formik>
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default Tip;
