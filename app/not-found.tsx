import React from "react";
import { ArrowLeft } from "lucide-react";
import "./globals.css";
import { div } from "framer-motion/client";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="wrapper">
        <div className="container">
          <div className="content">
            <h1 className="title">404</h1>
            <h2 className="subtitle">Page Not Found</h2>
            <p className="message">
              Sorry, we couldn't find the page you're looking for. It might have
              been moved or deleted.
            </p>
            <a href="/" className="back-button">
              <ArrowLeft className="arrow-icon" />
              Go Back
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
