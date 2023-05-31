import React, { useState, useEffect } from "react";
import ShowMoreText from "react-show-more-text";

import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";

import heroImg from "../assets/images/hero.png";
import "../styles/hero-section.css";

import { Link } from "react-router-dom";

import Category from "../components/UI/category/Category.js";

import "../styles/home.css";

import featureImg01 from "../assets/images/service-01.png";
import featureImg02 from "../assets/images/service-02.png";
import featureImg03 from "../assets/images/service-03.png";

import products from "../assets/fake-data/products.js";

import foodCategoryImg01 from "../assets/images/hamburger.png";
import foodCategoryImg02 from "../assets/images/pizza.png";
import foodCategoryImg03 from "../assets/images/bread.png";

import ProductCard from "../components/UI/product-card/ProductCard.js";

import whyImg from "../assets/images/location.png";

import networkImg from "../assets/images/network.png";

import TestimonialSlider from "../components/UI/slider/TestimonialSlider.js";

const featureData = [
  {
    title: "Hızlı sipariş",
    imgUrl: featureImg01,
    desc: "Sipariş sırası beklemeden siparişini ver ve dakikalar içinde siparişin masanda olsun",
  },

  {
    title: "Kolay Sipariş",
    imgUrl: featureImg02,
    desc: "Qr kodu okut ve menüden dilediğini seç",
  },
  {
    title: "Kolay Ödeme",
    imgUrl: featureImg03,
    desc: "Kasaya Gitmeden ödemenizi istediğiniz yerden yapabalirsiniz",
  },
];

const Home = () => {
  const [category, setCategory] = useState("ALL");
  const [allProducts, setAllProducts] = useState(products);

  const [hotPizza, setHotPizza] = useState([]);

  useEffect(() => {
    const filteredPizza = products.filter((item) => item.category === "Pizza");
    const slicePizza = filteredPizza.slice(0, 4);
    setHotPizza(slicePizza);
  }, []);
  const [deneme, setDeneme] = useState();

  let textArray = [];
  const text =
    "Next, you’ll want to change the value of a square from empty to “X” when the user clicks on the square. With how you’ve built the board so far you would need to copy-paste the code that updates the square nine times (once for each square you have)! Instead of copy-pasting, React’s component architecture allows you to create a reusable component to avoid messy, duplicated code. First, you are going to copy the line defining unlike   ";

  const handleArray = () => {
    const words = text.split(" ");
    const uniqueWords = new Set(words);
    const uniqueWordsArray = Array.from(uniqueWords);
    setDeneme([...uniqueWords]);
  };

  useEffect(() => {
    handleArray();
  }, []);

  useEffect(() => {
    console.log("deneme", deneme);
  }, [deneme]);

  useEffect(() => {
    if (category === "ALL") {
      setAllProducts(products);
    }

    if (category === "BURGER") {
      const filteredProducts = products.filter(
        (item) => item.category === "Burger"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "PIZZA") {
      const filteredProducts = products.filter(
        (item) => item.category === "Pizza"
      );

      setAllProducts(filteredProducts);
    }

    if (category === "BREAD") {
      const filteredProducts = products.filter(
        (item) => item.category === "Bread"
      );

      setAllProducts(filteredProducts);
    }
  }, [category]);
  const obne = [
    "corner",
    "open",
    "new",
    "tab",
    "using",
    "website",
    "CodeSandbox.",
    "CodeSandbox",
    "lets",
    "write",
    "your",
    "browser",
    "preview",
    "how",
    "users",
    "will",
    "see",
    "app",
    "created.",
    "The",
    "should",
    "display",
    "an",
    "empty",
    "square",
    "starter",
    "for",
    "tutorial",
    "Unzip",
    "terminal",
    "prompts",
    "stuck",
    "Inspecting",
    "Files",
    "section",
    "files",
    "like",
    "App.js,",
    "index.js,",
    "styles.css",
    "folder",
    "called",
    "public",
    "where",
    "source",
    "selected",
    "file",
    "written",
    "be",
    "displayed",
    "App.js",
    "section.",
    "contents",
  ];

  return (
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content  ">
                <h1 className="mb-4 hero__title">
                  <span>Bi tıkla Sipariş</span>te <br /> sipariş vermek hiç bu
                  kadar kolay olmamıştı
                  {/* <span>Bi tıkla Sipariş</span> ile <br /> artık siparişler bi' tık uzağınızdaHistory */}
                  <p>
                    Artık Qr kod ile menüye istediğiniz yerden ulaşabilir ve bir
                    tıkla siparişinizi vererek garson ya da kasa da sıra
                    beklemenize gerek duymayacaksınız
                  </p>
                </h1>
                <div className="hero__btns d-flex align-items-center gap-5 mt-4">
                  <button className="order__btn d-flex align-items-center justify-content-between">
                    Order now <i class="ri-arrow-right-s-line"></i>
                  </button>
                  <button className="all__foods-btn">
                    <Link to="/foods">See all foods</Link>
                  </button>
                </div>
                <div className=" hero__service  d-flex align-items-center gap-5 mt-5 ">
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-car-line"></i>
                    </span>
                    No shipping charge
                  </p>
                  <p className=" d-flex align-items-center gap-2 ">
                    <span className="shipping__icon">
                      <i class="ri-shield-check-line"></i>
                    </span>
                    100% secure checkout
                  </p>
                </div>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero-img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col>
            <ShowMoreText
                /* Default options */
                lines={3}
                more="Show more"
                less="Show less"
                className="content-css"
                anchorClass="show-more-less-clickable"
                // onClick={this.executeOnClick}
                expanded={false}
                width={280}
                truncatedEndingComponent={"... "}
            >
                Lorem ipsum dolor sit amet, consectetur{" "}
                <a
                    href="https://www.yahoo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    yahoo.com
                </a>{" "}
                adipiscing elit, sed do eiusmod tempor incididunt
                <a
                    href="https://www.google.bg/"
                    title="Google"
                    rel="nofollow"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    www.google.bg
                </a> ut labore et dolore magna amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            </ShowMoreText>

            </Col>
          </Row>
          <Row>
            <Col lg="12" className="text-center">
              <h5 className="feature__subtitle mb-4">Ne Sunuyoruz</h5>
              <h2 className="feature__title">
                Masanda oturup <span>bir tıkla sipariş</span> verebilmeni
              </h2>
              <p className="mb-1 mt-4 feature__text"></p>
              <p className="feature__text">
                Masanda Otur ve Qr kodu okutarak istediğin ürünü sepete ekle ve
                dilediğince sipariş ver
              </p>
            </Col>

            {featureData.map((item, index) => (
              <Col lg="4" md="6" sm="6" key={index} className="mt-5">
                <div className="feature__item text-center px-5 py-3">
                  <img
                    src={item.imgUrl}
                    alt="feature-img"
                    className="w-25 mb-3"
                  />
                  <h5 className=" fw-bold mb-3">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;

// <>
//   {Array.isArray(deneme) && deneme.length >= 1 && (
//     <div style={{ width: "100vw" }}>{JSON.stringify(deneme)}</div>
//     // <div>{obne.length}</div>
//   )}
// </>
