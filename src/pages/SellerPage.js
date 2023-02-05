import styles from "./styles/styles.module.css";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import productSlices, {
  addCategories,
  addProduct,
  getCategoriesBySeller,
  getProductsBySeller,
  getProductsById,
  updateProduct,
} from "../store/productSlices";

const SellerPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id, "id");
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.product
  );
  const { isSuccessP, isErrorP, isLoadingP, sellerCategories, products } =
    useSelector((state) => state.product);
  console.log(products, "sellerCategories");
  const deleteProduct = (id) => {
    dispatch(deleteProduct({ id, user }));
  };
  useEffect(() => {
    dispatch(getProductsBySeller(id));
  }, []);

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
              <ul className={styles.ul}>
                <li className={styles.li}>
                  <a href="/" className={styles.hover_underline}>
                    tatlı
                  </a>
                </li>
                <li className={styles.li}>
                  <a href="/" className={styles.hover_underline}>
                    tatlı
                  </a>
                </li>
                <li className={styles.li}>
                  <a href="/" className={styles.hover_underline}>
                    tatlı
                  </a>
                </li>
                <li className={styles.li}>
                  <a href="/" className={styles.hover_underline}>
                    tatlı
                  </a>
                </li>
                <li className={styles.li}>
                  <a href="/" className={styles.hover_underline}>
                    tatlı
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles.container} ${styles.test1}`}>
            <p className={styles.title}>Desert</p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <div className={styles.container}>
              {products.map((product) => {
                return (
                  <div key={product._id} className={styles.card}>
                    <div className={styles.card_div}>
                      <p className={styles.productTitle}>{product.name}</p>
                      <img
                        src={product.image}
                        className={styles.productImg}
                        alt="ks"
                      ></img>
                    </div>
                    <p> {product.price} £</p>
                    <div className={styles.card_div}>
                      <div className={styles.seller}>
                        <span
                          class="fa fa-star"
                          style={{ color: "orange" }}
                        ></span>
                        <span
                          class="fa fa-star"
                          style={{ color: "orange" }}
                        ></span>
                        <span
                          class="fa fa-star"
                          style={{ color: "orange" }}
                        ></span>
                        <span
                          class="fa fa-star"
                          style={{ color: "orange" }}
                        ></span>
                        <span
                          class="fa fa-star"
                          style={{ color: "orange" }}
                        ></span>
                        <div className={styles.review}>
                          {product.rating}{" "}
                          <p style={{ marginLeft: "3px" }}>
                            ({product.numReviews})
                          </p>
                        </div>
                      </div>
                      <i
                        className={`fa fa-plus ${styles.icon}`}
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SellerPage;
