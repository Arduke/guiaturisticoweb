import React, { useContext } from "react";
import Menu from "../../components/Menu";
import FavoriteList from "../../components/ProfileCard/FavoritesList";

const UserProfile: React.FC = () => {
  return (
    <div className="Favorites">
      <Menu />
      <FavoriteList></FavoriteList>
    </div>
  );
};

export default UserProfile;
