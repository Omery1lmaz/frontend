import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import AllFoods from "../pages/AllFoods";
import FoodDetails from "../pages/FoodDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyUser from "../pages/VerifyUser";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ResetPassword";
import AddProduct from "../pages/AddProduct";
import AddCategory from "../pages/AddCategory";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { GetUserDetails } from "../store/authenticationSlices";
import { getCategoriesBySeller } from "../store/productSlices";
import ProductList from "../pages/ProductList";
import EditProduct from "../pages/EditProduct";
import CategoryList from "../pages/CategoryList";
import EditCategory from "../pages/EditCategory";
import SellerPage from "../pages/SellerPage";
const Routers = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(async () => {
    const token = Cookies.get("connect.sid");
    if (token) {
      if (!user) {
        dispatch(GetUserDetails());
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home/6335f47dd765bd4893812492" />} />
      <Route path="/home/:id" element={<SellerPage />} />
      <Route path="/foods" element={<AllFoods />} />
      <Route path="/home" element={<SellerPage />} />
      <Route path="/foods/:id" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      {user && <Route path="/add-category" element={<AddCategory />} />}
      {user && <Route path="/edit-category/:id" element={<EditCategory />} />}
      {user && <Route path="/category-list" element={<CategoryList />} />}
      {user && <Route path="/product-list" element={<ProductList />} />}
      <Route path="/users/:id/verify/:token" element={<VerifyUser />} />
      <Route path="/reset-password" element={<ForgetPassword />} />
      <Route
        path="/users/:id/reset-password/:token"
        element={<ResetPassword />}
      />
    </Routes>
  );
};

export default Routers;
