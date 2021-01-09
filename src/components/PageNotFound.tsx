import React from "react";

import pnf from "./../icons/browser.svg";

interface IProps {}

const PageNotFound: React.FC<IProps> = () => {
  return (
    <div className="page-not-found">
      <div>
        <img src={pnf} alt="PAGE NOT FOUND" width="300" height="300" />
        <div className="text">Page Not Found</div>
      </div>
    </div>
  );
};

export default PageNotFound;
