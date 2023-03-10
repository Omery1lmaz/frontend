import { Table, Row, Col, Container } from "react-bootstrap";
import React, { useRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteProductById,
  getProductsBySeller,
  getProductsBySellerLimit,
} from "../store/productSlices";
import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [deal, setDeal] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [deleteProductId, setDeleteProductId] = useState();
  const { page } = useParams();
  console.log(page, "page");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const {
    isSuccessP,
    isErrorP,
    isLoadingP,
    sellerCategories,
    products,
    sellerProducts,
  } = useSelector((state) => state.product);
  const deleteProduct = (id) => {
    console.log(id, "id deneme test s<jfjsak");
    dispatch(deleteProductById({ id, user }));
  };
  const getProducts = () => {
    dispatch(
      getProductsBySellerLimit({ id: user._id, skip: parseInt(activePage) })
    );
  };
  useEffect(() => {
    page && setActivePage(parseInt(page));
    page == activePage ? getProducts() : setActivePage(parseInt(page));
  }, []);

  useEffect(() => {
    parseInt(page) <= 0 && navigate("/product-list/1");
    setActivePage(1);
  }, []);
  useEffect(() => {
    getProducts();
    navigate(`/product-list/${activePage}`);
  }, [activePage]);

  return (
    <>
      <Container style={{ margin: "30px auto" }}>
        <Row>
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <h4>Products</h4>
            <Button className="my-3" onClick={() => navigate("/add-product")}>
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
          <Col
            lg="12"
            className="d-flex justify-content-center align-items-center"
          >
            {Array.isArray(sellerProducts.products) &&
            sellerProducts.products.length === 0 ? (
              <h5 className="text-center">Your cart is empty</h5>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="text-center">Variation</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sellerProducts.products &&
                    sellerProducts.products.map((item) => (
                      <tr>
                        <td className="text-center cart__img-box">
                          <img src={item.image} alt="" />
                          <span>{item.name}</span>
                        </td>
                        <td className="text-center">
                          {item.variations.length == 0 ? (
                            <span> No Variation</span>
                          ) : (
                            <select
                              id="select-size"
                              className="select variation"
                            >
                              {item.variations.map((item) => {
                                return (
                                  <option key={item.id} value={item._id}>
                                    {item.size + " " + item.price + "₺"}
                                    {/* <i className="fa-solid fa-turkish-lira-sign"></i> */}
                                  </option>
                                );
                              })}
                            </select>
                          )}
                        </td>
                        <td className="text-center">
                          <span>${item.defaultPrice}</span>
                        </td>
                        <td className="text-center cart__item-del">
                          <i
                            class="fa-solid fa-xmark"
                            onClick={(e) => {
                              // deleteProduct(item._id)
                              setDeleteProductId(item._id);
                              handleOpen();
                            }}
                          ></i>
                          <i
                            class="fa-regular fa-pen-to-square madeleteProduct(item._id)rgin-left"
                            onClick={(e) =>
                              navigate(`/edit-product/${item._id}`)
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
        <Row className="align-items-center">
          <Col className="d-flex justify-content-center align-items-center">
            <button
              onClick={() => {
                activePage >= 2 && setActivePage(activePage - 1);
              }}
            >
              Önceki Sayfa
            </button>
            <button
              onClick={() => {
                setActivePage(activePage + 1);
              }}
            >
              Sonraki Sayfa
            </button>
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
              Are u sure to delete product
            </Typography>
            <Typography
              id="modal-modal-description"
              className="d-flex"
              sx={{ mt: 2 }}
            >
              <button
                className="w-50"
                onClick={() => {
                  deleteProduct(deleteProductId);
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
      </Container>
    </>
  );
};

export default ProductList;
