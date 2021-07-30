import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IconButton, Paper } from "@material-ui/core";

import "./styles.css";
import ChatContext from "../../contexts/chat";
import AuthContext from "../../contexts/auth";
import { IMessage } from "../../interface/message/IMessage";
import PoiContext from "../../contexts/poi";
import { ArrowBackIos, Send } from "@material-ui/icons";

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage, messages, join, roomId } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const { agencyName } = useContext(PoiContext);
  const { idAgency, idUser } = useParams<any>();

  const history = useHistory();

  useEffect(() => {
    join(idAgency, idUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser, idAgency]);

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
            <IconButton type="submit" style={{ margin: "10px" }}>
              <Send color="action" />
            </IconButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
