import { useState } from "react";

import "./styles.css"

import Menu from "../../components/Menu";
import CommentaryInput from "../../components/Commentary"

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Grid } from "@material-ui/core";


import { useContext } from "react";
import AuthContext from "../../contexts/auth";
import { useParams } from "react-router-dom";
import PoiContext from "../../contexts/poi";
import { useRef } from "react";
import { useEffect } from "react";

const DetailsPoi = () => {
    const { id } = useParams<{id: string}>()
    const { poi, agencyName } = useContext(PoiContext)
    
    const fetch = useRef(useContext(PoiContext))
    const { user } = useContext(AuthContext)
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      fetch.current.fetchPoiById(id)
    }, [id])

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  
    return (
        <div className="container_details ">
          <Menu/>

          <Card className="root_details_poi">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <CardHeader
                  className="card_header_details_poi"
                  title ={poi?.name || ""}
                  subheader={poi?.createdAt || ""}
                  
                />
                <CardContent className="card_content_name_agency_details_poi">
                  <Typography className="name_agency_details_poi">{agencyName?.name || ""}</Typography>
                </CardContent>
                </Grid>
                <CardMedia
                  className="media_details_poi"
                  image={poi?.picture || ""}
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
                        <LocationOnIcon className="icon_location" fontSize="small"/>
                        <Typography className="address_details_poi" variant="body2" color="textSecondary" component="p">{poi?.address || ""}</Typography>
                      </Grid>
                  
                </CardContent>
                <CardActions disableSpacing>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <IconButton
                      className="icone_comentary"
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ChatIcon className="icon_comentary"/>
                    </IconButton>
                  </Grid>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography className="name_user_details_poi">
                      Naruto Uzumaki
                    </Typography>
                    <Typography>
                      Já chorei muito no balanço desse parque, mas hoje vivo bons momentos.
                    </Typography>
                  </CardContent>

                  <CardContent className="container_comentary">
                  {user && <CommentaryInput />}
                  </CardContent>
                </Collapse>
              </Card>

        </div>
    );
  }

export default DetailsPoi