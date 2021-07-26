import { useState } from "react";

import "./styles.css";

import CommentaryInput from '../CommentaryInput';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import { Grid } from "@material-ui/core";

import { useContext } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import AuthContext from "../../../contexts/auth";
import PoiContext from "../../../contexts/poi";

interface Props {
    poi: any
}

//TODO: formatar data e limpar input do componeent CommentaryInput depois de enviar os dados 

const CommentaryList: React.FC<Props> = ({ poi }) => {
    const { user } = useContext(AuthContext)
    const { comments } = useContext(PoiContext)
    const [expanded, setExpanded] = useState(false);
    const fetch = useRef(useContext(PoiContext))

    console.log('comments', comments)

    useEffect(() => {
        if (poi !== null) {
            fetch.current.fetchAllCommentWithTrueStatus(poi.id)
        }
    }, [poi])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>

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
                        <ChatIcon className="icon_comentary" />
                    </IconButton>
                </Grid>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {comments.map((comment) => {
                    return (
                        <div>
                            <CardContent>
                                <Typography className="name_user_details_poi">
                                    {comment.user.username}
                                </Typography>
                                <Typography>
                                    {comment.comment}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {comment.createdAt}
                                </Typography>
                            </CardContent>
                        </div>
                    )
                })}

                <CardContent className="container_comentary">
                    {user && <CommentaryInput />}
                </CardContent>
            </Collapse>

        </div>
    );
}

export default CommentaryList