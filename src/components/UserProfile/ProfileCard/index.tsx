import React, { useContext, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

import "./styles.css";
import AuthContext from "../../../contexts/auth";

const ProfileCard: React.FC = () => {
  const { userInfo, getUserInfo } = useContext(AuthContext);
  const userId = localStorage.getItem("@GuiaTuristico::userid");

  useEffect(() => {
    if (userId !== null) {
      getUserInfo(userId);
    }
    //eslint-disable-next-line
  }, [userId]);

  return (
    <div className="ProfileCard">
      <Card className="CardInfos">
        <CardHeader className="CardUsername" title={userInfo?.username} />
        <CardContent>
          <CardMedia
            className="CardAvatar"
            image={
              userInfo?.picture ||
              "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/3136/image-not-found.jpg"
            }
          />
          <Typography className="ProfileTypo" component="p">
            {userInfo?.email}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default ProfileCard;
