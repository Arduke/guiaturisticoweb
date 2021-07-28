import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@material-ui/core";

import "./styles.css";
import ChatContext from "../../contexts/chat";
import AuthContext from "../../contexts/auth";
import { IMessage } from "../../interface/message/IMessage";
import PoiContext from "../../contexts/poi";

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage, messages, join, roomId } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const {agencyName} = useContext(PoiContext)
  const { idAgency, idUser } = useParams<any>();

  useEffect(() => {
    join(idAgency, idUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser, idAgency]);

  const handleClick = () => {
    if (user) {
      sendMessage(user, roomId, message);
    }
  };

  return (
    <div className="contentAllChatPage">
      <div className="contentChat">
        <h1 className="titleChat">{agencyName?.name || ""}</h1>
        <Paper style={{ maxHeight: 400, width: "90%", overflow: "auto" }}>
          <ul className="listMessages">
            {messages.map((message: IMessage) => {
              if (1 % 2 === 0) {
                return (
                  <li className="uniqueMessage" key={message.id}>
                    <div className="uniqueMessageLeft"></div>
                    <div className="uniqueMessageRight">
                      <h4 className="fontName">{message.author}</h4>
                      <p style={{ marginLeft: "3px", fontSize: "14px" }}>
                        {message.content}
                      </p>
                    </div>
                  </li>
                );
              } else {
                return (
                  <li className="uniqueMessage" key={message.id}>
                    <div className="uniqueMessageLeft">
                      <h4 className="fontName">{message.author}</h4>
                      <p style={{ marginLeft: "3px", fontSize: "14px" }}>
                        {message.content}
                      </p>
                    </div>
                    <div className="uniqueMessageRight"></div>
                  </li>
                );
              }
            })}
          </ul>
        </Paper>
        <div className="sendMessageInput">
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleClick}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
