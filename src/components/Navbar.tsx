import React from "react";
import { Link } from "react-router-dom";

interface IProps {
    title: string
}

const Navbar: React.FC<IProps> = ({title}) => {
  return (
    <header className="sm-navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span>{title}</span>
      </Link>
    </header>
  );
};

export default Navbar;
