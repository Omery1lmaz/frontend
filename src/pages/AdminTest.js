import React, { useEffect } from "react";
import "../styles/admin-test.css";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { socket } from "../helper/socketHelper";
import { successNotification } from "../services/notification";
import { useSelector, useDispatch } from "react-redux";

const seller_nav__links = [
  {
    display: "Dashboard",
    path: "/",
    icon: "fa-solid fa-house text",
  },
  {
    display: "Add Product",
    path: "/add-product",
    icon: "fa-solid fa-house text",
  },
  {
    display: "Products",
    path: "/product-list/1",
    icon: "fa-solid fa-house text",
  },
  {
    display: "Orders",
    path: "/orders/1",
    icon: "fa-solid fa-house text",
  },
  {
    display: "Add Category",
    path: "/add-category",
    icon: "fa-solid fa-house text",
  },
  {
    display: "Get Promotion",
    path: "/promotions",
    icon: "fa-solid fa-house text",
  },
  {
    display: "Add Promotion",
    path: "/add-promotion",
    icon: "fa-solid fa-house text",
  },
  {
    display: "Waiter List",
    path: "/waiter-list",
    icon: "fa-solid fa-house text",
  },
  {
    display: "Add Waiter",
    path: "/add-waiter",
    icon: "fa-solid fa-house text",
  },
];

const seller_nav__links1 = [
  {
    display: "Profile",
    path: "/seller/profile",
    icon: "fa-solid fa-house text",
  },
];

const AdminTest = () => {
  const logout = () => {
    Cookies.remove("connect.sid");
    window.location.reload(false);
  };
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    socket.emit("joinRoom", user?._id);
    socket.on("siparisBildirimi", (order) =>
      successNotification("Yeni sipariş id: " + order._id)
    );
  }, [socket]);

  return (
    <div>
      <div className="navbar">
        <img
          className="admin-logo"
          src="https://www.logofirsatlardunyasi.com.tr/Uploads/brand-images/firsatlar_dunyasi_burgerking_popeyes-09-254dd8.png"
        />
        <ul className="admin-ul">
          {seller_nav__links.map((item, index) => {
            return (
              <NavLink to={item.path} key={index}>
                <li
                  className="admin-li"
                  style={{
                    borderBottom:
                      index === seller_nav__links.length - 1 &&
                      "1px solid gray",
                  }}
                >
                  <span style={{ textAlign: "center" }}>
                    <i class={item.icon} style={{ textAlign: "center" }}></i>
                    {item.display}
                  </span>
                </li>
              </NavLink>
            );
          })}
          {seller_nav__links1.map((item, index) => {
            return (
              <NavLink to={item.path} key={index}>
                <li
                  className="admin-li"
                  style={{
                    borderBottom:
                      index === seller_nav__links.length - 1 &&
                      "1px solid gray",
                  }}
                >
                  <span style={{ textAlign: "center" }}>
                    <i class={item.icon} style={{ textAlign: "center" }}></i>
                    {item.display}
                  </span>
                </li>
              </NavLink>
            );
          })}

          <span className="user">
            <i
              class="fa-solid fa-arrow-right-from-bracket"
              onClick={logout}
            ></i>
          </span>
        </ul>
      </div>
    </div>
  );
};

export default AdminTest;
