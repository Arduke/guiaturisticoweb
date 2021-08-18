import { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
  Modal,
  Button,
  TextField,
} from "@material-ui/core";
import {
  LocationOn,
  Forum,
  Room,
  Favorite,
  FavoriteBorder,
} from "@material-ui/icons/";

import Menu from "../../components/Menu";
import CommentaryList from "../../components/Commentary/CommentaryList";
import PoiContext from "../../contexts/poi";
import AuthContext from "../../contexts/auth";
import { ICategory } from "../../interface/category/ICategory";
import ChatContext from "../../contexts/chat";
import formatPhoneWithMask from "../../helpers/phoneMask";

const AgulhaComponent: React.FC<any> = ({ text }) => (
  <div>
    <Room color="error">{text}</Room>
  </div>
);

interface Errors {
  userName: string;
  userPhone: string;
  userEmail: string;
}

//TODO: formatar data
const DetailsPoi: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>("");
  const [tempPhone, setTempPhone] = useState<string>("");
  const [tempEmail, setTempEmail] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({
    userName: "",
    userPhone: "",
    userEmail: "",
  });

  const { id } = useParams<{ id: string }>();
  const { poi, agencyName, fetchPoiById } = useContext(PoiContext);
  const { user, getFavorites, favorites, addFavorite, removeFavorite } =
    useContext(AuthContext);
  const { setTempUser } = useContext(ChatContext);
  const history = useHistory();

  const idUser = localStorage.getItem("@GuiaTuristico::userid");

  useEffect(() => {
    fetchPoiById(id);
    if (idUser) {
      getFavorites(idUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = (values: any) => {
    const newErrors = { userName: "", userPhone: "", userEmail: "" };

    if (!values.userEmail.includes("@") || !values.userEmail.includes(".")) {
      newErrors.userEmail = "Por favor, insira um email valido";
    }
    if (values.userPhone.length < 8 || !values.userPhone) {
      newErrors.userPhone = "Por favor, insira um telefone";
    }
    if (values.userName.length < 6 || !values.userName) {
      newErrors.userName = "Por favor, insira um nome com 6 caracteres ou mais";
    }

    setErrors(newErrors);

    if (
      newErrors.userEmail.length === 0 &&
      newErrors.userPhone.length === 0 &&
      newErrors.userName.length === 0
    ) {
      return true;
    }
    return false;
  };

  const handleChange = (event: any, label: string) => {
    if (label === "name") {
      setTempName(event.target.value);
    }
    if (label === "phone") {
      setTempPhone(formatPhoneWithMask(event.target.value));
    }
    if (label === "email") {
      setTempEmail(event.target.value);
    }
  };

  const handlerFavorite = () => {
    let exist: boolean = false;

    if (favorites && poi) {
      favorites.forEach((favorite) => {
        if (favorite.poiId === poi.id) {
          exist = true;
        }
      });
    }

    return (
      <div>
        {idUser ? (
          exist ? (
            <IconButton
              onClick={() => {
                if (idUser) {
                  removeFavorite(idUser, id);
                }
              }}
              style={{ padding: "20px", margin: "10px" }}
            >
              <Favorite style={{ color: "red" }} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                if (idUser) {
                  addFavorite(idUser, id);
                }
              }}
              style={{ padding: "20px", margin: "10px" }}
            >
              <FavoriteBorder style={{ color: "red" }} />
            </IconButton>
          )
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <>
      <Modal
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        open={modal}
        onClose={() => {
          setModal(false);
        }}
      >
        <div style={{ width: "600px" }} className="paperRegister">
          <p>Insira seus dados para acessar o chat sem estar cadastrado</p>
          <TextField
            error={errors.userName ? true : false}
            helperText={errors.userName}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={tempName}
            onChange={(event) => handleChange(event, "name")}
            id="name"
            label="Nome"
            name="name"
            type="text"
            autoFocus
          ></TextField>
          <TextField
            error={errors.userPhone ? true : false}
            helperText={errors.userPhone}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={tempPhone}
            onChange={(event) => handleChange(event, "phone")}
            id="phone"
            label="Telefone"
            name="phone"
            type="phone"
            autoFocus
          ></TextField>
          <TextField
            error={errors.userEmail ? true : false}
            helperText={errors.userEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={tempEmail}
            onChange={(event) => handleChange(event, "email")}
            id="email"
            label="Email"
            name="email"
            type="email"
            autoFocus
          ></TextField>
          <Button
            style={{ marginTop: "20px" }}
            variant="contained"
            color="primary"
            onClick={() => {
              const aux = validate({
                userName: tempName,
                userPhone: tempPhone,
                userEmail: tempEmail,
              });

              if (aux) {
                setTempUser({
                  name: tempName,
                  phone: tempPhone,
                  email: tempEmail,
                });
                setModal(false);
                history.push(`/chat/${agencyName?.id}/${"000"}`);
              }
            }}
          >
            Confirmar
          </Button>
        </div>
      </Modal>
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
            {handlerFavorite()}
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
                  <IconButton
                    onClick={() => {
                      setModal(true);
                    }}
                    style={{ margin: "4px" }}
                  >
                    <Forum color="primary" />
                  </IconButton>
                )}
              </Typography>
            </CardContent>
          </Grid>
          <CardContent style={{ height: "100px" }}>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <div>
                {poi?.categories.map((categorie: ICategory) => {
                  return (
                    <Chip
                      style={{
                        color: "white",
                        backgroundColor: "#5626da",
                        margin: "5px",
                      }}
                      key={categorie.id}
                      label={categorie.name}
                    ></Chip>
                  );
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
          <CardContent style={{ maxHeight: "130px" }}>
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
                  shouldUnregisterMapOnUnmount={true}
                  bootstrapURLKeys={{
                    key: "AIzaSyCTBSgVbSHEIMoxutFSSUXC4DNEg3SfCC8",
                  }}
                  center={{
                    lat: Number(poi.lat),
                    lng: Number(poi.lng),
                  }}
                  zoom={14}
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
    </>
  );
};

export default DetailsPoi;
