import React, { useEffect, useState } from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import PageSpinner from "../components/UI/spinners/pageSpinner";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteWaiter, getWaiters } from "../store/waiterSlice";

import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

const WaiterList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { waiters, isLoadingW } = useSelector((state) => state.waiter);
  const [open, setOpen] = useState(false);
  const [deleteWaiterId, setDeleteWaiterId] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const gotoAddWaiterPage = () => navigate("/add-waiter");

  useEffect(() => {
    dispatch(getWaiters());
  }, []);
  const handleDeleteWaiter = () => {
    console.log(deleteWaiterId);
    dispatch(deleteWaiter({ id: deleteWaiterId }));
  };
  return (
    <>
      {isLoadingW ? (
        <PageSpinner />
      ) : (
        <Container style={{ margin: "30px auto" }}>
          <Row>
            <Col className="d-flex justify-content-center align-items-center flex-column">
              <h4>Waiters</h4>
              <Button className="my-3" onClick={gotoAddWaiterPage}>
                <i className="fas fa-plus"></i>
                Create Waiter
              </Button>
            </Col>
            <Col
              lg="12"
              className="d-flex justify-content-center align-items-center"
            >
              {Array.isArray(waiters) && waiters.length <= 0 ? (
                <h5 className="text-center">No Waiter</h5>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(waiters) &&
                      waiters.map((waiter) => (
                        <tr key={waiter._id}>
                          <td>
                            <span>{waiter.name}</span>
                          </td>
                          <td className="text-center cart__item-del">
                            <i
                              class="fa-solid fa-xmark"
                              onClick={() => {
                                handleOpen();
                                setDeleteWaiterId(waiter._id);
                              }}
                            ></i>
                            <i
                              class="fa-regular fa-pen-to-square madeleteProduct(item._id)rgin-left"
                              onClick={() =>
                                navigate(`/edit-waiter/${waiter._id}`)
                              }
                            ></i>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </Col>
          </Row>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are u sure to delete Waiter
              </Typography>
              <Typography
                id="modal-modal-description"
                className="d-flex"
                sx={{ mt: 2 }}
              >
                <button
                  className="w-50"
                  onClick={() => {
                    handleDeleteWaiter();
                    handleClose();
                  }}
                >
                  Yes
                </button>
                <button
                  className="w-50 ml-2"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  No
                </button>
              </Typography>
            </Box>
          </Modal>
        </Container>
      )}
    </>
  );
};

export default WaiterList;
