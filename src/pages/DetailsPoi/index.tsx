import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import GoogleMapReact from "google-map-react";

import "./styles.css";
import {
  Chip,
  Grid,
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";
import { LocationOn, Forum, Room } from "@material-ui/icons/";

import Menu from "../../components/Menu";
import CommentaryList from "../../components/Commentary/CommentaryList";
import PoiContext from "../../contexts/poi";
import AuthContext from "../../contexts/auth";
import { ICategory } from "../../interface/category/ICategory";

const AgulhaComponent: React.FC<any> = ({ text }) => (
  <div>
    <Room color="error">{text}</Room>
  </div>
);

//TODO: formatar data
const DetailsPoi: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { poi, agencyName, fetchPoiById } = useContext(PoiContext);
  const { user } = useContext(AuthContext);

  const idUser = localStorage.getItem("@GuiaTuristico::userid");

  useEffect(() => {
    fetchPoiById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              {user ? (
                <Link to={`/chat/${agencyName?.id}/${idUser}`}>
                  <IconButton style={{ margin: "4px" }}>
                    <Forum color="primary" />
                  </IconButton>
                </Link>
              ) : (
                <></>
              )}
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
            <LocationOn className="icon_location" fontSize="small" />
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

        <div className="divGoogleMapNormal">
          {poi !== null ? (
            <div className="mapGoogle">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCTBSgVbSHEIMoxutFSSUXC4DNEg3SfCC8",
                }}
                defaultCenter={{
                  lat: Number(poi.lat),
                  lng: Number(poi.lng),
                }}
                defaultZoom={15}
              >
                <AgulhaComponent
                  lat={Number(poi.lat)}
                  lng={Number(poi.lng)}
                  text="Marker"
                />
              </GoogleMapReact>
            </div>
          ) : (
            <></>
          )}
        </div>
        <CardContent>
          <CommentaryList poi={poi} />
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsPoi;
