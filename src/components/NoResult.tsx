import React from "react";

interface IProps {}

const NoResult: React.FC<IProps> = () => {
  return (
    <div className="no-result">
      <div className="container">
          <div className="title"> No Results</div>
      </div>
    </div>
  );
};

export default NoResult;
