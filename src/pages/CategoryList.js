import { Table, Button, Row, Col } from "react-bootstrap";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCategoryById, getCatsBySeller } from "../store/productSlices";

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { sellerCategories } = useSelector((state) => state.product);

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
                  <td className="text-overflow max-w-100">{category.name}</td>
                  <td className="text-overflow max-w-200">
                    {category.description}
                  </td>
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
