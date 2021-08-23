import React from "react";

import FavoriteCard from "./FavoriteCard/";

import "./styles.css";
import { useContext } from "react";
import AuthContext from "../../../contexts/auth";

const FavoritesList = () => {
  const { favorites } = useContext(AuthContext);

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
