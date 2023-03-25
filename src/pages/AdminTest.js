import React from "react";
import "../styles/admin-test.css";
import { NavLink } from "reactstrap";
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
];

const seller_nav__links1 = [
  {
    display: "Profile",
    path: "/",
    icon: "fa-solid fa-house text",
  },
];

const AdminTest = () => {
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
        </ul>
      </div>
    </div>
  );
};

export default AdminTest;
