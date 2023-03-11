import styles from "./styles/styles.module.css";
import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import productSlices, {
  getProductsBySeller,
  getCategoriesBySellerId,
} from "../store/productSlices";
import { cartActions } from "../store/shopping-cart/cartSlice";
import { infoNotification } from "../services/notification";
const SellerPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.product
  );
  const [selectedSize, setSelectedSize] = useState();
  const [filteredProducts, setFilteredProducts] = useState();
  const [searchName, setSearchName] = useState("");
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const { isSuccessP, isErrorP, is, LoadingP, categories, products } =
    useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getProductsBySeller(id));
  }, []);

  useEffect(() => {
    dispatch(getCategoriesBySellerId(id));
  }, []);

  const addItem = ({
    id,
    title,
    price,
    image01,
    variation,
    sellerName,
    sellerId,
  }) => {
    currentUser
      ? dispatch(
          cartActions.addItem({
            id,
            title,
            price,
            image01,
            variation,
            seller: { name: sellerName, id: sellerId },
          })
        )
      : infoNotification("lütfen önce giriş yapınız");
  };
  useEffect(() => {
    console.log(searchName, "searchName");
  }, [searchName]);

  useEffect(() => {
    console.log(filteredProducts, "filteredProducts");
    if (searchName.trim() === "") {
      console.log("trim boş");
      setFilteredProducts(products);
    }
    console.log("trim", searchName.trim());
  }, [filteredProducts]);

  return (
    <>
      {products ? (
        <div>
          <img
            src="https://images.deliveryhero.io/image/fd-tr/LH/xpdi-hero.jpg?width=1600&height=400&quality=45%201600w"
            className={styles.img}
            alt="seller"
          ></img>
          <div className={styles.container3}>
            <h3 className={styles.seller_name}>Seller</h3>
            <div className={styles.seller}>
              <span
                class="fa fa-star"
                style={{ color: "orange", marginLeft: "1rem" }}
              ></span>
              <span class="fa fa-star" style={{ color: "orange" }}></span>
              <span class="fa fa-star" style={{ color: "orange" }}></span>
              <span class="fa fa-star" style={{ color: "orange" }}></span>
              <span class="fa fa-star" style={{ color: "orange" }}></span>
              <div className={styles.review}>
                4.7 <p style={{ marginLeft: "3px" }}>(500+)</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={`${styles.wrapper} ${styles.container2}`}>
              <ul className={styles.ul} style={{ overflowX: "auto" }}>
                {categories &&
                  categories.length >= 1 &&
                  categories.map((category) => {
                    return (
                      <li className={styles.li}>
                        <a
                          href={`#${category._id}`}
                          className={styles.hover_underline}
                        >
                          {category.name}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <input
            placeholder="Search Product"
            className={`${styles.container} ${styles.test1}`}
            style={{ border: "1px solid black" }}
            onChange={(e) => {
              setSearchName(e.target.value);
              let x = products.filter((item) =>
                item.name.toLowerCase().includes(searchName.toLowerCase())
              );
              setFilteredProducts(x);
            }}
          />
          {categories.map((category) => {
            return (
              <>
                <div
                  id={category._id}
                  className={`${styles.container} ${styles.test1}`}
                >
                  <p className={styles.title}>{category.name}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                  }}
                >
                  <div className={styles.container}>
                    {filteredProducts.map((product) => {
                      const a = product.categories.map((cat) => {
                        if (cat == category._id) {
                          return (
                            <div key={product._id} className={styles.card}>
                              <div className={styles.card_div}>
                                <p className={styles.productTitle}>
                                  {product.name}
                                </p>
                                <img
                                  src={product.image}
                                  className={styles.productImg}
                                  alt="ks"
                                ></img>
                              </div>
                              <p>
                                {Array.isArray(product.variations) &&
                                product.variations &&
                                product.variations.length > 1
                                  ? product.variations[0].price
                                  : product.defaultPrice}
                                ₺
                              </p>
                              <div className={styles.card_div}>
                                {Array.isArray(product.variations) &&
                                  product.variations &&
                                  product.variations.length > 1 && (
                                    <>
                                      <span>
                                        Variaion: {product.variations[0].size}
                                      </span>
                                    </>
                                  )}
                                <i
                                  className={`fa fa-plus ${styles.icon}`}
                                  aria-hidden="true"
                                  onClick={() =>
                                    addItem({
                                      id: product._id,
                                      title: product.name,
                                      price:
                                        Array.isArray(product.variations) &&
                                        product.variations &&
                                        product.variations.length >= 1
                                          ? product.variations[0].price
                                          : product.defaultPrice,
                                      image01: product.image,
                                      variation:
                                        Array.isArray(product.variations) &&
                                        product.variations &&
                                        product.variations.length >= 1
                                          ? product.variations[0].size
                                          : null,
                                      sellerId: product.user._id,
                                      sellerName: product.user.name,
                                    })
                                  }
                                ></i>
                              </div>
                            </div>
                          );
                        }
                      });
                      return a;
                    })}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SellerPage;
