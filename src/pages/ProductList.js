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
                    <th>Image</th>
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

      {/* <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th><Col lg="4">
            <div className="mt-4 card-right-side mt-0">
              <h3 className="order-title">Order Summary</h3>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Subtotal:</h6>
                <span className="cart__subtotal">
                  <i class="fa-solid fa-turkish-lira-sign"></i>
                  {totalAmount}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Company:</h6>
                <span className="seller_company">{cartItems[0]?.seller}</span>
              </div>
              <p>Taxes and shipping will calculate at checkout</p>
              <Link to="/checkout">
                <button className="addTOCart__btn">Proceed to checkout</button>
              </Link>
            </div>
          </Col>
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
                <td>{product.categories.map((c) => c.name)}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={(e) => navigate(`/edit-product/${product._id}`)}
                  >
                    <i className="fas fa-edit ">Edit</i>
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={(e) => deleteProduct(product._id)}
                  >
                    <i className="fas fa-trash">Del</i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </> */}
    </>
  );
};

export default ProductList;
