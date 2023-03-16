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
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const getData = () => {
    dispatch(getAdminDashBoardInf({ query: filter }));
  };
  return (
    <div>
      <button onClick={handleOpenFilter}>Filter</button>

      <Container>
        <Row>
          <div className="admin-card">
            <h5 className="title">Total Revenue</h5>
            <p className="price">₺5700</p>
          </div>
          <div
            className="admin-card"
            style={{ backgroundColor: "white", color: "black" }}
          >
            <h5 style={{ color: "black" }} className="title">
              Total Order
            </h5>
            <p style={{ color: "black" }} className="price">
              1500
            </p>
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
    </div>
  );
};

export default AdminDashboard;
