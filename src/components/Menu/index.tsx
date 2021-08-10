import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

import "./styles.css";
import AuthContext from "../../contexts/auth";
import SearchComponent from "../SearchComponent";

function Menu() {
  const { signed, Logout, userInfo, getUserInfo } = useContext(AuthContext);

  const userId = localStorage.getItem("@GuiaTuristico::userid");

  const handlelogout = () => {
    Logout();
  };

  useEffect(() => {
    if (userId) {
      getUserInfo(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">Guia Turístico</label>
      <ul className="ulMenu">
        {userInfo !== null && (
          <li>
            <Link className="link" to="/profile">
              Perfil
            </Link>
          </li>
        )}
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        {signed ? (
          <li>
            <Button onClick={handlelogout}>
              <ExitToApp style={{ color: "white" }}></ExitToApp>
            </Button>
          </li>
        ) : (
          <li>
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
        )}
        <li>
          <SearchComponent />
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
