import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../store/authenticationSlices";
import { ToastContainer, toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import "react-toastify/dist/ReactToastify.css";

import productSlices, {
  addCategories,
  addProduct,
  getCategoriesBySeller,
  getCatsBySeller,
  getProductsById,
  updateProduct,
  updateProductsImage,
} from "../store/productSlices";
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

const EditProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [inputList, setinputList] = useState([]);

  const handleaddclick = () => {
    setinputList([...inputList, { size: "", price: 0 }]);
  };
  const [modalStatus, setModalStatus] = useState(true);
  const handleModalStatusOpen = () => setModalStatus(true);
  const handleModalStatusClose = () => setModalStatus(false);

  const handleinputchange = (e, index, x) => {
    const { name, value } = e.target;
    const list = [...inputList];
    const c = { ...x };
    c[name] = value;
    list[index] = c;
    setinputList(list);
  };

  const handleremove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setinputList(list);
  };

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { isSuccessP, isErrorP, isLoadingP, sellerCategories, product } =
    useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductsById(id));
  }, []);

  useEffect(() => {
    dispatch(getCatsBySeller());
  }, []);

  useEffect(() => {
    if (
      product.name &&
      inputList.length == 0 &&
      product.variations.length !== 0
    ) {
      setinputList(product.variations);
    }
  }, [product]);
  const formData = new FormData();
  const [image, setImage] = useState();

  const validate = Yup.object({
    Name: Yup.string().required("Name is required"),
    Brand: Yup.string().required("Brand is required"),
    Description: Yup.string().required("Description is required"),
    Price: Yup.number("Ürün fiyatı harf içermemelidir")
      .min(1, "Fiyat 1 ya da daha yüksek olmalıdır")
      .positive()
      .integer()
      .required("Price is required"),
    Category: Yup.array()
      .min(1, "Kategor Seçiniz")
      // .oneOf(
      //   [sellerCategories.map((category) => category._id)],
      //   "Lütfen kategori Seçiniz"
      // )
      .required("Required"),
  });
  useEffect(() => {
    image && formData.append("Image", image);
  }, [image]);

  const handleUpdateImage = () => {
    dispatch(updateProductsImage({ id, formData }));
    handleModalStatusClose();
  };
  const productId = product?._id;
  return (
    <>
      {isLoadingP && product.name && sellerCategories ? (
        <PageSpinner />
      ) : (
        <>
          {product && product.name && product._id == id && (
            <Formik
              initialValues={{
                Name: product.name,
                Brand: product.brand,
                Description: product.description,
                Price: product.defaultPrice,
                Category:
                  Array.isArray(product.categories) &&
                  product.categories.length >= 1
                    ? product.categories
                    : "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                const { Name, Brand, Description, Price, Category } = values;
                const product = {
                  Name,
                  Brand,
                  Description,
                  Price,
                  Category: values.Category.map((v) => v._id),
                  variations: inputList,
                };
                dispatch(updateProduct({ product, productId }));
                navigate("/product-list/1");
              }}
            >
              {(formik) => {
                return (
                  <div class="container tm-mt-big tm-mb-big">
                    <div className="row">
                      <div className="col-sm-12">
                        {inputList.map((x, i) => {
                          return (
                            <div className="row mb-3">
                              <div class="form-group col-md-4">
                                <label>Size</label>
                                <input
                                  type="text"
                                  required
                                  name="size"
                                  class="form-control"
                                  value={x.size}
                                  placeholder="Enter First Name"
                                  onChange={(e) => handleinputchange(e, i, x)}
                                />
                              </div>
                              <div class="form-group col-md-4">
                                <label>Price</label>
                                <input
                                  type="number"
                                  name="price"
                                  required
                                  value={x.price}
                                  class="form-control"
                                  placeholder="Enter Last Name"
                                  onChange={(e) => handleinputchange(e, i, x)}
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
                        <button
                          className="btn btn-success"
                          onClick={handleaddclick}
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                        <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
                          <div class="row">
                            <div class="col-12">
                              <h2 class="tm-block-title d-inline-block">
                                Edit Product
                              </h2>
                            </div>
                          </div>
                          <div class="row tm-edit-product-row">
                            <div class="col-xl-6 col-lg-6 col-md-12">
                              <form
                                action=""
                                class="tm-edit-product-form"
                                onSubmit={formik.handleSubmit}
                              >
                                <div class="form-group mb-3">
                                  <label for="Name">Product Name</label>
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
                                  <div class="error">
                                    * {formik.errors.Name}
                                  </div>
                                ) : null}

                                <div class="form-group mb-3">
                                  <label for="Description">Description</label>
                                  <textarea
                                    id="Description"
                                    name="Description"
                                    class="form-control validate"
                                    rows="3"
                                    required
                                    value={formik.values.Description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                  ></textarea>
                                </div>
                                {formik.errors.Description &&
                                formik.touched.Description ? (
                                  <div class="error">
                                    * {formik.errors.Description}
                                  </div>
                                ) : null}

                                <div class="form-group mb-3">
                                  <Multiselect
                                    id="Category"
                                    name="Category"
                                    options={
                                      Array.isArray(sellerCategories) &&
                                      sellerCategories.length >= 1
                                        ? sellerCategories.map((cat) => {
                                            return {
                                              name: cat.name,
                                              _id: cat._id,
                                            };
                                          })
                                        : []
                                    } // Options to display in the dropdown
                                    selectedValues={
                                      formik.values.Category
                                        ? formik.values.Category
                                        : []
                                    }
                                    placeholder="Select Category"
                                    // Preselected value to persist in dropdown
                                    onSelect={(selectedList, selectedItem) => {
                                      formik.values.Category = selectedList;
                                    }} // Function will trigger on select event
                                    onRemove={(selectedList, selectedItem) => {
                                      formik.values.Category = selectedList;
                                    }} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                  />
                                  {formik.errors.Category &&
                                  formik.touched.Category ? (
                                    <div class="error">
                                      * {formik.errors.Category}
                                    </div>
                                  ) : null}
                                  <div class="row">
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                      <label for="Price">Price</label>
                                      <input
                                        id="Price"
                                        name="Price"
                                        type="text"
                                        class="form-control validate"
                                        data-large-mode="true"
                                        value={formik.values.Price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                    </div>
                                    {formik.errors.Price &&
                                    formik.touched.Price ? (
                                      <div class="error">
                                        * {formik.errors.Price}
                                      </div>
                                    ) : null}
                                    <div class="form-group mb-3 col-xs-12 col-sm-6">
                                      <label for="Brand">Brand</label>
                                      <input
                                        id="Brand"
                                        name="Brand"
                                        type="text"
                                        class="form-control validate"
                                        required
                                        value={formik.values.Brand}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      />
                                    </div>
                                    {formik.errors.Brand &&
                                    formik.touched.Brand ? (
                                      <div class="error">
                                        * {formik.errors.Brand}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                                <div>
                                  <span
                                    style={{
                                      borderRadius: "5px",
                                      background: "var(--primary-color)",
                                      color: "white",
                                      padding: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={handleModalStatusOpen}
                                  >
                                    Resmini güncelle
                                  </span>
                                </div>
                                <div class="col-12">
                                  <button
                                    type="submit"
                                    class="btn btn-primary btn-block text-uppercase"
                                  >
                                    Update Product Now
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Formik>
          )}
          <Modal
            open={modalStatus}
            onClose={handleModalStatusClose}
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
                <div class="form-group mb-3 col-xs-12 col-sm-6">
                  <label for="Image">Image</label>
                  <input
                    id="Image"
                    name="Image"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    class="form-control validate"
                    required
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                  />
                </div>
                <div>
                  <button onClick={handleUpdateImage}>Resmi güncelle</button>
                </div>
              </Typography>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditProduct;
