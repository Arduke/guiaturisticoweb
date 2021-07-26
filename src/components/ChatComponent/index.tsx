import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Paper } from "@material-ui/core";

import "./styles.css";
import ChatContext from "../../contexts/chat";
import AuthContext from "../../contexts/auth";

const ChatComponent: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage, messages, setMessages, join } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const { idUser, idAgency } = useParams<any>();

  useEffect(() => {
    join(`${idUser}${idAgency}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idUser, idAgency]);

  const handleClick = () => {
    if (user) {
      sendMessage(user, `${idUser}${idAgency}`, message);
      setMessages([...messages, message]);
    }
  };

  return (
    <div className="contentChat">
      <h1 className="titleChat">Agencia de Turismo de Guanabara </h1>
      <Paper style={{ maxHeight: 400, width: "90%", overflow: "auto" }}>
        <ul className="listMessages">
          {messages.map((message: string, i: number) => {
            if (i % 2 === 0) {
              return (
                <li className="uniqueMessage" key={i}>
                  <div className="uniqueMessageLeft"></div>
                  <div className="uniqueMessageRight">
                    <h4 className="fontName">Turismo de Guanabara</h4>
                    <p style={{ marginLeft: "3px", fontSize: '14px' }}>{message}</p>
                  </div>
                </li>
              );
            } else {
              return (
                <li className="uniqueMessage" key={i}>
                  <div className="uniqueMessageLeft">
                    <h4 className="fontName">Fernando</h4>
                    <p style={{ marginLeft: "3px", fontSize: '14px' }}>{message}</p>
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
  );
};

export default ChatComponent;
