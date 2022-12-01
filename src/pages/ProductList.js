import { Table, Button, Row, Col } from 'react-bootstrap'
import React, { useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserDetails } from "../store/authenticationSlices";
import { addCategories, getCategoriesBySeller, getProductsBySeller } from "../store/productSlices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { isSuccessP, isErrorP, isLoadingP, sellerCategories, products } = useSelector(
    (state) => state.product
  );

    useEffect(()  => {
      dispatch(getProductsBySeller(user._id))
      console.log(products)
    }, [])
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" >
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.categories.map(c => (
                    c.name
                  ))}</td>
                  <td>{product.brand}</td>
                  <td>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit " >Edit</i>
                      </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                    >
                      <i className="fas fa-trash">Del</i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
    </>
  );
};

export default ProductList;
