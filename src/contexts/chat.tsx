import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

import socket from "../services/socket";
import { IMessage } from "../interface/message/IMessage";
import { ITempUser } from "../interface/user/ITempUser";
import api from "../services/api";

interface ChatContextData {
  messages: Array<IMessage> | any;
  loading: boolean;
  setMessages(messages: IMessage[]): any;
  sendMessage(autor: string, room: string, message: string): any;
  sendMessageTemp(author: string, roomId: string, message: string): any;
  sendImage(file: any, author: string, roomId: string, message: string): any;
  display: boolean;
  setDisplay(boolean: boolean): void;
  roomId: string;
  setRoomId(string: string): void;
  join(agencyId: string, userId: string): any;
  joinTemp(agencyId: string, name: string, phone: string, email: string): any;
  tempUser: ITempUser | null;
  setTempUser(user: ITempUser): void;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [display, setDisplay] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [tempUser, setTempUser] = useState<ITempUser | null>(null);

  useEffect(() => {
    socket.connect();

    socket.on("received_message", (data: IMessage) => {
      setMessages((prevState) => [...prevState, data]);
    });

    socket.on(
      "joined_room",
      (data: { roomId: string; messages: IMessage[] }) => {
        setMessages(data.messages);
        setRoomId(data.roomId);
      }
    );
  }, []);

  const sendImage = (
    newFile: any,
    author: string,
    roomId: string,
    message: string
  ) => {
    setLoading(true);
    api
      .post("upload", newFile, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
          Accept: "*",
        },
      })
      .then((response) => {
        socket.emit("send_message", {
          roomId: roomId,
          author: author,
          content: message,
          picture: response.data,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const sendMessage = (author: string, roomId: string, message: string) => {
    socket.emit("send_message", {
      roomId: roomId,
      author: author,
      content: message,
    });
  };

  const sendMessageTemp = (author: string, roomId: string, message: string) => {
    console.log("SEND MESSAGE TEMP")
    socket.emit("__temp_send_message", {
      roomId: roomId,
      author: author,
      content: message,
    });
  };

  const join = (agencyId: string, userId: string) => {
    socket.emit("join", { agencyId: agencyId, userId: userId });
  };

  const joinTemp = (
    agencyId: string,
    name: string,
    phone: string,
    email: string
  ) => {
    console.log("JOINED");
    socket.emit("__temp_join", {
      agencyId: agencyId,
      name: name,
      phone: phone,
      email: email,
    });
  };

  return (
    <ChatContext.Provider
      value={{
        loading,
        messages,
        setMessages,
        sendMessage,
        sendImage,
        display,
        setDisplay,
        roomId,
        setRoomId,
        join,
        joinTemp,
        sendMessageTemp,
        tempUser,
        setTempUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
