import { Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { getAdminDashBoardInf } from "../store/productSlices";
import "../styles/admin-dashboard.css";
import PageSpinner from "../components/UI/spinners/pageSpinner";
import { getWaiters } from "../store/waiterSlice";
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

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminDashBoard, isLoadingP } = useSelector((state) => state.product);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFilter = () => setFilterOpen(false);

  const filterDateHandle = (e) => {
    setFilter({ ...filter, date: { $gte: new Date(e.target.value) } });
  };
  const filterDateEndHandle = (e) => {
    setFilter({
      ...filter,
      date: { ...filter.date, $lte: new Date(e.target.value) },
    });
  };
  useEffect(() => {
    getData();
  }, []);

  let counter = 0;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    counter++;
    if (adminDashBoard.products && counter == 0)
      for (let index = 0; index < 2; index++) {
        setProducts([...products, adminDashBoard.products[index]]);
      }
  }, [adminDashBoard]);

  const getData = () => {
    dispatch(getAdminDashBoardInf({ query: filter }));
  };

  return (
    <div>
      {isLoadingP ? (
        <PageSpinner />
      ) : (
        <>
          <button onClick={handleOpenFilter}>Filter</button>

          <Container>
            <Row>
              <div className="cards-wrapper">
                <div className="admin-card">
                  <h5 className="title">Total Revenue</h5>
                  <p className="price">₺{adminDashBoard.totalCost}</p>
                </div>
                <div className="admin-card ">
                  <h5 className="title">Total Order</h5>
                  <p className="price">{adminDashBoard.totalOrder}</p>
                </div>
                <div className="admin-card ">
                  <h5 className="title">Total Tip</h5>
                  <p className="price">{adminDashBoard.totalTipCost}</p>
                </div>
              </div>
            </Row>
            <Row>
              <div className="cards-wrapper mt-5">
                <div className="admin-table-container">
                  <div className="d-flex justify-content-between mb-2">
                    <h2 className="table-title">Products Cost</h2>
                    <span
                      className="table-link"
                      onClick={() => navigate("/product-cost")}
                    >
                      View All
                    </span>
                  </div>
                  <div>
                    <table className="border-0 w-100">
                      <thead>
                        <tr className="admin-table-head border-0">
                          <th>Product Name</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-center">Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminDashBoard?.products?.map((item, i) => {
                          if (i < 2) {
                            return (
                              <tr className="admin-table-tr">
                                <td className="text-overflow max-w-100">
                                  {item.name}
                                </td>
                                <td className="text-center">{item.qty}</td>
                                <td className="text-center">{item.cost}</td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="admin-table-container">
                  <div className="d-flex justify-content-between mb-2">
                    <h2 className="table-title">Categories Cost</h2>
                    <span
                      className="table-link"
                      onClick={() => navigate("/category-cost")}
                    >
                      View All
                    </span>
                  </div>
                  <div>
                    <table className="border-0 w-100">
                      <thead>
                        <tr className="admin-table-head border-0">
                          <th>Product Name</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-center">Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adminDashBoard?.categories?.map((item, i) => {
                          if (i < 2) {
                            return (
                              <tr className="admin-table-tr">
                                <td className="text-overflow max-w-100">
                                  {item.name}
                                </td>
                                <td className="text-center">{item.qty}</td>
                                <td className="text-center">{item.cost}</td>
                              </tr>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
          <Modal
            open={filterOpen}
            onClose={handleCloseFilter}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Filter
              </Typography>
              <Typography
                id="modal-modal-description"
                className="w-100 d-flex flex-column justify-content-around"
                sx={{ mt: 2 }}
              >
                <div className="w-100 d-flex justify-content-around">
                  <div className="d-flex">
                    <span>Start Date :</span>
                    <input type="date" onChange={filterDateHandle}></input>
                  </div>
                  <div className="d-flex">
                    <span className="mr-5">End Date :</span>
                    <input
                      className="ml-5"
                      type="date"
                      onChange={filterDateEndHandle}
                    ></input>
                  </div>
                </div>

                <button onClick={getData}>Search</button>
              </Typography>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
