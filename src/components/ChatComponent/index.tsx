import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IconButton, Paper } from "@material-ui/core";
import Dropzone from "react-dropzone";
import Loading from "react-loading";

import "./styles.css";
import ChatContext from "../../contexts/chat";
import AuthContext from "../../contexts/auth";
import { IMessage } from "../../interface/message/IMessage";
import PoiContext from "../../contexts/poi";
import { ArrowBackIos, Send, Image } from "@material-ui/icons";

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage, messages, join, roomId, sendImage, loading } =
    useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const { agencyName } = useContext(PoiContext);
  const { idAgency, idUser } = useParams<any>();

  const history = useHistory();

  useEffect(() => {
    join(idAgency, idUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser, idAgency]);

  const onUpload = (file: any) => {
    const data = new FormData();
    data.append("file", file[0]);
    // const buf = Buffer.from(file[0], 'base64');
    // buf.toString('base64');
    // var reader = new FileReader();
    // reader.readAsDataURL(file[0]);
    // reader.onload = function () {
    //   console.log(reader.result);
    //   if (user) {
    //     sendImage(file[0], user, roomId, message);
    //   }
    // };
    // reader.onerror = function (error) {
    //   console.log("Error:", error);
    // };

    if (user) {
      sendImage(data, user, roomId, message);
    }
    setMessage("");
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    if (user) {
      sendMessage(user, roomId, message);
      setMessage("");
    }
  };

  return (
    <>
      <div onClick={() => history.goBack()}>
        <IconButton
          style={{ position: "absolute", margin: "20px" }}
          aria-label="delete"
        >
          <ArrowBackIos color="primary" />
        </IconButton>
      </div>
      <div className="contentAllChatPage">
        <div className="contentChat">
          <h1 className="titleChat">{agencyName?.name || "Bate-Papo"}</h1>
          <Paper
            elevation={2}
            style={{
              maxHeight: 400,
              width: "90%",
              overflow: "auto",
              border: "1px solid gray",
              padding: "20px",
            }}
          >
            <ul className="listMessages">
              {messages.map((message: IMessage) => {
                return (
                  <li
                    className={`uniqueMessage ${
                      message.author === "Agencia"
                        ? "messageEnd"
                        : "messageStart"
                    }`}
                    key={message.id}
                  >
                    <div
                      className={`${
                        message.author === "Agencia"
                          ? "grayMessage"
                          : "blueMessage"
                      }`}
                    >
                      <p className="pMessage">{message.content}</p>
                      {message.picture ? (
                        <img
                          alt={message.picture}
                          style={{ width: "200px", height: "200px" }}
                          src={message.picture}
                        />
                      ) : (
                        <> {} </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Paper>
          <form onSubmit={handleClick} className="sendMessageInput">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton type="submit">
              <Send color="action" />
            </IconButton>
            {loading ? (
              <Loading
                type={"spin"}
                height={"30px"}
                width={"30px"}
                color={"#5434af"}
              />
            ) : (
              <div className="iconUpload">
                <Dropzone accept="image/png" onDropAccepted={onUpload}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <IconButton style={{ padding: "8px !important" }}>
                        <Image color="action" />
                      </IconButton>
                      <input {...getInputProps()} />
                    </div>
                  )}
                </Dropzone>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
