import React from "react";
import emptyCheck from "../assets/emptyState.png";
const EmptyState = () => {
  return (
    <div className="flex justify-center">
      <img src={emptyCheck} alt="empty" />
    </div>
  );
};

export default EmptyState;
