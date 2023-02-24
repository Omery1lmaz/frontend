import { Table, Button, Row, Col } from "react-bootstrap";
import React, { useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUserDetails } from "../store/authenticationSlices";
import {
  addCategories,
  deleteCategoryById,
  getCategoriesBySeller,
  getCatsBySeller,
  getProductsBySeller,
} from "../store/productSlices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { isSuccessP, isErrorP, isLoadingP, sellerCategories, products } =
    useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getCatsBySeller());
    console.log(sellerCategories);
  }, []);

  const deleteCategory = (id) => {
    console.log(id);
    dispatch(deleteCategoryById({ id: id, user: user }));
  };
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3">
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
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sellerCategories ? (
              sellerCategories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm"
                      onClick={(e) =>
                        navigate(`/edit-category/${category._id}`)
                      }
                    >
                      <i className="fas fa-edit ">Edit</i>
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={(e) => deleteCategory(category._id)}
                    >
                      <i className="fas fa-trash">Del</i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <p>Bekleyiniz</p>
            )}
          </tbody>
        </Table>
      </>
    </>
  );
};

export default CategoryList;
