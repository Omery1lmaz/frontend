import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addProduct,
  getCatsBySeller,
  getPromotionsBySeller,
} from "../store/productSlices";
import Multiselect from "multiselect-react-dropdown";
import PageSpinner from "../components/UI/spinners/pageSpinner";

const AddPromotion = () => {
  const dispatch = useDispatch();

  const { sellerCategories, isLoadingP } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    dispatch(getCatsBySeller());
    dispatch(getPromotionsBySeller());
  }, []);

  const [inputList, setinputList] = useState([]);

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
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
    Category: Yup.array().required("Required"),
  });

  const ButtonHandleSubmit = (e) => {
    e.preventDefault();
  };
  const formData = new FormData();

  return (
    <>
      {isLoadingP ? (
        <PageSpinner />
      ) : (
        <Formik
          initialValues={{
            Name: "",
            Brand: "",
            Description: "",
            Price: 1,
            Category: "",
          }}
          validationSchema={validate}
          onSubmit={(values, { resetForm }) => {
            const { Name, Brand, Description, Price, Category } = values;
            formData.append("Name", Name);
            formData.append("Brand", Brand);
            formData.append("Description", Description);
            formData.append("Category", JSON.stringify(Category));
            formData.append("Price", Price);
            formData.append("variations", JSON.stringify(inputList));
            formData.append("Image", image);
            for (var key of formData.entries()) {
              console.log(
                JSON.stringify(key[0]) + ", " + JSON.stringify(key[1])
              );
            }
            const product = {
              Name,
              Brand,
              Description,
              Price,
              Category,
              variations: inputList,
              formData,
            };
            dispatch(addProduct({ product, formData }));
            resetForm({ values: "" });
            setinputList([]);
          }}
        >
          {(formik) => (
            <div class="container tm-mt-big tm-mb-big">
              <div class="row">
                <div className="row">
                  <div className="col-sm-12">
                    {inputList.map((x, i) => {
                      return (
                        <div className="row mb-3">
                          <div class="form-group col-md-4">
                            <label>Size</label>
                            <input
                              type="text"
                              name="size"
                              class="form-control"
                              placeholder="Enter First Name"
                              onChange={(e) => handleinputchange(e, i)}
                            />
                          </div>
                          <div class="form-group col-md-4">
                            <label>Price</label>
                            <input
                              type="number"
                              name="price"
                              class="form-control"
                              placeholder="Enter Last Name"
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
                    <button
                      className="btn btn-success"
                      onClick={handleaddclick}
                    >
                      Add More
                    </button>
                  </div>
                </div>
                <div class="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
                  <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
                    <div class="row">
                      <div class="col-12">
                        <h2 class="tm-block-title d-inline-block">
                          Add Promotion
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
                            <label for="Name">Promotion Name</label>
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
                            {/* CATEGORY */}
                            <label for="Category">Category</label>
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
                                console.log(formik.values.Category);
                              }} // Function will trigger on select event
                              onRemove={(selectedList, selectedItem) => {
                                formik.values.Category = selectedList;
                                console.log(formik.values.Category);
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
                              {formik.errors.Price && formik.touched.Price ? (
                                <div class="error">* {formik.errors.Price}</div>
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

                              {formik.errors.Brand && formik.touched.Brand ? (
                                <div class="error">* {formik.errors.Brand}</div>
                              ) : null}
                              <div class="form-group mb-3 col-xs-12 col-sm-6">
                                <label for="Image">Image</label>
                                <input
                                  id="Image"
                                  name="Image"
                                  type="file"
                                  accept=".png, .jpg, .jpeg"
                                  class="form-control validate"
                                  required
                                  onChange={(e) => setImage(e.target.files[0])}
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <button
                              style={{ width: "250px" }}
                              type="submit"
                              class="btn btn-primary btn-block text-uppercase"
                              onSubmit={ButtonHandleSubmit}
                            >
                              Add Product Now
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default AddPromotion;
