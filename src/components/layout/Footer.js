import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" footer bg-dark text-light p-3">
      <h4 className="text-center">All Rights Reserved &copy; Aritra</h4>
      <p className="text-center mt-3 a">
        <Link to={"/About"}>About</Link>|<Link to={"/contact"}> Contact</Link>
      </p>
    </div>
  );
};

export default Footer;
