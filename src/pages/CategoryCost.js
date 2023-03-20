import { Row, Col, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminDashBoardInf } from "../store/productSlices";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

const CategoryCost = () => {
  const dispatch = useDispatch();
  const { adminDashBoard, isLoadingP } = useSelector((state) => state.product);

  const [filterOpen, setFilterOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState({});
  const handleOpenFilter = () => setFilterOpen(true);
  const handleCloseFilter = () => setFilterOpen(false);

  const filterDateHandle = (e) => {
    setFilter({ ...filter, date: { $gte: new Date(e.target.value) } });
  };
  const searchedProduct = adminDashBoard?.categories?.filter((item) => {
    if (searchTerm?.trim() === "") {
      return item;
    }
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      console.log(item, "item");
      return item;
    }
  });

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
  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  return (
    <div className="test">
      {isLoadingP ? (
        <PageSpinner />
      ) : (
        <>
          <button onClick={handleOpenFilter}>Filter</button>
          <input
            type="text"
            placeholder="I'm looking for...."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="table-wrapper overflow-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th className="text-center">Total Cost</th>
                  <th className="text-center" style={{ width: "100px" }}>
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {adminDashBoard && Array.isArray(adminDashBoard.categories) ? (
                  searchedProduct.map((item) => {
                    return (
                      <tr>
                        <td className="text-center cart__img-box">
                          <span>{item.name}</span>
                        </td>
                        <td className="text-center">
                          <span>{item.qty}</span>
                        </td>
                        <td className="text-center">
                          <span>${item.cost}</span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>No Category</div>
                )}
              </tbody>
            </table>
          </div>
          <div>
            <span>Toplam Fiyat{adminDashBoard.totalCost}</span>
            <span>Toplam Sipariş Adeti{adminDashBoard.totalOrder}</span>
          </div>
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

export default CategoryCost;
