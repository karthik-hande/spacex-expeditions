import React from "react";


interface IProps {}

const Loader: React.FC<IProps> = () => {
  return (
    <div className="loader-page">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
