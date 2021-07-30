import React, { createContext /*useContext*/ } from "react";
import { useEffect } from "react";
import { useState } from "react";

import socket from "../services/socket";
import {IMessage} from '../interface/message/IMessage'


interface ChatContextData {
  messages: Array<IMessage> | any;
  setMessages(messages: IMessage[]): any;
  sendMessage(autor: string, room: string, message: string): any;
  display: boolean;
  setDisplay(boolean: boolean): void;
  roomId: string;
  setRoomId(string: string): void;
  join(agencyId: string, userId: string): any;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");

  
  useEffect(() => {
    socket.connect();

    socket.on("received_message", (data: IMessage) => {
      setMessages((prevState) => [...prevState, data]);
      console.log("RECEIVED-MESSAGE")
    });

    socket.on("joined_room", (data: {roomId: string, messages: IMessage[]}) => {
      setMessages(data.messages)
      setRoomId(data.roomId)
      console.log("JOINED")
    });
  }, []);

  const sendMessage = (author: string, roomId: string, message: string) => {
    socket.emit("send_message", { roomId: roomId, author: author, content: message });
    console.log(message)
    console.log("SEND-MESSAGE")
  };

  const join = (agencyId: string, userId: string) => {
    socket.emit("join", { agencyId: agencyId, userId: userId });
    console.log("JOIN")
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        sendMessage,
        display,
        setDisplay,
        roomId,
        setRoomId,
        join,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
