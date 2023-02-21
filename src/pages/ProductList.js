import { Table, Button, Row, Col, Container } from "react-bootstrap";
import React, { useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProductById, getProductsBySeller } from "../store/productSlices";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { isSuccessP, isErrorP, isLoadingP, sellerCategories, products } =
    useSelector((state) => state.product);
  const deleteProduct = (id) => {
    dispatch(deleteProductById({ id, user }));
  };
  useEffect(() => {
    dispatch(getProductsBySeller(user._id));
    console.log(products);
  }, []);
  return (
    <>
      <Container style={{ margin: "30px auto" }}>
        <Row>
          <Col className="d-flex justify-content-center align-items-center flex-column">
            <h4>Products</h4>
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </Col>
          <Col
            lg="12"
            className="d-flex justify-content-center align-items-center"
          >
            {products.length === 0 ? (
              <h5 className="text-center">Your cart is empty</h5>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Table</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr>
                      <td className="text-center cart__img-box">
                        <img src={item.image} alt="" />
                        <span>{item.name}</span>
                      </td>
                      <td className="text-center">
                        <span>${item.shippingAddress.table}</span>
                      </td>
                      <td className="text-center">
                        <span>${item.defaultPrice}</span>
                      </td>
                      <td className="text-center cart__item-del">
                        <i
                          class="fa-solid fa-xmark"
                          onClick={(e) => deleteProduct(item._id)}
                        ></i>
                        <i
                          class="fa-regular fa-pen-to-square margin-left"
                          onClick={(e) => navigate(`/edit-product/${item._id}`)}
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
          <Col className="text-right"></Col>
        </Row>
      </Container>
    </>
  );
};

export default ProductList;
