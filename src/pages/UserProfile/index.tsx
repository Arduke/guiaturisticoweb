import React from "react";
import Menu from "../../components/Menu";
import FavoritesList from "../../components/UserProfile/FavoritesList";
import ProfileCard from "../../components/UserProfile/ProfileCard";

import "./styles.css";

const UserProfile: React.FC = () => {
  return (
    <div className="UserPage">
      <Menu />
      <div>
        <ProfileCard />
      </div>
      <div>
        <FavoritesList />
      </div>
    </div>
  );
};

export default UserProfile;
