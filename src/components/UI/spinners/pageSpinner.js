import React from "react";
import Spinner from "react-bootstrap/Spinner";

const PageSpinner = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" role="link"></Spinner>
    </div>
  );
};

export default PageSpinner;
