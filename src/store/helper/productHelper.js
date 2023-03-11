import axios from "axios";

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
  const arrayfororders = [...response.data];
  arrayfororders.sort((a, b) => new Date(b.date) - new Date(a.date));
  return arrayfororders;
};
const UpdateOrderStatus = async ({ id, status }) => {
  console.log(status);
  const response = await axios.put(
    `http://localhost:4000/api/products/order/${id}`,
    { status },
    { withCredentials: true }
  );
  return response.data;
};
const getOrderById = async ({ id }) => {
  return axios.get(`http://localhost:4000/api/products/order/${id}`, {
    withCredentials: true,
  });
};

const deleteOrder = async ({ id }) => {
  return axios.delete(`http://localhost:4000/api/products/order/${id}`, {
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
}) => {
  const response = axios.post(
    "http://localhost:4000/api/products/order",
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
    },
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

  const response = await axios.get(`http://localhost:4000/api/products/${id}`);

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
    `http://localhost:4000/api/products/categories/seller`,
    { withCredentials: true }
  );
  console.log(response.data, "datajdnsajkfnjsk");
  return response.data;
};

const getCategoriesBySellerIdHelper = async (id) => {
  const response = await axios.get(
    `http://localhost:4000/api/products/categories/${id}`
  );
  console.log(response.data, "datajdnsajkfnjsk");
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
  console.log(response.data);
  return response.data;
};

// Get Seller's Products

const getProductsBySeller = async (id) => {
  const response = await axios.get(
    `http://localhost:4000/api/products/seller/${id}`
  );
  return response.data;
};

const getProductsBySellerWithLimit = async ({ id, skip }) => {
  console.log(skip, "skip 1");
  const limit = 10;
  const response = await axios.get(
    `http://localhost:4000/api/products/seller/limit/${id}/${limit}/${skip}`
  );
  return response.data;
};

const getOrderBySellerWithLimit = async ({ skip, limit, query }) => {
  console.log(query, "query helper");
  console.log(limit, "limit helper");
  const response = await axios.put(
    `http://localhost:4000/api/products/order/seller/limit/${limit}/${skip}`,
    { query },
    { withCredentials: true }
  );
  return response.data;
};

const getCatsHelper = async () => {
  const response = await axios.get(
    `http://localhost:4000/api/products/categories/seller`,
    { withCredentials: true }
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
  getCatsHelper,
  getCategoriesHelper,
  addCategoriesHelper,
  getOrderById,
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
  createOrder,
  deleteOrder,
  UpdateOrderStatus,
  getProductsBySellerWithLimit,
  getCategoriesBySellerIdHelper,
  getOrderBySellerWithLimit,
};
export default productService;
