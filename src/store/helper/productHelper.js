import axios from "axios";
import Cookies from "js-cookie";

const getCategoriesHelper = async () => {
  const response = await axios.get(
    "http://localhost:4000/api/products/categories"
  );

  return response.data;
};

const getOrderBySeller = async () => {
  const response = await axios.get(
    "http://localhost:4000/api/products/order/seller",
    { withCredentials: true }
  );
  console.log(response.data, "response dataw");

  return response.data;
};
const deleteCategoryById = async ({ id, user }) => {
  console.log("İD Get ", id);
  console.log("User İD Get Helper  ", user);

  const response = await axios.delete(
    `http://localhost:4000/api/products/category/${id}`,
    {
      data: {
        user: user,
      },
    }
  );

  return response.data;
};

const getProduct = async ({ id }) => {
  console.log("İD Get ", id);

  const response = await axios.get(
    `http://localhost:4000/api/products/${id}`
  );

  return response.data;
};

const getCategoryByIdHelper = async ({ id, userId }) => {
  console.log("İD Get ", id);
  console.log("User İD Get Helper  ", userId);

  const response = await axios.post(
    `http://localhost:4000/api/products/category/${id}`,
    userId
  );

  return response.data;
};

const getCategoriesBySellerHelper = async ({ id, user }) => {
  const response = await axios.get(
    `http://localhost:4000/api/products/categories/${user._id}`,
    user
  );

  return response.data;
};

const addCategoriesHelper = async (category) => {
  console.log(category);
  const response = await axios.post(
    "http://localhost:4000/api/products/add-categories",
    category,
    { withCredentials: true }
  );
  return response.data;
};

// @Post
// @Update Product
// @Private
const updateCategory = async ({ category, id }) => {
  console.log("categoryID", id);
  const response = await axios.put(
    `http://localhost:4000/api/products/categories/${id}`,
    category,
    { withCredentials: true }
  );
  return response.data;
};

const addProduct = async (product) => {
  const response = await axios.post(
    "http://localhost:4000/api/products/",
    product,
    { withCredentials: true }
  );
  return response.data;
};

// @Post
// @Update Product
// @Private
const updateProduct = async ({ product, productId }) => {
  console.log("update product helper", product);
  const response = await axios.post(
    `http://localhost:4000/api/products/${productId}`,
    product,
    { withCredentials: true }
  );
  return response.data;
};

// Get Product By Id

const getProductsByIdHelper = async (id) => {
  const response = await axios.get(`http://localhost:4000/api/products/${id}`);
  return response.data;
};

// Get Seller's Products

const getProductsBySeller = async (id) => {
  const response = await axios.get(
    `http://localhost:4000/api/products/seller/${id}`
  );
  return response.data;
};
const deleteProductById = async ({ id, user }) => {
  console.log("İD Get ", id);
  console.log("User İD Get Helper  ", user);

  const response = await axios.delete(
    `http://localhost:4000/api/products/${id}`,
    {
      data: {
        user: user,
      },
    }
  );

  return response.data;
};

const productService = {
  getCategoriesHelper,
  addCategoriesHelper,
  addProduct,
  getProductsBySeller,
  getProductsByIdHelper,
  updateProduct,
  getCategoryByIdHelper,
  updateCategory,
  getCategoriesBySellerHelper,
  deleteCategoryById,
  deleteProductById,
  getOrderBySeller,
  getProduct,
};
export default productService;
