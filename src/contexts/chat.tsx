import React, { createContext /*useContext*/ } from "react";
import { useEffect } from "react";
import { useState } from "react";

import socket from "../services/socket";
import { IMessage } from "../interface/message/IMessage";
import api from "../services/api";

interface ChatContextData {
  messages: Array<IMessage> | any;
  loading: boolean;
  setMessages(messages: IMessage[]): any;
  sendMessage(autor: string, room: string, message: string): any;
  sendImage(file: any, author: string, roomId: string, message: string): any;
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();

    socket.on("received_message", (data: IMessage) => {
      setMessages((prevState) => [...prevState, data]);
      console.log("RECEIVED-MESSAGE");
      console.log(data);
    });

    socket.on(
      "joined_room",
      (data: { roomId: string; messages: IMessage[] }) => {
        setMessages(data.messages);
        setRoomId(data.roomId);
        console.log("JOINED");
        console.log(data);
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
        console.log(error.response);
        setLoading(false);
      });

    // socket.emit("send_image", {
    //   picture: newFile,
    //   author: author,
    //   roomId: roomId,
    //   content: message,
    // });
    // setLoading(false);
    console.log("SEND IMAGE CHAT");
  };

  const sendMessage = (author: string, roomId: string, message: string) => {
    socket.emit("send_message", {
      roomId: roomId,
      author: author,
      content: message,
    });
    console.log(message);
    console.log("SEND-MESSAGE");
  };

  const join = (agencyId: string, userId: string) => {
    socket.emit("join", { agencyId: agencyId, userId: userId });
    console.log("JOIN");
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
