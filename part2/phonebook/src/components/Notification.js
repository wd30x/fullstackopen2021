import React from "react";

const Notification = ({ message, par }) => {
  if (message === null) {
    return null;
  }

  if (par === 0) {
    return <div className="error">{message}</div>;
  } else if( par ===1) {
    return <div className="oper">{message}</div>;
  }
  return null;
};

export default Notification;
