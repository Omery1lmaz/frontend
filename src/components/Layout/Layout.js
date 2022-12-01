import React , {useEffect} from "react";
import { GetUserDetails } from "../../store/authenticationSlices.js";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Routes from "../../routes/Routers";

import Carts from "../UI/cart/Carts.js";

const Layout = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const showCart = useSelector((state) => state.cartUi.cartIsVisible);
  useEffect(() => {
    const token = Cookies.get("connect.sid");
    if (token) {
      if (!user) {
        dispatch(GetUserDetails());
      }
    }
  });

  return (
    <div>
      <Header />

      {showCart && <Carts />}

      <div>
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
