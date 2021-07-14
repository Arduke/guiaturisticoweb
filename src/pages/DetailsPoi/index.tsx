import { useState } from "react";

import "./styles.css"

import Menu from "../../components/Menu";

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
import { Button, Grid, Input } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

import { IoSendSharp } from 'react-icons/io5';


const DetailsPoi = () => {
  
    const [expanded, setExpanded] = useState(false);
  
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
                  title ="Parque de Konoha"
                  subheader="13/07/2021"
                  
                />
                <CardContent className="card_content_name_agency_details_poi">
                  <Typography className="name_agency_details_poi">Agência Konoha</Typography>
                </CardContent>
                </Grid>
                <CardMedia
                  className="media_details_poi"
                  image="https://source.unsplash.com/user/erondu/400x400"
                  title="aleatoria"
                />
                <CardContent>
                  <Typography variant="body2" component="p">
                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                  </Typography>
                  
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <LocationOnIcon className="icon_location" fontSize="small"/>
                        <Typography className="address_details_poi" variant="body2" color="textSecondary" component="p">Vila da Folha</Typography>
                      </Grid>
                  
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    className="icone_comentary"
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ChatIcon className="icon_comentary"/>
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography className="name_user_details_poi">
                      Naruto Uzumaki
                    </Typography>
                    <Typography>
                      Já chorei muito no balanço desse parque, mas hoje tenho bons momentos.
                    </Typography>
                  </CardContent>

                  <CardContent>
                  <input className="input_comentary_details_poi" placeholder="comente aqui..."/>
                    {/* <button className="button_comentary_details_poi">
                      Enviar
                    </button> */}
                    <IoSendSharp size="small" className="icon_submit_details_poi"/>
                  </CardContent>
                </Collapse>
              </Card>

        </div>
    );
  }

export default DetailsPoi