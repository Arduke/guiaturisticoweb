import React, { useEffect, useContext } from "react";

import FavoriteCard from "./FavoriteCard/";
import AuthContext from "../../../contexts/auth";

import "./styles.css";

const FavoritesList: React.FC = () => {
  const { favorites, getFavorites } = useContext(AuthContext);
  const userId = localStorage.getItem("@GuiaTuristico::userid");

  useEffect(() => {
    if (userId !== null) getFavorites(userId);

    //eslint-disable-next-line
  }, [userId]);

  const favoritelist = favorites?.map((favorite) => {
    return (
      <div key={favorite.id}>
        <FavoriteCard favorite={favorite} />
      </div>
    );
  });

  return <div className="FavoritesList">{favoritelist}</div>;
};

export default FavoritesList;
