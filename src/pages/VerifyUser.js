import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./styles/styles.module.css";
import { Fragment } from "react/cjs/react.production.min";
import { VerifyEmailUser } from "../store/authenticationSlices";

const VerifyUser = () => {
  const [validUrl, setValidUrl] = useState(true);

  const { id, token } = useParams();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(VerifyEmailUser({ id, token }));
  }, [id, token]);

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <img
            src={
              isError
                ? "https://midoriclarkcasino.com/wp-content/uploads/2020/07/reject-icon-29.png"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXX2YYIdje2IcaM54rfEMyjBO_FL_tOlhSuo7l_TQyybj7AYqqnYUAM9Yz9gvUKXN_WWc&usqp=CAU"
            }
            alt="success_img"
            className={styles.success_img}
          />
          <h1>
            {isError
              ? "Email could not be confirmed"
              : "Email verified successfully"}
          </h1>
          {isSuccess ? (
            <Link to="/login">
              <button className={styles.green_btn}>Login</button>
            </Link>
          ) : (
            <button className={styles.red_btn}>Get back</button>
          )}
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default VerifyUser;
