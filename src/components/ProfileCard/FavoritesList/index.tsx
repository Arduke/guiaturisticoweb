import React, { useRef, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AuthContext from "../../../contexts/auth";
import { Link } from "react-router-dom";
import { Favorite } from "@material-ui/icons";

const FavoriteList: React.FC = () => {
  const { favorites, getFavorites } = useContext(AuthContext);
  const [expanded, setExpanded] = React.useState(false);
  const userId = localStorage.getItem("@GuiaTuristico::userid");

  useEffect(() => {
    if (userId) {
      getFavorites(userId);
    }
  }, []);

  // if (favorites !== null) {
  //   const fav = favorites.forEach((favorite) => {
  //     <div>
  //       <Card className="FavoriteCard">
  //         <CardHeader title={favorite.name} />
  //         <Link to={`pois/${favorite.id}`}>{favorite.name}</Link>
  //         <CardMedia className="FavoritePicture" image={favorite.picture} />
  //         <CardContent>
  //           <Typography variant="body2" color="textSecondary" component="p">
  //             {favorite.description}
  //           </Typography>
  //           <Favorite />
  //         </CardContent>
  //       </Card>
  //     </div>;
  //   });

  return (
    <div>
      <div>
        <Card className="FavoriteCard">
          <CardHeader title={"Danilo sem camisa"} />
          <Link to={`pois/${1}`}>{"Danilo sem camisa"}</Link>
          <CardMedia className="FavoritePicture" image={"Danilo sem camis"} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {
                "Danilo sem camisaDanilo sem camisaDanilo sem camisaDanilo sem camisaDanilo sem camisaDanilo sem camisaDanilo sem camisaDanilo sem camisa"
              }
            </Typography>
            <Favorite />
          </CardContent>
        </Card>
      </div>
      {/* {favorites ? (
        favorites.map((favorite) => {
          return (
            <div>
              <Card className="FavoriteCard">
                <CardHeader title={favorite.name} />
                <Link to={`pois/${favorite.id}`}>{favorite.name}</Link>
                <CardMedia
                  className="FavoritePicture"
                  image={favorite.picture}
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {favorite.description}
                  </Typography>
                  <Favorite />
                </CardContent>
              </Card>
            </div>
          );
        })
      ) : (
        <>
          <h1>
            SE FUFU FU FU PQ VAI TER QUE APRENDER A LIDAR COM ERROS kkkkkkkkkk{" "}
          </h1>
        </>
      )} */}
    </div>
  );
};

export default FavoriteList;
