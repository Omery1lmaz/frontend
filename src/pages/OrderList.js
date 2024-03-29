import { Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { socket } from "../helper/socketHelper";
import {
  getOrderBySeller,
  getOrderBySellerWithLimit,
  updateOrderStatus,
} from "../store/productSlices";
import "../styles/order-list.css";
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

const pageLimitOptions = [
  { label: 10, value: 10 },
  { label: 25, value: 25 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
];

const statues = [
  { label: "Not Started", value: "Not Started" },
  { label: "InProgress", value: "InProgress" },
  { label: "Ready", value: "Ready" },
];

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { page } = useParams();
  const [open, setOpen] = useState(false);
  const [vOrders, setVOrders] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filter, setFilter] = useState({});
  const [limit, setLimit] = useState(10);
  const handleOpen = () => setOpen(true);
  const handleOpenFilter = () => setFilterOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseFilter = () => setFilterOpen(false);
  const [activePage, setActivePage] = useState(1);

  const filterStatusHandle = (e) => {
    setFilter({ ...filter, isReady: e.target.value });
  };
  const filterDateHandle = (e) => {
    setFilter({ ...filter, date: { $gte: new Date(e.target.value) } });
  };

  const [selectedOrder, setSelectedOrder] = useState();
  let { orders, isLoadingP } = useSelector((state) => state.product);
  const getOrders = () => {
    const intActivePAge = parseInt(activePage - 1);
    dispatch(
      getOrderBySellerWithLimit({
        skip: intActivePAge * limit,
        limit,
        query: filter,
      })
    );
  };
  useEffect(() => {
    page && setActivePage(parseInt(page));
    page === activePage ? getOrders() : setActivePage(parseInt(page));
  }, []);

  useEffect(() => {
    parseInt(page) <= 0 && navigate("/orders/1");
    setActivePage(1);
  }, []);
  useEffect(() => {
    getOrders();
    navigate(`/orders/${activePage}`);
  }, [activePage]);

  const pageLimitHandlechange = (e) => {
    setLimit(e.target.value);
  };

  useEffect(() => {
    getOrders();
  }, [limit]);
  const handleupdateStatusOrder = (status) => {
    const index = orders.findIndex(
      (item, index) => item._id === selectedOrder._id
    );
    let copyOrders = [...orders];
    let copyV = orders[index];
    copyV = { ...copyV, isReady: status };

    orders = [...copyOrders];
    setOrders();
  };
  const setOrders = () => {
    setVOrders(orders);
  };
  useEffect(() => {
    setOrders();
  }, [orders]);

  useEffect(() => {
    socket.on("orderNotification", (order) => {
      let copyOrders = [order, ...orders];

      console.log(vOrders, "old orders.length");
      setVOrders(copyOrders);
      console.log(order, "order list set  orders ");
      console.log(vOrders, "new orders.length");
    });
  }, [socket]);

  return (
    <>
      {isLoadingP ? (
        <PageSpinner />
      ) : (
        <>
          <Col className="d-flex justify-content-center align-items-center mt-5">
            <h4>Orders</h4>
          </Col>
          <Container style={{ margin: "30px auto" }}>
            <Col className="d-flex align-items-baseline">
              <div>
                <span>Limit: </span>
                <select
                  id="select-size"
                  className="select"
                  onChange={pageLimitHandlechange}
                  value={limit}
                >
                  {pageLimitOptions.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button onClick={() => handleOpenFilter()}>Filter</button>
            </Col>
            <Row>
              <Col
                lg="8"
                className="d-flex justify-content-center align-items-center  order-table"
              >
                {orders.length === 0 ? (
                  <h5 className="text-center">No Order</h5>
                ) : (
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="text-center">Date</th>
                        <th
                          style={{ width: "200px" }}
                          onClick={() => handleOpenFilter}
                        >
                          Name
                        </th>
                        <th className="text-center">Table</th>
                        <th className="text-center" style={{ width: "100px" }}>
                          Price
                        </th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vOrders &&
                        Array.isArray(vOrders) &&
                        vOrders.map((item) => {
                          // const date = new Date(item.date)
                          let date = new Date(item.date);

                          let day = date.getDate(); // gün
                          let month = date.getMonth() + 1; // ay (0-11 arası olduğu için 1 ekliyoruz)
                          let year = date.getFullYear(); // yıl
                          let hour = date.getHours(); // saat
                          let minute = date.getMinutes(); // dakika
                          let second = date.getSeconds(); // saniye
                          const time =
                            day +
                            "." +
                            month +
                            "." +
                            year +
                            " " +
                            hour +
                            ":" +
                            minute +
                            ":" +
                            second;

                          return (
                            <tr onClick={() => setSelectedOrder(item)}>
                              <td>
                                <span>{time}</span>
                              </td>
                              <td className="text-center cart__img-box">
                                <span className="text-overflow max-w-200">
                                  {item.name}
                                </span>
                              </td>
                              <td className="text-center">
                                <span>{item.shippingAddress.table}</span>
                              </td>
                              <td className="text-center">
                                <span>${item.totalPrice}</span>
                              </td>
                              <td className="text-center">
                                <span>{moment(item.date).fromNow()}</span>
                              </td>
                              <td className="text-center">
                                <span>{item.isReady}</span>
                              </td>
                              <td className="text-center">
                                <button
                                  className="m-0 border-0 status-btn text-center"
                                  onClick={() => {
                                    handleOpen();
                                  }}
                                >
                                  <i class="ri-shopping-basket-line m-0"></i>
                                  <span className="ml-2">Change Status</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </Col>
              <Col lg="3" className="d-flex ml-5">
                {selectedOrder && (
                  <div className="order-right-side">
                    <p>
                      <strong>Order Owner :</strong> {selectedOrder.name}
                    </p>
                    <p>
                      <strong>Order Table : </strong>
                      {selectedOrder.shippingAddress.table}
                    </p>
                    <p>
                      <strong>Order cost :</strong> {selectedOrder.totalPrice}
                    </p>
                    <p>
                      <strong>Order message :</strong>{" "}
                      {selectedOrder.orderMessage
                        ? selectedOrder.orderMessage
                        : "No message"}
                    </p>
                    <div className="order-right-side-products d-flex flex-column">
                      <p className="products-title">Products</p>
                      {selectedOrder.items.map((product) => {
                        return (
                          <div className="product ">
                            <span
                              style={{
                                display: "block",
                                marginBottom: "15px !important",
                              }}
                            >
                              <strong>Name : </strong> {product.name}
                            </span>
                            <span>
                              <strong>Quantity :</strong> {product.qty}
                            </span>
                            {product.variation && (
                              <span
                                className="d-block"
                                style={{ marginBottom: "15px !important" }}
                              >
                                <strong>Size :</strong> {product.variation}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col className="d-flex justify-content-center align-items-center">
                <button
                  onClick={() => {
                    activePage >= 2 && setActivePage(activePage - 1);
                  }}
                  disabled={page == 1}
                >
                  Önceki Sayfa
                </button>
                <button
                  disabled={orders.length < limit}
                  onClick={() => {
                    setActivePage(activePage + 1);
                  }}
                >
                  Sonraki Sayfa
                </button>
              </Col>
            </Row>
          </Container>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Set Status
              </Typography>
              <Typography
                id="modal-modal-description"
                className="w-100 d-flex justify-content-around"
                sx={{ mt: 2 }}
              >
                <button
                  className="m-0 border-0 status-btn text-center"
                  onClick={() => {
                    dispatch(
                      updateOrderStatus({
                        id: selectedOrder._id,
                        status: "Not Started",
                      })
                    );
                    handleupdateStatusOrder("Not Started");
                  }}
                >
                  <i class="ri-shopping-basket-line m-0"></i>
                  <span className="ml-2">Not Started</span>
                </button>
                <button
                  className="m-0 border-0 status-btn text-center"
                  onClick={() => {
                    dispatch(
                      updateOrderStatus({
                        id: selectedOrder._id,
                        status: "InProgress",
                      })
                    );
                    handleupdateStatusOrder("InProgress");
                  }}
                >
                  <i class="ri-shopping-basket-line m-0"></i>
                  <span className="ml-2">InProgress</span>
                </button>
                <button
                  className="m-0 border-0 status-btn text-center"
                  onClick={() => {
                    dispatch(
                      updateOrderStatus({
                        id: selectedOrder._id,
                        status: "Ready",
                      })
                    );
                    handleupdateStatusOrder("Ready");
                  }}
                >
                  <i class="ri-shopping-basket-line m-0"></i>
                  <span className="ml-2">Ready</span>
                </button>
              </Typography>
            </Box>
          </Modal>
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
                <h5>Status Filter</h5>
                <select
                  id="select-size"
                  className="select"
                  onChange={filterStatusHandle}
                >
                  {statues.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
                <input type="date" onChange={filterDateHandle}></input>
                <button onClick={() => getOrders()}>Search</button>
              </Typography>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default OrderList;
