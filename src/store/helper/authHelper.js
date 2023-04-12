import axios from "axios";
import Cookies from "js-cookie";

const login = async (user) => {
  console.log("user deneme", user);
  const response = await axios.post(
    "http://localhost:4000/api/users/login",
    user,
    {
      withCredentials: true,
    }
  );
  console.log("response data ", response.data);
  return response.data;
};

const getInfoHelper = async () => {
  const response = await axios.get("http://localhost:4000/api/users/info", {
    withCredentials: true,
  });
  return response.data;
};
const getSellerInfoHelper = async (id) => {
  const response = await axios.get(
    `http://localhost:4000/api/users/info/${id}`
  );
  return response.data;
};

const updateUserProfileHelper = async (profile) => {
  const response = await axios.post(
    "http://localhost:4000/api/users/profile",
    { profile: profile },
    { withCredentials: true }
  );

  if (response.data) {
    console.log(response.data + "data");
  }
  return response.data;
};

const updateUserImageHelper = async ({ formData }) => {
  const response = await axios.post(
    "http://localhost:4000/api/users/image",
    formData,
    { withCredentials: true }
  );

  if (response.data) {
    console.log(response.data + "data");
  }
  return response.data;
};

const register = async (user) => {
  const response = await axios.post(
    "http://localhost:4000/api/users/register",
    user
  );

  if (response.data) {
    console.log(response.data + "data");
  }
  return response.data;
};

const resetPasswordLink = async (email) => {
  console.log(email);
  const response = await axios.post(
    "http://localhost:4000/api/users/reset-password",
    { email }
  );

  if (response.data) {
    console.log(response.data + "data");
  }
  return response.data;
};

const resetPasswordVerify = async ({ id, token, password }) => {
  console.log(token + id + password);
  const response = await axios.post(
    `http://localhost:4000/api/users/reset-password/${id}/${token}`,
    { password }
  );

  if (response.data) {
    console.log(response.data + "data");
  }
  return response.data;
};

const VerifyUser = async ({ id, token }) => {
  console.log(token + id);
  const response = await axios.post(
    `http://localhost:4000/api/users/verify/${id}/${token}`
  );

  if (response.data) {
    console.log(response.data + "data");
  }
  return response.data;
};

const GetUserDetails = async () => {
  const response = await axios.post(
    "http://localhost:4000/api/users/details",
    {},
    { withCredentials: true }
  );

  if (response.data) {
  }
  return response.data;
};

const GetSellers = async () => {
  const response = await axios.get("http://localhost:4000/api/users/sellers");
  return response.data;
};

const authService = {
  login,
  GetUserDetails,
  register,
  resetPasswordLink,
  resetPasswordVerify,
  VerifyUser,
  GetSellers,
  getInfoHelper,
  updateUserProfileHelper,
  updateUserImageHelper,
  getSellerInfoHelper,
};
export default authService;
