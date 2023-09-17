import React from "react";

function Loader({ isOpen }) {
  return (
    <div className={`loader ${isOpen && 'loader_opened'}`}>
      <div className="loader__item" />
    </div>
  );
}

export default Loader
