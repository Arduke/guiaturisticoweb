import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ExitToApp, Search } from "@material-ui/icons"

import "./styles.css"
import AuthContext from '../../contexts/auth';

function Menu() {
  const { signed, Logout } = useContext(AuthContext);

  const handlelogout = () => {
    Logout()
  }


  return (
    <nav>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fas fa-bars"></i>
      </label>
      <label className="logo">Guia Turístico</label>
      <ul className="ulMenu">
        <li> <Link className="link" to="/"> Home </Link> </li>
        <li> <Link className="link" to="/"> Sobre </Link> </li>
        <li> <Link className="link" to="/"> Contato </Link> </li>
        {
          signed ?
            <li><Button onClick={handlelogout}><ExitToApp style={{ color: "white" }}></ExitToApp></Button></li>
            : <li> <Link className="link" to="/login"> Login </Link> </li>
        }
        <li><Button onClick={()=>{}}><Search style={{ color: "white" }}></Search></Button></li>
      </ul>
    </nav>
  )
}

export default Menu;