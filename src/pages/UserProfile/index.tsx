import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Menu from "../../components/Menu";
import FavoritesList from "../../components/UserProfile/FavoritesList";
import ProfileCard from "../../components/UserProfile/ProfileCard";
import AuthContext from "../../contexts/auth";

import "./styles.css";

const UserProfile: React.FC = () => {
  const { getFavorites } = useContext(AuthContext);
  const userId = localStorage.getItem("@GuiaTuristico::userid");

  useEffect(() => {
    if (userId !== null) {
      getFavorites(userId);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <div className="UserPage">
      <Menu />
      <div className="ListTitle">
        <h1>Minhas informações</h1>
        <br />
      </div>
      <ProfileCard />
      <div className="ListTitle">
        <h1>Meus favoritos</h1>
        <br />
      </div>
      <FavoritesList />
      <div className="footerDashboard">
        <h4>Todos os direitos reservados @2021 </h4>
        <br />
        Carlos Eduardo Martins Filho, Isabela Rocha Silveira, Danilo Barberini
      </div>
    </div>
  );
};

export default UserProfile;
