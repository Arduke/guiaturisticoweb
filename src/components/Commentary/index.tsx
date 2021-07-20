import "./styles.css"

import { Grid } from "@material-ui/core";
import { IoSendSharp } from 'react-icons/io5';

const CommentaryInput = () => {
    return (
        <Grid
            container
            direction="row"
            alignItems="center"
        >
            <input 
            type="text"
            className="input_comentary_details_poi" 
            placeholder="comente aqui..."
            />
            <IoSendSharp className="icon_submit_details_poi"/>
        </Grid>
    )
}

export default CommentaryInput;