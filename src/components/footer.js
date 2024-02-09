import React from "react";
import { Helmet } from "react-helmet";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Helmet>
      <div className="footerContainer">
        <div className="socialIcons">
          <a href="">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
        <div className="footerNav">
          <ul>
            <li>
              <a href="">Home</a>
              <a href="">News</a>
              <a href="">About</a>
              <a href="">Contact Us</a>
              <a href="">Our Team</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
