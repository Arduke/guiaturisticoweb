import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

import "./styles.css";

import { Favorites } from "../../../../interface/user/IUser";

const FavoriteCard: React.FC<{ favorite: Favorites }> = ({ favorite }) => {
  return (
    <div className="FavoriteCard">
      <Card className="FavoriteCard">
        <CardHeader title={favorite.poi.name} className="FavoriteTitle" />
        <CardContent>
          <Link to={`details/${favorite.poi.id}`}>
            <CardMedia
              className="FavoritePicture"
              image={
                favorite.poi.picture ||
                "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/3136/image-not-found.jpg"
              }
            />
          </Link>
          <Typography
            className="FavoriteTypo"
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {favorite.poi.description}
          </Typography>
        </CardContent>
        <div className="FavoriteIcon">
          <Favorite />
        </div>
      </Card>
    </div>
  );
};
export default FavoriteCard;
