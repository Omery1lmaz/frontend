import React, { useRef, useEffect } from "react";

import Cookies from "js-cookie";
import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";

import "../../styles/header.css";

const nav__links = [
  {
    display: "Home",
    path: "/",
  },
  {
    display: "Foods",
    path: "/foods",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Add Category",
    path: "/add-category",
  },
];

const seller_nav__links = [
  {
    display: "Add Product",
    path: "/add-product",
  },
  {
    display: "Products",
    path: "/product-list",
  },
  {
    display: "Orders",
    path: "/orders",
  },
  {
    display: "Add Category",
    path: "/add-category",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("connect.sid");
    window.location.reload(false);
  };

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between ">
          <div className="logo">
            <img src={logo} alt="logo" onClick={() => navigate("/")} />
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {user?.isAdmin
                ? seller_nav__links.map((item, index) => (
                    <NavLink
                      to={item.path}
                      key={index}
                      className={(navClass) =>
                        navClass.isActive ? "active__menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  ))
                : nav__links.map((item, index) => (
                    <NavLink
                      to={item.path}
                      key={index}
                      className={(navClass) =>
                        navClass.isActive ? "active__menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            {user ? (
              <span className="user">
                <i
                  class="fa-solid fa-arrow-right-from-bracket"
                  onClick={logout}
                ></i>
              </span>
            ) : (
              <span className="user">
                <Link to="/login">
                  <i class="ri-user-line"></i>
                </Link>
              </span>
            )}

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
