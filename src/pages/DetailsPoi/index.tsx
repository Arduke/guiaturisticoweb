import "./styles.css";

import Menu from "../../components/Menu";
import CommentaryList from "../../components/Commentary/CommentaryList";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Grid, IconButton } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";

import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PoiContext from "../../contexts/poi";
import { useRef } from "react";
import { useEffect } from "react";
import { ICategory } from "../../interface/category/ICategory";
import AuthContext from "../../contexts/auth";

//TODO: formatar data

const DetailsPoi: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { poi, agencyName } = useContext(PoiContext);
  const fetch = useRef(useContext(PoiContext));
  const {user} = useContext(AuthContext)

  const idUser = localStorage.getItem("@GuiaTuristico::userid");

  useEffect(() => {
    fetch.current.fetchPoiById(id);
  }, [id]);

  return (
    <div className="container_details ">
      <Menu />
      <Card className="root_details_poi">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <CardHeader
            className="card_header_details_poi"
            title={poi?.name || ""}
            subheader={poi?.createdAt || ""}
          />
          <CardContent className="card_content_name_agency_details_poi">
            <Typography className="name_agency_details_poi">
              {agencyName?.name || ""}
              {user ?
              (
                <Link to={`/chat/${agencyName?.id}/${idUser}`}>
                  <IconButton style={{ margin: "4px" }}>
                    <ForumIcon color="primary" />
                  </IconButton>
                </Link>
              ): <></>}
            </Typography>
          </CardContent>
        </Grid>
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="center"
          >
            <div>
              {poi?.categories.map((categorie: ICategory) => {
                return <Chip key={categorie.id} label={categorie.name}></Chip>;
              })}
            </div>
          </Grid>
        </CardContent>
        <CardMedia
          className="media_details_poi"
          image={
            poi?.picture ||
            "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/3136/image-not-found.jpg"
          }
          title={poi?.name || ""}
        />
        <CardContent>
          <Typography variant="body2" component="p">
            {poi?.description}
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <LocationOnIcon className="icon_location" fontSize="small" />
            <Typography
              className="address_details_poi"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {poi?.address || ""}
            </Typography>
          </Grid>
        </CardContent>

        <CardContent>
          <CommentaryList poi={poi} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsPoi;
