import React, { useContext, useEffect } from "react";
import Dropzone from "react-dropzone";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

import "./styles.css";
import AuthContext from "../../../contexts/auth";
import api from "../../../services/api";

const ProfileCard = () => {
  const { userInfo, getUserInfo } = useContext(AuthContext);
  const userId = localStorage.getItem("@GuiaTuristico::userid");

  useEffect(() => {
    if (userId !== null) {
      getUserInfo(userId);
    }
    //eslint-disable-next-line
  }, [userId]);

  const onUpload = (file: any) => {
    const data = new FormData();
    data.append("file", file[0]);
    api
      .post(`/users/${userId}/upload`, data)
      .then((response) => {
        console.log("FOI");
      })
      .catch((error) => {
        console.log("NUMFOI");
      });
  };

  return (
    <div className="ProfileCard">
      <Card className="CardInfos">
        <CardHeader className="CardUsername" title={userInfo?.username} />
        <CardContent>
          <div className="imageUpload">
            <Dropzone accept="image/png" onDropAccepted={onUpload}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <div className="DivCardAvatar">
                    <CardMedia
                      className="CardAvatar"
                      image={
                        userInfo?.picture ||
                        "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/3136/image-not-found.jpg"
                      }
                    />
                  </div>
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
          </div>
          <Typography className="ProfileTypo" component="p">
            {userInfo?.email}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
export default ProfileCard;
