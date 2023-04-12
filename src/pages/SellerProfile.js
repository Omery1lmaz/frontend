import React, { useState, useEffect } from "react";
import "../styles/seller-profile.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getsellerInfo,
  updateSellerImage,
  updateSellerProfile,
} from "../store/authenticationSlices";
import PageSpinner from "../components/UI/spinners/pageSpinner";
import { Checkbox } from "@mui/material";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

const SellerProfile = () => {
  const dispatch = useDispatch();
  const { sellerInfo, isLoading } = useSelector((state) => state.auth);
  const [modalStatus, setModalStatus] = useState(false);
  const handleModalStatusOpen = () => setModalStatus(true);
  const handleModalStatusClose = () => setModalStatus(false);
  const [image, setImage] = useState();

  const formData = new FormData();

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    image && formData.append("Image", image);
  }, [image]);
  const [inputList, setinputList] = useState([]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    console.log("target and index", name, value, index);
    const list = [...inputList];
    list[index][name] = value;
    setinputList(list);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const handleaddclick = () => {
    setinputList([...inputList, { size: "", price: 0 }]);
  };

  const getData = () => {
    dispatch(getsellerInfo());
  };
  const handleUpdateImage = () => {
    dispatch(updateSellerImage({ formData }));
    handleModalStatusClose();
  };

  const validate = Yup.object({
    Name: Yup.string().required("Name is required"),
    Address: Yup.string().required("Adress is required"),
    IsTakeAway: Yup.boolean(),
    Waiters: Yup.array(),
  });

  return (
    <div>
      {isLoading ? (
        <PageSpinner />
      ) : (
        <>
          {inputList.map((x, i) => {
            return (
              <div className="row mb-3">
                <div class="form-group col-md-4">
                  <label>Garson İsmi</label>
                  <input
                    type="text"
                    name="size"
                    class="form-control"
                    placeholder="Garson ismini giriniz"
                    onChange={(e) => handleinputchange(e, i)}
                  />
                </div>
                <div class="form-group col-md-2 mt-4">
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => handleremove(i)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <button className="btn btn-success" onClick={handleaddclick}>
            Add More
          </button>

          {sellerInfo.name && (
            <Formik
              initialValues={{
                Name: sellerInfo.name,
                Address: sellerInfo.address,
                IsTakeAway: sellerInfo.isTakeAway,
                Waiters: sellerInfo.Waiters,
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                const { Name, Address, IsTakeAway, Waiters } = values;
                dispatch(
                  updateSellerProfile({
                    name: Name,
                    address: Address,
                    isTakeAway: IsTakeAway,
                  })
                );
              }}
            >
              {(formik) => {
                return (
                  <form onSubmit={formik.handleSubmit}>
                    <div class="container form-group rounded bg-white mt-5 mb-5">
                      <div class="row">
                        <div class="col-md-3 border-right">
                          <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                            <img
                              class="rounded-circle mt-5"
                              width="150px"
                              src={sellerInfo.imageUrl}
                            />

                            <span class="font-weight-bold">
                              {sellerInfo.name}
                            </span>
                            <button
                              class="btn btn-primary profile-button"
                              type="button"
                              onClick={handleModalStatusOpen}
                            >
                              Update Photo
                            </button>
                          </div>
                        </div>
                        <div class="col-md-5 border-right">
                          <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                              <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <div class="row mt-3">
                              <div class="col-md-12">
                                <label class="labels">Company Name</label>
                                <input
                                  id="Name"
                                  name="Name"
                                  type="text"
                                  class="form-control validate"
                                  required
                                  value={formik.values.Name}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>

                              {formik.errors.Name && formik.touched.Name ? (
                                <div class="error">* {formik.errors.Name}</div>
                              ) : null}
                              <div class="col-md-12">
                                <label class="labels">Address</label>
                                <input
                                  id="Adress"
                                  name="Adress"
                                  type="text"
                                  class="form-control validate"
                                  required
                                  value={formik.values.Address}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                              {formik.errors.Address &&
                              formik.touched.Address ? (
                                <div class="error">
                                  * {formik.errors.Address}
                                </div>
                              ) : null}
                              <div class="col-md-12">
                                <label class="labels">Take Away</label>
                                <input
                                  type="checkbox"
                                  id="IsTakeAway"
                                  name="IsTakeAway"
                                  defaultChecked={formik.values.IsTakeAway}
                                  value={formik.values.IsTakeAway}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                              </div>
                              {formik.errors.IsTakeAway &&
                              formik.touched.IsTakeAway ? (
                                <div class="error">
                                  * {formik.errors.IsTakeAway}
                                </div>
                              ) : null}
                            </div>
                            <div class="mt-5 text-center">
                              <button type="submit">Update Profile</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                );
              }}
            </Formik>
          )}
        </>
      )}
      <Modal
        open={modalStatus}
        onClose={handleModalStatusClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Company Photo
          </Typography>
          <Typography
            id="modal-modal-description"
            className="w-100 d-flex flex-column justify-content-around"
            sx={{ mt: 2 }}
          >
            <div class="form-group mb-3 col-xs-12 col-sm-6">
              <label for="Image">Image</label>
              <input
                id="Image"
                name="Image"
                type="file"
                accept=".png, .jpg, .jpeg"
                class="form-control validate"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                required
              />
            </div>
            <div>
              <button onClick={handleUpdateImage}>Update Company Photo</button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SellerProfile;
/*
            
*/
