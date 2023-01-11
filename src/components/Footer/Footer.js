import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import styles from "./footer.module.css";
import "../../styles/footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.footer_col1}>
          <ul>
            <li>
              <img className={styles.img} src={logo} alt="logo" />
            </li>
            <li>
              <h4 className={styles.hover_underline}> Tasty Treaty</h4>
            </li>
            <li>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt pariatur accusamus
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.footer_col2}>
          <ul>
            <li>
              <h4 className={styles.hover_underline}> Delivey Time</h4>
            </li>
            <li>
              <span className={styles.title2}>Sunday- Thursday</span>
              <p>10:00 - 12:00</p>
            </li>
            <li>
              <span className={styles.title2}>Friday- Saturday</span>
              <p>12:00 - 12:00</p>
            </li>
          </ul>
        </div>
        <div className={styles.footer_col}>
          <ul>
            <li>
              <h4 className={styles.hover_underline}> Contact</h4>
            </li>
            <li>
              <p> ZindaBazar, Sylhet-3100, Bangladesh</p>
            </li>
            <li>
              <p className={styles.title2}>Phone: 01712345678</p>
            </li>
            <li>
              <p className={styles.title2}>Email: example@gmail.com</p>
            </li>
          </ul>
        </div>

        <div className={styles.footer_col}>
          <ul>
            <li>
              <h4 className={styles.hover_underline}> Newsletter</h4>
            </li>
            <li>
              <p>Subscribe our newsletter</p>
            </li> 
            <li >
              <div className={styles.newsletter} >
                <input placeholder="Enter your email "></input>
                <span>
                  <i class="ri-send-plane-line"></i>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.testDiv}>
        <span>
          Copyright - 2022, website made by Muhibur Rahman. All Rights
        </span>
        <ul className={styles.social_links}>
          <li>
            <span>
              Follow:
            </span>
          </li>
          <li>
            <a>
              {/* <i className={`${styles.fa} fa-brands fa-facebook`}></i> */}
              <span className={styles.social_deneme}>
                <i class="ri-facebook-line"></i>
              </span>
            </a>
          </li>
          <li>
            <a>
              {/* <i className={`${styles.fa} fa-brands fa-twitter`}></i> */}
              <span className={styles.social_deneme}>
                <i class="ri-github-line"></i>
              </span>
            </a>
          </li>
          <li>
            <a>
              {/* <i className={`${styles.fa} fa-brands fa-instagram`}></i> */}
              <span className={styles.social_deneme}>
                <i class="ri-youtube-line"></i>
              </span>
            </a>
          </li>
          <li>
            <a>
              {/* <i className={`${styles.fa} fa-brands fa-linkedin-in`}></i> */}
              <span className={styles.social_deneme}>
                <i class="ri-linkedin-line"></i>
              </span>
              {/* <i class="ri-linkedin-line"></i> */}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
/*    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <div className=" footer__logo text-start">
              <img src={logo} alt="logo" />
              <h5>Tasty Treat</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt pariatur accusamus
              </p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Delivery Time</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Sunday - Thursday</span>
                <p>10:00am - 11:00pm</p>
              </ListGroupItem>

              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Friday - Saturday</span>
                <p>Off day</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Contact</h5>
            <ListGroup className="deliver__time-list">
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <p>Location: ZindaBazar, Sylhet-3100, Bangladesh</p>
              </ListGroupItem>
              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Phone: 01712345678</span>
              </ListGroupItem>

              <ListGroupItem className=" delivery__time-item border-0 ps-0">
                <span>Email: example@gmail.com</span>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="3" md="4" sm="6">
            <h5 className="footer__title">Newsletter</h5>
            <p>Subscribe our newsletter</p>
            <div className="newsletter">
              <input type="email" placeholder="Enter your email" />
              <span>
                <i class="ri-send-plane-line"></i>
              </span>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg="6" md="6">
            <p className="copyright__text">
              Copyright - 2022, website made by Muhibur Rahman. All Rights
              Reserved.
            </p>
          </Col>
          <Col lg="6" md="6">
            <div className="social__links d-flex align-items-center gap-4 justify-content-end">
              <p className="m-0">Follow: </p>
              <span>
                {" "}
                <Link to="https://www.facebook.com/muhib160">
                  <i class="ri-facebook-line"></i>
                </Link>{" "}
              </span>

              <span>
                <Link to="https://github.com/muhib160">
                  <i class="ri-github-line"></i>
                </Link>
              </span>

              <span>
                {" "}
                <Link to=" https://www.youtube.com/c/MuhibsTechDiary">
                  <i class="ri-youtube-line"></i>
                </Link>{" "}
              </span>

              <span>
                {" "}
                <Link to=" https://www.linkedin.com/in/muhib160/">
                  <i class="ri-linkedin-line"></i>
                </Link>{" "}
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
*/
