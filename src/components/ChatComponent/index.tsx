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
import socket from "../../services/socket";

const ChatComponent = () => {
  const [message, setMessage] = useState<string>("");
  const {
    sendMessage,
    messages,
    join,
    roomId,
    sendImage,
    loading,
    joinTemp,
    sendMessageTemp,
    tempUser,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const { agency } = useContext(PoiContext);
  const { idAgency, idUser } = useParams<any>();

  const history = useHistory();

  useEffect(() => {
    if (!tempUser && !idUser) {
      history.goBack();
    }
    if (idUser === "000" && tempUser) {
      joinTemp(idAgency, tempUser.name, tempUser.phone, tempUser.email);
    } else {
      join(idAgency, idUser);
    }

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
    //   if (user) {
    //     sendImage(file[0], user, roomId, message);
    //   }
    // };
    // reader.onerror = function (error) {
    // };

    if (user) {
      sendImage(data, user, roomId, message);
    }
    if (tempUser) {
      sendImage(data, tempUser?.name, roomId, message);
    }
    setMessage("");
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    if (user) {
      sendMessage(user, roomId, message);
      setMessage("");
    }
    if (idUser === "000" && tempUser) {
      sendMessageTemp(tempUser.name, roomId, message);
      setMessage("");
    }
  };

  return (
    <>
      <div
        onClick={() => {
          socket.emit("__temp_cleanup", roomId);
          history.goBack();
        }}
      >
        <IconButton
          style={{ position: "absolute", margin: "20px" }}
          aria-label="delete"
        >
          <ArrowBackIos color="primary" />
        </IconButton>
      </div>
      <div className="contentAllChatPage">
        <div className="contentChat">
          <h1 className="titleChat">{agency?.name || "Bate-Papo"}</h1>
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
                        !message.picture.includes("video") ? (
                          <img
                            alt={message.picture}
                            style={{ width: "200px", height: "200px" }}
                            src={message.picture}
                          />
                        ) : (
                          <video width="320" height="240" controls>
                            <source
                              src={message.picture}
                              type="video/mp4"
                            ></source>
                          </video>
                        )
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
            ) : !tempUser ? (
              <div className="iconUpload">
                <Dropzone
                  accept="image/png, image/jpeg, image/gif, video/mpeg, video/x-msvideo, video/mp4, video/webm"
                  onDropAccepted={onUpload}
                >
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
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
