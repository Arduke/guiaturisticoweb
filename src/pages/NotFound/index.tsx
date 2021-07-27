import React from "react";

import "./styles.css";
import pagenotfound from "../../images/404error.svg";
import Menu from "../../components/Menu";

const NotFound: React.FC = () => {
  return (
    <div>
      <Menu/>
      <div className="notFound">
        <img className="pageNotFound" src={pagenotfound} alt="notimagefound" />
      </div>
    </div>
  );
};

export default NotFound;
