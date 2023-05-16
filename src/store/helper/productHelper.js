import axios from "axios";
import { socket } from "../../helper/socketHelper";

const getCategoriesHelper = async () => {
  const response = await axios.get(
    "http://localhost:4000/api/categories/categories"
  );

  return response.data;
};
const getOrderBySeller = async () => {
  const response = await axios.get(
    "http://localhost:4000/api/orders/order/seller",
    { withCredentials: true }
  );
  const arrayfororders = [...response.data];
  arrayfororders.sort((a, b) => new Date(b.date) - new Date(a.date));
  return arrayfororders;
};

const getAdminDashboardInf = async ({ query }) => {
  const res = await axios.post(
    "http://localhost:4000/api/admin/adminDashboard",
    { query: query },
    {
      withCredentials: true,
    }
  );
  return res.data;
};

const UpdateOrderStatus = async ({ id, status }) => {
  const response = await axios.put(
    `http://localhost:4000/api/orders/order/${id}`,
    { status },
    { withCredentials: true }
  );
  return response.data;
};
const addVariation = async ({ variation }) => {
  const response = await axios.post(
    `http://localhost:4000/api/variations/`,
    { variation },
    { withCredentials: true }
  );
  return response.data;
};

const getOrderById = async ({ id }) => {
  return axios.get(`http://localhost:4000/api/orders/order/${id}`, {
    withCredentials: true,
  });
};

const deleteOrder = async ({ id }) => {
  return axios.delete(`http://localhost:4000/api/orders/order/${id}`, {
    withCredentials: true,
  });
};

const createOrder = async ({
  isTakeAway,
  totalPrice,
  orderMessage,
  products,
  name,
  user,
  seller,
  shippingAddress,
  productsQnty,
  tip,
}) => {
  axios
    .post(
      "http://localhost:4000/api/orders/order",
      {
        isTakeAway,
        totalPrice,
        name,
        products,
        user,
        seller,
        shippingAddress,
        productsQnty,
        orderMessage,
        tip,
      },
      { withCredentials: true }
    )
    .then((v) => {
      socket.emit("newOrder", v.data);
      return v.data;
    })
    .catch((err) => {
      return v.data;
    });

  return response.data;
};

const createTip = async ({ tip, id, seller }) => {
  const response = axios.post(
    `http://localhost:4000/api/orders/order/tip/${id}`,
    {
      tip,
      seller,
    },
    { withCredentials: true }
  );
  return response.data;
};

const deleteCategoryById = async ({ id, user }) => {

  const response = await axios.delete(
    `http://localhost:4000/api/categories/${id}`,
    {
      data: {
        user: user,
      },
    }
  );

  return response.data;
};

const getProduct = async ({ id }) => {

  const response = await axios.get(`http://localhost:4000/api/products/${id}`);

  return response.data;
};

const getCategoryByIdHelper = async ({ id }) => {
  const response = await axios.get(
    `http://localhost:4000/api/categories/${id}`,
    { withCredentials: true }
  );

  return response.data;
};
const updateProductsImage = async ({ id, formData }) => {
  const response = await axios.post(
    `http://localhost:4000/api/products/image/${id}`,
    formData,
    { withCredentials: true }
  );

  return response.data;
};

const getCategoriesBySellerHelper = async ({ id, user }) => {
  const response = await axios.get(
    `http://localhost:4000/api/categories/categories/seller`,
    { withCredentials: true }
  );
  return response.data;
};

const getCategoriesBySellerIdHelper = async (id) => {
  const response = await axios.get(
    `http://localhost:4000/api/categories/categories/${id}`
  );
  return response.data;
};

const getPromotionsBySeller = async (id) => {
  const response = await axios.get(`http://localhost:4000/api/promotions/`, {
    withCredentials: true,
  });
  return response.data;
};

const addCategoriesHelper = async (category) => {
  const response = await axios.post(
    "http://localhost:4000/api/categories/add-categories",
    category,
    { withCredentials: true }
  );
  return response.data;
};

// @Post
// @Update Product
// @Private
const updateCategory = async ({ category, id }) => {
  const response = await axios.put(
    `http://localhost:4000/api/categories/categories/${id}`,
    category,
    { withCredentials: true }
  );
  return response.data;
};

const addProduct = async ({ product, formData }) => {
  const response = await axios.post(
    "http://localhost:4000/api/products/",
    formData,
    { withCredentials: true }
  );
  return response.data;
};

// @Post
// @Update Product
// @Private
const updateProduct = async ({ product, productId }) => {
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

const getProductsBySellerWithLimit = async ({ id, skip, limit }) => {
  const response = await axios.get(
    `http://localhost:4000/api/products/seller/limit/${limit}/${skip}`,
    { withCredentials: true }
  );
  return response.data;
};

const getOrderBySellerWithLimit = async ({ skip, limit, query }) => {
  const response = await axios.put(
    `http://localhost:4000/api/orders/order/seller/limit/${limit}/${skip}`,
    { query },
    { withCredentials: true }
  );
  return response.data;
};

const getCatsHelper = async () => {
  const response = await axios.get(
    `http://localhost:4000/api/categories/categories/seller`,
    { withCredentials: true }
  );
  return response.data;
};
const deleteProductById = async ({ id, user }) => {

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
  getCatsHelper,
  getCategoriesHelper,
  addCategoriesHelper,
  getOrderById,
  addProduct,
  getProductsBySeller,
  getProductsByIdHelper,
  updateProduct,
  getCategoryByIdHelper,
  addVariation,
  updateCategory,
  getCategoriesBySellerHelper,
  deleteCategoryById,
  deleteProductById,
  getOrderBySeller,
  getProduct,
  createOrder,
  updateProductsImage,
  deleteOrder,
  UpdateOrderStatus,
  getProductsBySellerWithLimit,
  getCategoriesBySellerIdHelper,
  getOrderBySellerWithLimit,
  getAdminDashboardInf,
  getPromotionsBySeller,
  createTip,
};
export default productService;
