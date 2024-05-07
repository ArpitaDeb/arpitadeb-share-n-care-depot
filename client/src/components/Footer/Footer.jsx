import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__wrapper">
        <h2 className="footer__title"> Get in Touch </h2>
        <div className="footer__social">
        <div className="footer__container">
        <div className="footer__card">
          <div className="footer__card--content">
            <p>ShareNCare Inc.</p>
          </div>
          <div className="footer__card--address">
            <p>Avens Rd MakerSpace, Moose Jaw</p>
            <p>Saskatchewan, S6J 1C9, Canada</p>
          </div>
          <div className="footer__card--email">
            <a href="mailto:TinyTaleCreators@gmail.com">TinyTaleCreators@gmail.com</a>
          </div>
        </div>
        <div className="footer__card">
          <div className="footer__card--content">
            <p>Hours of Operation</p>
          </div>
          <div className="footer__card--address">
            <p className="">Monday to Friday: 5:00 PM – 7:00 PM  </p>
            <p className="">Saturday & Sunday: 2:00 PM – 4:00 PM</p>
          </div>
          <div className="footer__card--email">
            <p>+1 (306) 241-4180</p>
          </div>
        </div>
        </div>
      </div>
      <div className="footer__copyright"> © ShareNCare Inc. 2024 All Rights Reserved.</div>
      </div>
    </div>
  );
}

export default Footer;