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
  const userId = localStorage.getItem("@GuiaTuristico::userId");

  useEffect(() => {
    if (userId !== null) {
      getFavorites(userId);
    }
  });

  return (
    <div className="UserPage">
      <Menu />
      <ProfileCard />
      <div className="ListTitle">
        <h1>Meus favoritos</h1>
        <br />
      </div>
      <FavoritesList />
    </div>
  );
};

export default UserProfile;
