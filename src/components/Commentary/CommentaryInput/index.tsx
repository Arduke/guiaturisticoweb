import "./styles.css"

import { Button, Grid, Modal } from "@material-ui/core";
import { IoSendSharp } from 'react-icons/io5';
import { useState, useContext } from "react";
import PoiContext from "../../../contexts/poi";

const CommentaryInput = () => {
    const { createComment, poi } = useContext(PoiContext);

    const [comment, setComment] = useState('')
    const [modal, setModal] = useState<boolean>(false)

    const handleSubmit = (event: any) => {
        event.preventDefault()
        if (poi !== null) {
            createComment(poi.id, comment)
        }
    }

    return (
        <>
            <Modal
                style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
                open={modal}
                onClose={() => { }}
            >
                <div className="paperRegister">
                    <h2> Seu comentário foi criado com sucesso! </h2>
                    <p>Iremos encaminhar para análise! Bizarro isso? Sabemos!</p>
                    <Button style={{ marginTop: '20px' }} variant="contained" color="primary" onClick={() => { setModal(false) }}>Ok</Button>
                </div>
            </Modal>

            <form onChange={handleSubmit}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                >
                    <input
                        type="text"
                        className="input_comentary_details_poi"
                        placeholder="comente aqui..."
                        id="comment"
                        name="comment"
                        value={comment}
                        onChange={({ target }) => setComment(target.value)}
                    />
                    <IoSendSharp className="icon_submit_details_poi" onClick={() => { setModal(true) }} />
                </Grid>
            </form>

        </>
    )
}

export default CommentaryInput;