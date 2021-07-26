import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  ButtonGroup,
  Button,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";

import "./styles.css";
import PoiContext from "../../contexts/poi";

interface Props {
  pois: Array<any> | [{}];
}

const ImageList: React.FC<Props> = ({ pois }) => {
  const { page, setPage } = useContext(PoiContext);

  return (
    <div>
      <div className="containerImageList">
        {pois.map((poi) => {
          return (
            <Link
              key={poi.id}
              className="linkDetails"
              to={{
                pathname: `/details/${poi.id}`,
              }}
            >
              <Card className="rootImageList">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={poi.name}
                    height="140"
                    image={poi.picture}
                    title={poi.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {poi.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {poi.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          );
        })}
      </div>
      <div>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
        >
          <Button
            disabled={page <= 1 ? true : false}
            variant="contained"
            color="default"
            startIcon={<ArrowBackIos />}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            VOLTAR
          </Button>
          <Button>Página {page}</Button>
          <Button
            disabled={pois.length <= 0 || pois.length < 5 ? true : false}
            variant="contained"
            color="default"
            endIcon={<ArrowForwardIos />}
            onClick={() => setPage(page + 1)}
          >
            PRÓXIMO
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ImageList;
