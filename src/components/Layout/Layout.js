import React, { useEffect } from "react";
import { GetUserDetails } from "../../store/authenticationSlices.js";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Routes from "../../routes/Routers";
import Carts from "../UI/cart/Carts.js";
import { ToastContainer } from "react-toastify";
import AdminTest from "../../pages/AdminTest.js";

const Layout = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const isAdmin = user?.isAdmin;
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  return (
    <div>
      <ToastContainer />

      {showCart && <Carts />}

      <div>
        {/* <div style={{ display: isAdmin && "flex" }}> */}
        <div>
          {/* {isAdmin ? <AdminTest /> : <Header />} */}
          {<Header />}
          {/* {<Header />} */}
          {/* <div style={{ width: isAdmin && "calc(100% - 280px)" }}> */}
          <div>
            <Routes />
          </div>
        </div>
      </div>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default Layout;
