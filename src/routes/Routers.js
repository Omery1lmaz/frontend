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
import SellerOrders from "../pages/SellerOrders";
import OrderList from "../pages/OrderList";
import UserOrderList from "../pages/UserOrderList";
import OrderDetail from "../pages/OrderDetail";
import AdminDashboard from "../pages/AdminDashboard";
import ProductCosts from "../pages/ProductCosts";
import CategoryCost from "../pages/CategoryCost";
import GuardedRoute from "../services/authenticationGuard";
import SellerProfile from "../pages/SellerProfile";
import AddPromotion from "../pages/AddPromotion";
import Promotions from "../pages/Promotions";
import AddWaiter from "../pages/AddWaiter";
import EditWaiter from "../pages/EditWaiter";
import WaiterList from "../pages/WaiterList";
import Tip from "../pages/AddTip";

const Routers = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  let sayac = 0;
  useEffect(async () => {
    console.log("şsalmfklasm");
    const token = Cookies.get("connect.sid");
    if (user) {
      dispatch(GetUserDetails());
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={user?.isAdmin ? <AdminDashboard /> : <Home />} />
      {/* <Route path="/" element={user?.isAdmin ? <AdminDashboard /> : <Home />} /> */}
      {/* <Route path="/" element={<Navigate to="/home/6335f47dd765bd4893812492" />} /> */}
      <Route path="/seller/:id" element={<SellerPage />} /> {/*OK*/}
      <Route path="/promotions" element={<Promotions />} /> {/*OK*/}
      <Route path="/seller/profile" element={<SellerProfile />} /> {/*OK*/}
      <Route path="/order" element={<UserOrderList />} /> {/*OK*/}
      <Route path="/order-detail/:id" element={<OrderDetail />} /> {/*OK*/}
      <Route path="/foods" element={<AllFoods />} /> {/*Dont*/}
      <Route path="/product-cost" element={<ProductCosts />} /> {/*Dont*/}
      <Route path="/category-cost" element={<CategoryCost />} /> {/*Dont*/}
      <Route path="/foods/:id" element={<FoodDetails />} /> {/*OK*/}
      <Route path="/cart" element={<Cart />} /> {/*OK*/}
      <Route path="/checkout" element={<Checkout />} /> {/*OK*/}
      <Route path="/add-waiter" element={<AddWaiter />} /> {/*OK*/}
      <Route path="/edit-waiter/:id" element={<EditWaiter />} /> {/*OK*/}
      <Route path="/waiter-list" element={<WaiterList />} /> {/*OK*/}
      <Route path="/login" element={<Login />} /> {/*OK*/}
      <Route path="/contact" element={<Contact />} /> {/*Dont*/}
      <Route path="/order/tip/:id" element={<Tip />} /> {/*Dont*/}
      <Route path="/add-product" element={<AddProduct />} /> {/*Dont*/}
      <Route path="/add-promotion" element={<AddPromotion />} /> {/*Dont*/}
      <Route path="/edit-product/:id" element={<EditProduct />} /> {/*Dont*/}
      {user && <Route path="/add-category" element={<AddCategory />} />}{" "}
      {/*Dont*/}
      {user && <Route path="/orders/:page" element={<OrderList />} />}
      {/*Dont*/}
      {user && (
        <Route path="/edit-category/:id" element={<EditCategory />} />
      )}{" "}
      {/*Dont*/}
      {/* <GuardedRoute path='/register' component={Register} /> */}
      <Route path="/register" element={<GuardedRoute component={Register} />} />
      {user && <Route path="/category-list" element={<CategoryList />} />}{" "}
      {/*Dont*/}
      {user && (
        <Route path="/product-list/:page" element={<ProductList />} />
      )}{" "}
      {/*Dont*/}
      <Route path="/users/:id/verify/:token" element={<VerifyUser />} />{" "}
      {/*Dont*/}
      <Route path="/reset-password" element={<ForgetPassword />} />
      <Route
        path="/users/:id/reset-password/:token"
        element={<ResetPassword />}
      />{" "}
      {/*Dont*/}
    </Routes>
  );
};

export default Routers;
