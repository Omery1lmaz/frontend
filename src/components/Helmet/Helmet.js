import React from "react";

const Helmet = (props) => {
  document.title = "Bi Tıkla Siparis " + props.title;
  return <div className="w-100">{props.children}</div>;
};

export default Helmet;
