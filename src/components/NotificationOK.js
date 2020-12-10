import React from "react";

const NotificationOK = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="ok">{message}</div>;
};

export default NotificationOK;
